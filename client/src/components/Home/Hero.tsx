import { ArrowRightIcon, DotIcon, CheckCircle2Icon } from "lucide-react";

// Grid background like the honeybee reference
const gridBg =
    "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-yellow-400">
            {/* Grid */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: gridBg, backgroundSize: "48px 48px" }}
            />

            {/* Floating sticker chips */}
            <div className="hidden sm:flex absolute top-28 left-6 lg:left-16 -rotate-12 items-center gap-1.5 bg-[#FF6B6B] text-white text-sm font-extrabold px-4 py-2 rounded-full border-[2.5px] border-black shadow-[5px_5px_0_0_#000]">
                buzz
            </div>
            <div className="hidden sm:flex absolute top-36 right-6 lg:right-16 rotate-6 items-center gap-1.5 bg-[#6EE7B7] text-black text-sm font-extrabold px-4 py-2 rounded-full border-[2.5px] border-black shadow-[5px_5px_0_0_#000]">
                +120% reach
            </div>

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-16 text-center">
                {/* Version chip */}
                <div className="inline-flex items-center gap-2 bg-white text-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full border-[2.5px] border-black shadow-[4px_4px_0_0_#000] mb-8">
                    SOCIAL SCHEDULER · V1.0
                </div>

                {/* Headline */}
                <h1 className="font-black text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-black leading-[1.05] tracking-tight">
                    Create once.{" "}
                    <br />
                    <span className="inline-block bg-[#FF6B6B] text-white px-3 py-1 -rotate-1 border-[3px] border-black shadow-[6px_6px_0_0_#000]">
                        Buzz
                    </span>
                    
                    <span className="inline-block bg-white text-black px-3 py-1 rotate-1 border-[3px] border-black shadow-[6px_6px_0_0_#000] mt-3">
                        everywhere
                    </span>{" "}
                    {/* for you. */}
                </h1>

                {/* Subhead */}
                <p className="mt-8 text-black/80 font-medium max-w-2xl mx-auto text-lg">
                    PostBee is a chunky, no-nonsense scheduler that drafts, designs and ships your posts
                    to every platform — while you sip something cold.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="/login"
                        className="bg-black text-yellow-400 font-extrabold border-[3px] border-black rounded-full px-8 py-4 inline-flex items-center gap-2 shadow-[6px_6px_0_0_#fff] hover:shadow-[3px_3px_0_0_#fff] hover:translate-x-[3px] hover:translate-y-[3px] transition-all w-full sm:w-auto justify-center"
                    >
                        Start the hive <ArrowRightIcon className="size-4" />
                    </a>
                    <a
                        href="#how-it-works"
                        className="bg-white text-black font-extrabold border-[3px] border-black rounded-full px-8 py-4 inline-flex items-center gap-2 shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] transition-all w-full sm:w-auto justify-center"
                    >
                        Watch demo
                    </a>
                </div>

                {/* Trust line */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-black font-bold text-sm">
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2Icon className="size-4" /> No credit card</span>
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2Icon className="size-4" /> 7 platforms</span>
                    <span className="inline-flex items-center gap-1.5"><CheckCircle2Icon className="size-4" /> AI image gen</span>
                </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-0">
                <div className="rounded-t-[28px] overflow-hidden border-[3px] border-b-0 border-black shadow-[10px_-4px_0_0_#000] bg-white">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 bg-yellow-300 border-b-[3px] border-black">
                        <div className="size-3.5 rounded-full bg-[#FF6B6B] border-[2px] border-black" />
                        <div className="size-3.5 rounded-full bg-yellow-400 border-[2px] border-black" />
                        <div className="size-3.5 rounded-full bg-[#6EE7B7] border-[2px] border-black" />
                        <div className="flex-1 mx-4 h-6 max-w-xs bg-white rounded-md border-[2px] border-black" />
                    </div>

                    {/* Content */}
                    <div className="p-6 bg-[#FFFBEA]">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            {[
                                { val: "12", label: "Scheduled", bg: "bg-white" },
                                { val: "48", label: "Published", bg: "bg-[#6EE7B7]" },
                                { val: "4", label: "Accounts", bg: "bg-white" },
                                { val: "3", label: "AI Rules", bg: "bg-[#FF6B6B] text-white" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className={`rounded-2xl p-4 border-[2.5px] border-black shadow-[4px_4px_0_0_#000] ${s.bg}`}
                                >
                                    <div className="text-3xl font-black tabular-nums">{s.val}</div>
                                    <div className="text-xs font-bold uppercase tracking-wider mt-1 opacity-80">{s.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className="rounded-2xl p-5 bg-white border-[2.5px] border-black shadow-[4px_4px_0_0_#000]">
                            <div className="text-[11px] font-extrabold uppercase tracking-widest mb-3">Recent Activity</div>
                            {[
                                { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
                                { text: "AI replied to 3 comments", time: "15m ago" },
                                { text: "New post scheduled for tomorrow 9am", time: "1h ago" },
                            ].map((item) => (
                                <div key={item.text} className="flex items-center gap-3 py-1.5">
                                    <DotIcon className="size-6 text-black" />
                                    <span className="text-sm font-medium text-black flex-1">{item.text}</span>
                                    <span className="text-xs font-bold text-black/60 shrink-0">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
