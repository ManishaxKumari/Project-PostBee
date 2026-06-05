// import { Link } from "react-router-dom";
// import { ArrowRightIcon, DotIcon } from "lucide-react";

// export default function Hero() {
//     return (
//         <section className="relative overflow-hidden">
//             {/* Subtle grid */}
//             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-size-[56px_56px] pointer-events-none" />

//             {/* Red soft glow */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)] pointer-events-none" />

//             <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
//                 {/* Badge */}
//                 {/* <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-500 text-sm px-3.5 py-1.5 rounded-full mb-8">
//                     <span className="size-1.5 bg-red-400 rounded-full" />
//                     AI-Powered Social Media Automation
//                 </div> */}

//                 {/* Headline */}
//                 <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-900">
//                     Schedule smarter.
//                     <br />
//                     <span className="text-red-400 italic">Grow faster.</span>
//                 </h1>

//                 {/* Subheadline */}
//                 <p className="mt-7 text-gray-500 max-w-2xl mx-auto">Scheduler lets you create, schedule, and auto-engage across all your social platforms — powered by AI that writes your captions and replies for you.</p>

//                 {/* CTAs */}
//                 <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
//                     <Link to="/login" className="bg-red-500 text-white rounded-full font-medium hover:bg-red-600 hover:shadow-[0_8px_24px_rgba(239,68,68,0.35)] inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all">
//                         Start for free <ArrowRightIcon className="size-4" />
//                     </Link>
//                     <a href="#how-it-works" className="bg-transparent text-[#333] border-[1.5px] border-black/10 rounded-full font-medium hover:bg-black/5 hover:border-black/20 inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto backdrop-blur justify-center transition-all">
//                         See how it works
//                     </a>
//                 </div>

//                 <p className="mt-5 text-xs text-gray-400">No credit card required · Free forever plan available</p>
//             </div>

//             {/* Dashboard mockup */}
//             <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-0">
//                 <div className="rounded-t-2xl overflow-hidden border border-gray-200 border-b-0">
//                     {/* Browser chrome */}
//                     <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#f0f0f0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
//                         <div className="w-3 h-3 rounded-full bg-red-400" />
//                         <div className="w-3 h-3 rounded-full bg-amber-400" />
//                         <div className="w-3 h-3 rounded-full bg-emerald-400" />
//                         <div className="flex-1 mx-4 rounded-md h-5 max-w-xs bg-white/80" />
//                     </div>

//                     {/* Mock content */}
//                     <div className="p-6" style={{ background: "#f7f7f7" }}>
//                         {/* Stat row */}
//                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
//                             {[
//                                 { val: "12", label: "Scheduled" },
//                                 { val: "48", label: "Published" },
//                                 { val: "4", label: "Accounts" },
//                                 { val: "3", label: "AI Rules" },
//                             ].map((s) => (
//                                 <div key={s.label} className="rounded-xl p-4 bg-white" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
//                                     <div className="text-2xl font-bold text-gray-900 tabular-nums">{s.val}</div>
//                                     <div className="text-xs text-gray-400 mt-1">{s.label}</div>
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Activity list */}
//                         <div className="rounded-xl p-4 space-y-3 bg-white" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
//                             <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Recent Activity</div>
//                             {[
//                                 { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
//                                 { text: "AI replied to 3 comments", time: "15m ago" },
//                                 { text: "New post scheduled for tomorrow 9am", time: "1h ago" },
//                             ].map((item) => (
//                                 <div key={item.text} className="flex items-center gap-3">
//                                     <DotIcon className="size-5 text-gray-300" />
//                                     <span className="text-sm text-gray-600 flex-1">{item.text}</span>
//                                     <span className="text-xs text-gray-300 shrink-0">{item.time}</span>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }


import { ArrowRightIcon, DotIcon } from "lucide-react";

// Honeycomb SVG pattern as background
const honeycombBg = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='96' viewBox='0 0 56 96'><g fill='none' stroke='rgba(202,138,4,0.18)' stroke-width='1.2'><polygon points='28,2 54,17 54,47 28,62 2,47 2,17'/><polygon points='28,50 54,65 54,95 28,110 2,95 2,65'/></g></svg>")`;

function Bee({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return (
        <div className={className} style={style}>
            <svg width="44" height="34" viewBox="0 0 44 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* wings */}
                <ellipse cx="14" cy="8" rx="9" ry="6" fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.15)" />
                <ellipse cx="26" cy="8" rx="9" ry="6" fill="rgba(255,255,255,0.85)" stroke="rgba(0,0,0,0.15)" />
                {/* body */}
                <ellipse cx="22" cy="20" rx="13" ry="9" fill="#facc15" stroke="#1f2937" strokeWidth="1.2" />
                <rect x="14" y="12" width="3" height="16" fill="#1f2937" />
                <rect x="21" y="11" width="3" height="18" fill="#1f2937" />
                <rect x="28" y="12" width="3" height="16" fill="#1f2937" />
                {/* eye */}
                <circle cx="34" cy="18" r="1.5" fill="#1f2937" />
                {/* stinger */}
                <polygon points="35,20 40,22 35,24" fill="#1f2937" />
            </svg>
        </div>
    );
}

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-amber-50/40">
            {/* Honeycomb pattern background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-70"
                style={{ backgroundImage: honeycombBg, backgroundSize: "56px 96px" }}
            />

            {/* Yellow soft glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.25)_0%,transparent_70%)] pointer-events-none" />

            {/* Flying bees */}
            <Bee className="absolute top-24 left-[8%] animate-bee-1 pointer-events-none" />
            <Bee className="absolute top-40 right-[10%] animate-bee-2 pointer-events-none" style={{ transform: "scaleX(-1)" }} />
            <Bee className="absolute top-[420px] left-[15%] animate-bee-3 pointer-events-none" />
            <Bee className="absolute top-[360px] right-[18%] animate-bee-1 pointer-events-none" style={{ animationDelay: "-3s" }} />

            <div className="relative max-w-6xl mx-auto px-5 sm:px-8 pt-20 pb-12 text-center">
                <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl xl:text-8xl text-slate-900">
                    Schedule smarter.
                    <br />
                    <span className="text-yellow-500 italic">Grow faster.</span>
                </h1>

                <p className="mt-7 text-gray-500 max-w-2xl mx-auto">
                    PostBee lets you create, schedule, and auto-engage across all your social platforms — powered by AI that writes your captions and replies for you.
                </p>

                <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a href="/login" className="bg-yellow-500 text-white rounded-full font-medium hover:bg-yellow-600 hover:shadow-[0_8px_24px_rgba(234,179,8,0.4)] inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto justify-center transition-all">
                        Start for free <ArrowRightIcon className="size-4" />
                    </a>
                    <a href="#how-it-works" className="bg-transparent text-[#333] border-[1.5px] border-black/10 rounded-full font-medium hover:bg-black/5 hover:border-black/20 inline-flex items-center gap-2 text-[15px] px-8 py-3.5 w-full sm:w-auto backdrop-blur justify-center transition-all">
                        See how it works
                    </a>
                </div>

                <p className="mt-5 text-xs text-gray-400">No credit card required · Free forever plan available</p>
            </div>

            {/* Dashboard mockup */}
            <div className="relative max-w-5xl mx-auto px-5 sm:px-8 pb-0">
                <div className="rounded-t-2xl overflow-hidden border border-amber-200 border-b-0">
                    <div className="flex items-center gap-2 px-4 py-3" style={{ background: "#fef9c3", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-amber-400" />
                        <div className="w-3 h-3 rounded-full bg-emerald-400" />
                        <div className="flex-1 mx-4 rounded-md h-5 max-w-xs bg-white/80" />
                    </div>
                    <div className="p-6" style={{ background: "#fffbeb" }}>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                            {[
                                { val: "12", label: "Scheduled" },
                                { val: "48", label: "Published" },
                                { val: "4", label: "Accounts" },
                                { val: "3", label: "AI Rules" },
                            ].map((s) => (
                                <div key={s.label} className="rounded-xl p-4 bg-white" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                                    <div className="text-2xl font-bold text-gray-900 tabular-nums">{s.val}</div>
                                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                                </div>
                            ))}
                        </div>
                        <div className="rounded-xl p-4 space-y-3 bg-white" style={{ border: "1px solid rgba(0,0,0,0.06)" }}>
                            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3">Recent Activity</div>
                            {[
                                { text: "Post published to LinkedIn & Twitter", time: "2m ago" },
                                { text: "AI replied to 3 comments", time: "15m ago" },
                                { text: "New post scheduled for tomorrow 9am", time: "1h ago" },
                            ].map((item) => (
                                <div key={item.text} className="flex items-center gap-3">
                                    <DotIcon className="size-5 text-gray-300" />
                                    <span className="text-sm text-gray-600 flex-1">{item.text}</span>
                                    <span className="text-xs text-gray-300 shrink-0">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


