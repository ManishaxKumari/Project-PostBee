import { StarIcon } from "lucide-react";

const testimonials = [
    { name: "Sarah K.", role: "Marketing Manager", avatar: "S", bg: "bg-yellow-400", rotate: "-rotate-2", text: "PostBee has saved our team 10+ hours a week. The AI composer is genuinely impressive — it writes content that sounds like us." },
    { name: "Marcus L.", role: "Indie Creator", avatar: "M", bg: "bg-white", rotate: "rotate-1", text: "I used to dread posting. Now I queue up a whole week of content in 20 minutes. The smart scheduling feature alone is worth it." },
    { name: "Priya D.", role: "Startup Founder", avatar: "P", bg: "bg-[#6EE7B7]", rotate: "-rotate-1", text: "Finally a scheduler that's beautiful AND powerful. The clean dashboard makes it easy to see exactly what's going out and when." },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#FFFBEA] border-y-[3px] border-black">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-14">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-[#FF6B6B] text-white border-[2.5px] border-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000]">
                        <StarIcon className="size-3.5" />
                        Testimonials
                    </div>
                    <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-black tracking-tight">
                        Loved by{" "}
                        <span className="inline-block bg-yellow-400 px-3 py-1 -rotate-1 border-[3px] border-black shadow-[6px_6px_0_0_#000]">
                            creators &amp; teams
                        </span>
                    </h2>
                    <p className="mt-6 text-black/70 font-medium max-w-md mx-auto">
                        Join thousands of people who automate their social media with PostBee.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className={`${t.bg} ${t.rotate} rounded-3xl border-[3px] border-black shadow-[6px_6px_0_0_#000] p-6 flex flex-col gap-4 hover:rotate-0 hover:shadow-[3px_3px_0_0_#000] hover:translate-x-0.75 hover:translate-y-0.75 transition-all`}
                        >
                            <div className="flex gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <StarIcon key={i} className="size-4 fill-black text-black" />
                                ))}
                            </div>
                            <p className="text-black font-medium leading-relaxed flex-1">"{t.text}"</p>
                            <div className="flex items-center gap-3 pt-3 border-t-[2.5px] border-black/80">
                                <div className="size-10 rounded-full bg-black text-yellow-400 border-[2.5px] border-black flex items-center justify-center font-black">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="text-sm font-black text-black">{t.name}</div>
                                    <div className="text-xs font-bold text-black/70">{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
