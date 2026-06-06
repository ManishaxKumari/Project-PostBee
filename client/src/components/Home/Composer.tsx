import { SparklesIcon } from "lucide-react";

// Grid background like the honeybee reference
const gridBg =
    "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)";

const TONES = [
    { label: "Playful", active: true },
    { label: "Bold", active: false },
    { label: "Professional", active: false },
    { label: "Spicy", active: false },
];

const SCHEDULE = [
    { day: "MON", text: "Product drop · IG + X", bg: "bg-yellow-400", dayBg: "bg-yellow-400" },
    { day: "WED", text: "Thread: 5 hive lessons · X", bg: "bg-[#FF6B6B] text-white", dayBg: "bg-[#FF6B6B] text-white" },
    { day: "THU", text: "Behind the scenes · TikTok", bg: "bg-white", dayBg: "bg-white" },
    { day: "FRI", text: "Weekly recap · LinkedIn", bg: "bg-[#5BC8F5] text-white", dayBg: "bg-[#5BC8F5] text-white" },
];

export default function Composer() {
    return (
        <section className="relative overflow-hidden bg-yellow-400 py-20">
            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: gridBg, backgroundSize: "48px 48px" }}
            />

            <div className="relative max-w-7xl mx-auto px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* AI Composer card */}
                <div className="bg-white rounded-[28px] border-[3px] border-black shadow-[8px_8px_0_0_#000] p-8">
                    <div className="inline-flex items-center bg-yellow-400 text-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-1.5 rounded-full border-[2.5px] border-black">
                        AI Composer
                    </div>

                    <h3 className="mt-5 font-black text-3xl sm:text-4xl text-black leading-tight">
                        Type a vibe. Ship a post.
                    </h3>

                    {/* Prompt box */}
                    <div className="mt-6 bg-[#FFF3D1] rounded-2xl border-[2.5px] border-black p-5">
                        <div className="text-[11px] font-extrabold uppercase tracking-widest text-black mb-2">
                            Prompt
                        </div>
                        <p className="text-black font-medium leading-snug">
                            Launch announcement for our honey-roasted oat milk. Playful, short.
                        </p>
                    </div>

                    {/* Tone chips */}
                    <div className="mt-5 flex flex-wrap gap-2.5">
                        {TONES.map((t) => (
                            <button
                                key={t.label}
                                type="button"
                                className={`px-4 py-2 rounded-full border-[2.5px] border-black font-extrabold text-sm shadow-[3px_3px_0_0_#000] transition-all hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0_0_#000] ${
                                    t.active
                                        ? "bg-[#FF6B6B] text-white"
                                        : "bg-white text-black"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    {/* Generate */}
                    <button
                        type="button"
                        className="mt-6 w-full bg-black text-yellow-400 font-extrabold border-[3px] border-black rounded-2xl py-4 inline-flex items-center justify-center gap-2 shadow-[5px_5px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000] transition-all"
                    >
                        <SparklesIcon className="size-5" /> Generate
                    </button>
                </div>

                {/* This week card */}
                <div className="bg-[#6EE7B7] rounded-[28px] border-[3px] border-black shadow-[8px_8px_0_0_#000] p-8">
                    <div className="inline-flex items-center bg-white text-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-1.5 rounded-full border-[2.5px] border-black">
                        This Week
                    </div>

                    <h3 className="mt-5 font-black text-3xl sm:text-4xl text-black leading-tight">
                        Your hive, on auto-pilot.
                    </h3>

                    <div className="mt-6 space-y-3">
                        {SCHEDULE.map((s) => (
                            <div
                                key={s.day}
                                className={`flex items-center rounded-2xl border-[2.5px] border-black overflow-hidden ${s.bg}`}
                            >
                                <div
                                    className={`px-5 py-3 font-black text-sm tracking-wider border-r-[2.5px] border-black ${s.dayBg}`}
                                >
                                    {s.day}
                                </div>
                                <div className="px-4 py-3 font-bold text-sm">
                                    {s.text}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
