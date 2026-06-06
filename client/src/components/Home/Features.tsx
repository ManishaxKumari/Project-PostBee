import { CalendarDaysIcon, Wand2Icon, Share2Icon, ZapIcon, BarChart3Icon, HashIcon } from "lucide-react";

const features = [
    { icon: CalendarDaysIcon, title: "Smart Scheduling", description: "Queue posts across all platforms with a single click. Set it once and let us handle the rest.", bg: "bg-yellow-400" },
    { icon: Wand2Icon, title: "AI Content Generator", description: "Generate on-brand captions and stunning images with our built-in AI. Never stare at a blank page again.", bg: "bg-[#FF6B6B] text-white" },
    { icon: BarChart3Icon, title: "Activity Dashboard", description: "Get a bird's eye view of all published posts, scheduled content, and engagement activity in one place.", bg: "bg-white" },
    { icon: Share2Icon, title: "Multi-Platform", description: "Connect Twitter, LinkedIn, Facebook, and Instagram. Post everywhere from one unified workspace.", bg: "bg-[#6EE7B7]" },
    { icon: ZapIcon, title: "Instant Publishing", description: "Need to go live now? Publish immediately or schedule for peak engagement times with full timezone support.", bg: "bg-white" },
    { icon: HashIcon, title: "Hashtag Suggestions", description: "Get AI-powered hashtag suggestions to reach a wider audience.", bg: "bg-yellow-300" },
];

export default function Features() {
    return (
        <section id="features" className="py-24 bg-[#FFFBEA] border-y-[3px] border-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-white border-[2.5px] border-black text-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000]">
                        <ZapIcon className="size-3.5" />
                        Everything you need
                    </div>
                    <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-black tracking-tight">
                        Automate your entire
                        <br />
                        <span className="inline-block bg-yellow-400 px-3 py-1 mt-2 -rotate-1 border-[3px] border-black shadow-[6px_6px_0_0_#000]">
                            social workflow
                        </span>
                    </h2>
                    <p className="mt-6 text-black/70 font-medium max-w-xl mx-auto">
                        From content creation to scheduling — PostBee handles it all so you can focus on what matters most.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className={`${f.bg} rounded-3xl border-[3px] border-black p-6 shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-0.75 hover:translate-y-0.75 transition-all`}
                        >
                            <div className="size-12 rounded-2xl bg-black text-yellow-400 border-[2.5px] border-black flex items-center justify-center mb-4">
                                <f.icon className="size-5" />
                            </div>
                            <h3 className="font-black text-lg mb-2 tracking-tight">{f.title}</h3>
                            <p className="text-sm font-medium leading-relaxed opacity-80">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
