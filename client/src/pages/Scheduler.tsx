import { useEffect, useState } from "react"
import { PLATFORMS } from "../assets/assets";
import { ArrowRightIcon, CalendarDaysIcon, CalendarIcon, ClockIcon, SendIcon, XIcon } from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const Scheduler = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [content, setContent] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/api/posts")
      setPosts(data)
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    }
  }

  useEffect(() => {
    (async () => await fetchPosts())();
    const interval = setInterval(async () => await fetchPosts(), 10000);
    return () => clearInterval(interval)
  }, [])

  const scheduled = posts.filter((p) => p.status === "scheduled")
  const published = posts.filter((p) => p.status === "published")

  const togglePlatform = (id: string) =>
    setSelectedPlatforms((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  const handleSchedule = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedPlatforms.length === 0) { toast.error("Select at least one platform"); return; }
    if (!scheduledDate || !scheduledTime) { toast.error("Select date and time"); return; }
    if (selectedPlatforms.includes('instagram') && !mediaFile) {
      toast.error("Instagram requires an image or video"); return;
    }

    const scheduledFor = new Date(`${scheduledDate}T${scheduledTime}`).toISOString();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("scheduledFor", scheduledFor);
    formData.append("status", "scheduled");
    formData.append("platforms", JSON.stringify(selectedPlatforms));
    if (mediaFile) formData.append("media", mediaFile);

    setLoading(true)
    try {
      await api.post("/api/posts", formData, { headers: { "Content-Type": "multipart/form-data" } })
      toast.success("Post scheduled!");
      setContent("");
      setScheduledDate("");
      setScheduledTime("");
      setSelectedPlatforms([]);
      setMediaFile(null);
      fetchPosts();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" mt-20 flex flex-col lg:flex-row gap-6 h-full">
      
      {/* ── Compose panel ── */}
      <div className="w-full lg:w-[480px] shrink-0">
        <div className="bg-white border-[3px] border-black rounded-2xl p-6 shadow-[8px_8px_0_0_#000]">
          <div className="flex items-center gap-2 mb-6">
            <span className="bg-amber-300 border-[3px] border-black px-3 py-1 text-xs font-black uppercase rounded-full shadow-[3px_3px_0_0_#000]">
              🐝 Compose
            </span>
            <h2 className="text-xl font-black uppercase tracking-tight">New Post</h2>
          </div>

          <form className="space-y-5" onSubmit={handleSchedule}>
            {/* Platforms */}
            <div>
              <label className="block text-xs font-black uppercase mb-2">Platforms</label>
              <div className="flex flex-wrap gap-2">
                {PLATFORMS.map((p) => {
                  const active = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => togglePlatform(p.id)}
                      className={`flex items-center gap-1.5 p-3 rounded-xl border-[3px] border-black transition ${active ? "bg-amber-400 shadow-[3px_3px_0_0_#000] -translate-y-0.5" : "bg-white hover:-translate-y-0.5 hover:shadow-[3px_3px_0_0_#000]"}`}
                    >
                      <p.icon className="size-4.5" />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-black uppercase mb-2">Content</label>
              <textarea
                required
                rows={5}
                placeholder="What do you want to share today?"
                className="w-full px-5 py-4 bg-amber-50 border-[3px] border-black rounded-xl text-sm font-bold placeholder:text-black/40 outline-none resize-none focus:-translate-y-0.5 focus:shadow-[3px_3px_0_0_#000] transition"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <div className={`text-right text-xs mt-1 font-black ${content.length > 270 ? "text-rose-600" : "text-black/60"}`}>
                {content.length}/280
              </div>
            </div>

            {/* Media upload */}
            <div>
              <label className="block text-xs font-black uppercase mb-2">Media (optional)</label>
              {mediaFile ? (
                <div className="relative rounded-xl overflow-hidden border-[3px] border-black">
                  {mediaFile.type.startsWith("image/")
                    ? <img src={URL.createObjectURL(mediaFile)} alt="preview" className="w-full h-40 object-cover" />
                    : <video src={URL.createObjectURL(mediaFile)} className="w-full h-40 object-cover" controls />}
                  <button
                    type="button"
                    onClick={() => setMediaFile(null)}
                    className="absolute top-2 right-2 size-8 border-[3px] border-black bg-rose-400 text-black rounded-xl flex items-center justify-center shadow-[3px_3px_0_0_#000]"
                  >
                    <XIcon className="size-4" />
                  </button>
                </div>
              ) : (
                <label className="flex items-center justify-center gap-2 p-5 py-10 border-[3px] border-dashed border-black rounded-xl cursor-pointer bg-amber-50 hover:bg-amber-100 transition group">
                  <span className="text-sm font-black uppercase">Click to upload image or video</span>
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => e.target.files?.[0] && setMediaFile(e.target.files[0])} />
                </label>
              )}
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-black uppercase mb-2">Date</label>
                <div className="relative">
                  <CalendarIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="date"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-[3px] border-black rounded-xl text-sm font-bold outline-none focus:-translate-y-0.5 focus:shadow-[3px_3px_0_0_#000] transition"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-2">Time</label>
                <div className="relative">
                  <ClockIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="time"
                    required
                    className="w-full pl-10 pr-4 py-2.5 bg-white border-[3px] border-black rounded-xl text-sm font-bold outline-none focus:-translate-y-0.5 focus:shadow-[3px_3px_0_0_#000] transition"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-amber-400 text-black border-[3px] border-black rounded-xl font-black uppercase shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition disabled:opacity-60"
            >
              {loading ? (
                <>
                  <div className="size-4 border-[3px] border-black border-t-transparent rounded-full animate-spin" />
                  Scheduling…
                </>
              ) : (
                <>Schedule Post <ArrowRightIcon className="size-4" /></>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Queue panels ── */}
      <div className="flex-1 flex flex-col gap-6 min-w-0">
        {/* Banner */}
      <div className="w-full relative">
        <div className="border-[3px] border-black rounded-2xl overflow-hidden shadow-[8px_8px_0_0_#000] bg-amber-300">
          <img
            src="./src/assets/newpost.png"
            alt="postbee"
            className="w-full h-80 md:h-[12rem] object-cover"
          />
        </div>
        <span className="hidden md:inline-block absolute -top-3 -right-3 rotate-[8deg] bg-rose-400 border-[3px] border-black px-4 py-1.5 text-sm font-black uppercase shadow-[4px_4px_0_0_#000] rounded-full">
          Create New Post
        </span>
      </div>
        {/* Upcoming */}
        <div className="bg-white border-[3px] border-black rounded-2xl shadow-[8px_8px_0_0_#000]">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b-[3px] border-black  rounded-2xl bg-sky-300">
            <CalendarDaysIcon className="size-4" />
            <h3 className="font-black uppercase tracking-tight">Upcoming</h3>
            <span className="ml-auto text-xs font-black bg-white border-[2px] border-black px-2 py-0.5 rounded-full">
              {scheduled.length}
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y-[3px] divide-black">
            {scheduled.length === 0 ? (
              <div className="py-10 text-center text-black/60 text-sm font-bold">No posts scheduled yet</div>
            ) : (
              scheduled.map((post) => (
                <div key={post._id} className="px-5 py-4  rounded-2xl hover:bg-amber-50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1.5 items-center">
                      {post.platforms.map((pl: string) => {
                        const meta = PLATFORMS.find((p) => p.id === pl);
                        return meta ? <meta.icon key={pl} className="size-4" /> : null
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      {post.mediaType && (
                        <span className="text-xs bg-amber-200 border-[2px] border-black px-1.5 py-0.5 rounded-md font-black uppercase">
                          {post.mediaType}
                        </span>
                      )}
                      <span className="text-xs font-black">{new Date(post.scheduledFor).toLocaleString()}</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold line-clamp-2 max-w-md">{post.content}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Published */}
        <div className="bg-white border-[3px] border-black rounded-2xl shadow-[8px_8px_0_0_#000]">
          <div className="flex items-center gap-2.5 px-5 py-4 border-b-[3px]  rounded-2xl border-black bg-emerald-300">
            <SendIcon className="size-4" />
            <h3 className="font-black uppercase tracking-tight">Published</h3>
            <span className="ml-auto text-xs font-black bg-white border-[2px] border-black px-2 py-0.5 rounded-full">
              {published.length}
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto divide-y-[3px] divide-black">
            {published.length === 0 ? (
              <div className="py-10 text-center text-black/60 text-sm font-bold">No published posts yet</div>
            ) : (
              published.map((post) => (
                <div key={post._id} className="px-5 py-4  rounded-2xl hover:bg-amber-50 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1.5 items-center">
                      {post.platforms.map((pl: string) => {
                        const meta = PLATFORMS.find((p) => p.id === pl);
                        return meta ? <meta.icon key={pl} className="size-4" /> : null
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      {post.mediaType && (
                        <span className="text-xs bg-amber-200 border-[2px] border-black px-1.5 py-0.5 rounded-md font-black uppercase">
                          {post.mediaType}
                        </span>
                      )}
                      <span className="text-xs font-black">{new Date(post.updatedAt).toLocaleString()}</span>
                      <span className="text-xs bg-emerald-300 border-[2px] border-black px-2 py-0.5 rounded-full font-black uppercase">Published</span>
                    </div>
                  </div>
                  <p className="text-sm font-bold line-clamp-2 max-w-4/5">{post.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scheduler
