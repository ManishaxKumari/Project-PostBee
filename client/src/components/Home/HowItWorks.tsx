import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

const steps = [
    { step: "01", title: "Connect Your Accounts", description: "Link your social profiles in seconds. We support Twitter, LinkedIn, Facebook, and Instagram.", bg: "bg-yellow-400" },
    { step: "02", title: "Create or Generate Content", description: "Write your own post or let our AI craft a caption and image based on your prompt.", bg: "bg-[#6EE7B7]" },
    { step: "03", title: "Schedule & Publish", description: "Pick a time, select your platforms, and hit schedule. We handle publishing automatically.", bg: "bg-[#FF6B6B] text-white" },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-yellow-400 border-[2.5px] border-black text-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000]">
                        <CheckCircleIcon className="size-3.5" />
                        Simple setup
                    </div>
                    <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-black tracking-tight">
                        Up and running in{" "}
                        <span className="inline-block bg-[#FF6B6B] text-white px-3 py-1 rotate-1 border-[3px] border-black shadow-[6px_6px_0_0_#000]">
                            minutes
                        </span>
                    </h2>
                    <p className="mt-6 text-black/70 font-medium max-w-lg mx-auto">
                        No complicated onboarding, no steep learning curve. Just connect, create, and grow.
                    </p>
                </div>

                <div className="space-y-6">
                    {steps.map((s, i) => (
                        <div
                            key={s.step}
                            className={`${s.bg} flex flex-col sm:flex-row gap-5 sm:items-center p-6 rounded-3xl border-[3px] border-black shadow-[6px_6px_0_0_#000]`}
                        >
                            <div className="shrink-0 size-14 rounded-2xl bg-black text-yellow-400 border-[2.5px] border-black flex items-center justify-center font-black text-lg">
                                {s.step}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-black text-xl mb-1 tracking-tight">{s.title}</h3>
                                <p className="text-sm font-medium leading-relaxed opacity-85">{s.description}</p>
                            </div>
                            {i < steps.length - 1 && (
                                <div className="hidden sm:flex shrink-0 size-10 rounded-full bg-white border-[2.5px] border-black items-center justify-center">
                                    <ArrowRightIcon className="size-4 text-black" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
