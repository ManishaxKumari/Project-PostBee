import { ArrowRightIcon } from "lucide-react";

const gridBg =
    "linear-gradient(rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.08) 1px, transparent 1px)";

export default function CTA() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
                <div className="relative rounded-4xl overflow-hidden p-12 sm:p-20 text-center bg-yellow-400 border-[3px] border-black shadow-[10px_10px_0_0_#000]">
                    {/* Grid */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-90"
                        style={{ backgroundImage: gridBg, backgroundSize: "40px 40px" }}
                    />

                    {/* Sticker chips */}
                    <div className="hidden sm:flex absolute top-6 left-6 -rotate-12 items-center gap-1.5 bg-[#FF6B6B] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full border-[2.5px] border-black shadow-[4px_4px_0_0_#000]">
                        🐝 buzz
                    </div>
                    <div className="hidden sm:flex absolute top-6 right-6 rotate-6 items-center gap-1.5 bg-[#6EE7B7] text-black text-xs font-extrabold px-3.5 py-1.5 rounded-full border-[2.5px] border-black shadow-[4px_4px_0_0_#000]">
                        Ready?
                    </div>

                    <div className="relative">
                        <div className="mb-6 inline-flex items-center gap-1.5 bg-white border-[2.5px] border-black text-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000]">
                            Ready to grow?
                        </div>
                        <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-black tracking-tight">
                            Automate your social
                            <br />
                            <span className="inline-block bg-black text-yellow-400 px-4 py-1 mt-3 -rotate-1 border-[3px] border-black shadow-[6px_6px_0_0_#fff]">
                                media today
                            </span>
                        </h2>
                        <p className="mt-6 text-black/80 font-medium max-w-lg mx-auto text-lg">
                            Join thousands of creators and marketers who trust PostBee to grow their audience on autopilot.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a
                                href="#"
                                className="bg-black text-yellow-400 font-extrabold border-[3px] border-black rounded-full px-10 py-4 inline-flex items-center gap-2 shadow-[6px_6px_0_0_#fff] hover:shadow-[3px_3px_0_0_#fff] hover:translate-x-0.75 hover:translate-y-0.75 transition-all w-full sm:w-auto justify-center"
                            >
                                Get Started Free <ArrowRightIcon className="size-4" />
                            </a>
                            <a
                                href="#pricing"
                                className="bg-white text-black font-extrabold border-[3px] border-black rounded-full px-10 py-4 inline-flex items-center gap-2 shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-0.75 hover:translate-y-0.75 transition-all w-full sm:w-auto justify-center"
                            >
                                View Pricing
                            </a>
                        </div>

                        <p className="mt-7 text-xs font-bold text-black/70">No credit card required · Cancel anytime</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
