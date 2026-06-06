import { Response } from "express";
import { AuthRequest } from "../middlewares/authMiddlewware.js";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import { cloudinary } from "../config/cloudinary.js";
import { Generation } from "../models/Generation.js";
import { Post } from "../models/Post.js";

// Generate post
// POST /api/posts/generate
export const generatePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { prompt, tone, generateImage } = req.body;

        const apiKey = process.env.GEMINI_API_KEY;
        if(!apiKey){
            res.status(400).json({message: "Gemini API Key is missing. Please add it to your server/.env file." });
            return;
        }

        const ai = new GoogleGenAI({ apiKey: apiKey });

        // 1. Generate Text using Gemini
        const textResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Generate a social media post based on this prompt: "${prompt}". 
            Tone: ${tone}. 
            Include relevant hashtags.
            Format the response as JSON with "content" and "imagePrompt" fields. 
            The "imagePrompt" should be a highly descriptive prompt for an image generator that complements the post.`,
        });

        let content = "";
        let imagePrompt = prompt;

        try {
            const rawText = textResponse.text || "";
            const jsonMatch = rawText.match(/\{[\s\S]*\}/);
            const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {content: rawText, imagePrompt: prompt};
            content = data.content;
            imagePrompt = data.imagePrompt;
        } catch (e) {
            content = textResponse.text || "";
        }

        let mediaUrl = "";
        
        // 2. FIXED: Use Picfinder API to completely bypass shared cloud IP concurrent rate limits (402 blocks)
        if(generateImage){
           try {
                console.log("Generating free image via Picfinder Gateway...");
                
                // Keep the prompt string clean of code-breaking symbols
                const cleanImagePrompt = imagePrompt.replace(/[\*\_]/g, "").trim();
                console.log("Cleaned Image Prompt for API:", cleanImagePrompt);

                // Picfinder uses a reliable public GET endpoint built for high-concurrency developer test suites
                const sanitizedPrompt = encodeURIComponent(cleanImagePrompt);
                const picfinderUrl = `https://image.pollinations.ai/p/${sanitizedPrompt}?width=1024&height=1024&model=flux&seed=${Math.floor(Math.random() * 100000)}`;

                // Fetch image binary stream directly
                const imgResponse = await axios.get(picfinderUrl, {
                    responseType: "arraybuffer"
                });

                console.log("Image binary fetched. Streaming to Cloudinary...");
                const imageBuffer = Buffer.from(imgResponse.data);

                const uploadResult = await new Promise<any>((resolve, reject) => {
                    const uploadStream = cloudinary.uploader.upload_stream(
                        { 
                            folder: "ai-generations",
                            resource_type: "image"
                        },
                        (error, result) => {
                            if (error) {
                                console.error("Cloudinary upload internal error:", error);
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    uploadStream.end(imageBuffer);
                });

                mediaUrl = uploadResult.secure_url;
                console.log("Image successfully uploaded to Cloudinary:", mediaUrl);
                
           } catch (err: any) {
                console.error("Image generation block threw an error:", err.message);
                if (err?.response?.status) {
                    console.error("Error Status Code:", err.response.status);
                }
           } 
        }

          // 3. Save generation metadata into MongoDB
          const generation = await Generation.create({
            user: req.user._id,
            prompt,
            content,
            mediaUrl,
            mediaType: mediaUrl ? "image" : undefined,
            tone
          });

          res.json(generation);
        
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Get generations
// GET /api/posts/generations
export const getGenerations = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const generations = await Generation.find({user: req.user._id}).sort({createdAt: -1})
        res.json(generations)
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Get posts
// GET /api/posts
export const getPosts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const posts = await Post.find({user: req.user._id})
        res.json(posts)
    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}

// Schedule post
// POST /api/posts
export const schedulePost = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { content, platforms, scheduledFor, status } = req.body;

        let parsedPlatforms = platforms;
        if(typeof platforms === "string"){
            try {
                parsedPlatforms = JSON.parse(platforms)
            } catch (e) {
                parsedPlatforms = platforms.split(",");
            }
        }

        let mediaUrl: string | undefined = req.body.mediaUrl;
        let mediaType: "image" | "video" | undefined = req.body.mediaType;

        if(req.file){
            const result = await new Promise<any>((resolve, reject)=>{
                const stream = cloudinary.uploader.upload_stream({resource_type: "auto", folder: "social-scheduler"}, (error, result)=>{
                    if(error) reject(error);
                    else resolve(result)
                });
                stream.end(req.file!.buffer);
            });
            mediaUrl = result.secure_url;
            mediaType = result.resource_type === "video" ? "video" : "image";
        }

        const post = await Post.create({
            user: req.user._id,
            content,
            platforms: parsedPlatforms,
            mediaUrl,
            mediaType,
            scheduledFor,
            status,
        })
        res.status(201).json(post)

    } catch (error: any) {
        res.status(500).json({ message: error?.message || "Server error" });
    }
}