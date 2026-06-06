import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarIcon, ClockIcon, HistoryIcon, Loader2Icon, TimerIcon, Wand2Icon, XIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const AIComposer = () => {
  const [prompt, setPrompt] = useState("");
  const [tone, setTone] = useState("Professional");
  const [generateImage, setGenerateImage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [generations, setGenerations] = useState<any[]>([])

  const [activeScheduler, setActiveScheduler] = useState<any>(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [scheduling, setScheduling] = useState(false);

  const fetchGenerations = async () => {
    try {
      const { data } = await api.get("api/posts/generations")
      setGenerations(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  }

  useEffect(() => { fetchGenerations() }, [])

  const handleGenerate = async () => {
    if (!prompt) { toast.error("Please enter a prompt"); return; }
    setLoading(true)
    try {
      const { data } = await api.post("/api/posts/generate", { prompt, tone, generateImage });
      setGenerations([data, ...generations]);
      setActiveScheduler(data)
      toast.success("Content generated!")
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally { setLoading(false) }
  }

  const handleSchedule = async () => {
    if (!activeScheduler) return;
    if (selectedPlatforms.length === 0) { toast.error("Select at least one platform"); return; }
    if (!scheduledDate || !scheduledTime) { toast.error("Select date and time"); return; }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
    setScheduling(true);
    try {
      await api.post("/api/posts", {
        content: activeScheduler.content,
        mediaUrl: activeScheduler.mediaUrl,
        mediaType: activeScheduler.mediaType,
        platforms: selectedPlatforms,
        scheduledFor,
        status: "scheduled",
      })
      toast.success("AI Post scheduled!");
      setActiveScheduler(null)
      setSelectedPlatforms([]);
      setScheduledDate("");
      setScheduledTime("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to schedule");
    } finally { setScheduling(false); }
  }

  const tones = ["Professional", "Creative", "Funny", "Minimalist", "Excited"];
  const toneBg = ["bg-amber-300", "bg-rose-400", "bg-emerald-300", "bg-sky-300", "bg-fuchsia-300"];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-20">
      {/* Input Section */}
      <div className="space-y-6 text-center mt-10">
        <span className="inline-block bg-rose-400 border-[3px] border-black px-4 py-1.5 text-xs font-black uppercase shadow-[4px_4px_0_0_#000] rounded-full rotate-[-2deg]">
          🐝 AI Composer
        </span>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
          What should we <span className="inline-block bg-amber-300 border-[3px] border-black px-3 rotate-[-1deg]">create</span> today?
        </h1>

        <div className="relative mt-8">
          <textarea
            className="w-full px-6 py-6 bg-white border-[3px] border-black rounded-2xl text-black font-bold placeholder:text-black/40 placeholder:font-bold outline-none resize-none h-44 shadow-[6px_6px_0_0_#000] focus:-translate-y-0.5 focus:shadow-[8px_8px_0_0_#000] transition"
            placeholder="Share your idea... (e.g. A post about the launch of our new eco-friendly coffee beans)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-3 text-sm">
            <button
              onClick={() => setGenerateImage(!generateImage)}
              className="flex items-center gap-3 bg-amber-200 border-[3px] border-black py-2 px-3 rounded-xl font-black uppercase text-xs shadow-[3px_3px_0_0_#000]"
            >
              <span>AI Image</span>
              <div className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-[2px] border-black transition-colors ${generateImage ? "bg-emerald-400" : "bg-white"}`}>
                <span className={`pointer-events-none size-3 transform translate-y-0.5 rounded-full bg-black transition ${generateImage ? "translate-x-5" : "translate-x-0.5"}`} />
              </div>
            </button>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="bg-black text-amber-300 border-[3px] border-black flex items-center gap-2 px-4 py-2 rounded-xl font-black uppercase text-xs shadow-[3px_3px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000] transition disabled:opacity-60"
            >
              {loading ? (<><Loader2Icon className="size-4 animate-spin" /><span>Generating...</span></>)
                : (<>Generate <ArrowRightIcon className="size-4" /></>)}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {tones.map((t, i) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-black uppercase border-[3px] border-black transition ${tone === t ? `${toneBg[i]} shadow-[3px_3px_0_0_#000] -translate-y-0.5` : "bg-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#000]"}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* AI Generated Posts */}
      <div className="space-y-6 pt-10 border-t-[3px] border-black">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-10 border-[3px] border-black bg-amber-300 rounded-xl flex items-center justify-center shadow-[3px_3px_0_0_#000]">
              <HistoryIcon className="size-5" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">Recent Generations</h2>
          </div>
          <span className="text-xs font-black uppercase bg-white border-[3px] border-black px-3 py-1 rounded-full shadow-[3px_3px_0_0_#000]">
            {generations.length} total
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {generations.map((gen, idx) => {
            const tints = ["bg-white", "bg-amber-200", "bg-sky-200", "bg-emerald-200", "bg-rose-200"];
            const tint = tints[idx % tints.length];
            return (
              <div key={gen._id} className={`${tint} rounded-2xl border-[3px] border-black p-5 shadow-[6px_6px_0_0_#000] hover:-translate-y-1 hover:shadow-[8px_8px_0_0_#000] transition relative`}>
                <div className="flex flex-col h-full space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest">{new Date(gen.createdAt).toLocaleDateString()}</span>
                    <span className="text-xs font-black uppercase bg-black text-amber-300 px-2 py-0.5 rounded-md">{gen.tone}</span>
                  </div>
                  <p className="text-sm font-bold line-clamp-3 leading-relaxed flex-1">{gen.content}</p>
                  {gen.mediaUrl && (
                    <div className="rounded-xl overflow-hidden border-[3px] border-black">
                      <img src={gen.mediaUrl} alt="Gen" className="w-full aspect-video object-cover" />
                    </div>
                  )}
                  <button
                    onClick={() => setActiveScheduler(gen)}
                    className="w-full bg-amber-400 hover:bg-amber-500 text-black text-xs font-black uppercase py-2.5 rounded-lg border-[3px] border-black shadow-[3px_3px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#000] active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000] transition"
                  >
                    Schedule Post
                  </button>
                </div>
              </div>
            )
          })}

          {generations.length === 0 && (
            <div className="col-span-full py-20 text-center space-y-3">
              <div className="size-16 border-[3px] border-black bg-amber-200 rounded-2xl flex items-center justify-center mx-auto shadow-[4px_4px_0_0_#000]">
                <Wand2Icon className="size-7" />
              </div>
              <p className="font-black uppercase">No content generated yet</p>
              <p className="text-black/60 text-sm font-bold">Try generating some content using the AI.</p>
            </div>
          )}
        </div>
      </div>

      {/* Scheduler Modal */}
      {activeScheduler && (
        <div className="fixed inset-0 min-h-screen z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border-[3px] border-black rounded-2xl shadow-[10px_10px_0_0_#000] w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b-[3px] border-black bg-amber-300">
              <h3 className="font-black uppercase tracking-tight text-lg">Schedule Generation</h3>
              <button
                onClick={() => setActiveScheduler(null)}
                className="size-9 border-[3px] border-black bg-white rounded-xl flex items-center justify-center shadow-[3px_3px_0_0_#000] hover:bg-rose-400 transition"
              >
                <XIcon className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="bg-amber-100 rounded-2xl p-5 border-[3px] border-black">
                <p className="text-xs font-black uppercase mb-1">Prompt</p>
                <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap">{activeScheduler.prompt}</p>
              </div>
              <div className="bg-emerald-100 rounded-2xl p-5 border-[3px] border-black space-y-3">
                <p className="text-xs font-black uppercase">Content</p>
                <p className="text-sm font-bold leading-relaxed whitespace-pre-wrap">{activeScheduler.content}</p>
                {activeScheduler.mediaUrl && (
                  <img src={activeScheduler.mediaUrl} alt="preview" className="w-full aspect-video object-cover rounded-xl border-[3px] border-black" />
                )}
              </div>
            </div>

            <div className="p-6 bg-amber-50 border-t-[3px] border-black space-y-6">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest mb-3">Select Channels</label>
                <div className="flex flex-wrap gap-2">
                  {PLATFORMS.map((p) => {
                    const active = selectedPlatforms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        onClick={() => setSelectedPlatforms((prev) => (prev.includes(p.id) ? prev.filter((x) => x !== p.id) : [...prev, p.id]))}
                        className={`p-2.5 rounded-xl border-[3px] border-black transition ${active ? "bg-amber-400 shadow-[3px_3px_0_0_#000] -translate-y-0.5" : "bg-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#000]"}`}
                      >
                        <p.icon className="size-4.5" />
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <CalendarIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="date"
                    className="w-full pl-11 pr-4 py-3 bg-white border-[3px] border-black rounded-xl font-bold text-sm focus:outline-none focus:-translate-y-0.5 focus:shadow-[3px_3px_0_0_#000] transition"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <ClockIcon className="size-4 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="time"
                    className="w-full pl-11 pr-4 py-3 bg-white border-[3px] border-black rounded-xl font-bold text-sm focus:outline-none focus:-translate-y-0.5 focus:shadow-[3px_3px_0_0_#000] transition"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>

              <button
                onClick={handleSchedule}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 text-black font-black uppercase border-[3px] border-black shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition"
              >
                {scheduling ? <Loader2Icon className="size-4 animate-spin" /> : <TimerIcon className="size-4" />}
                Schedule Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIComposer
