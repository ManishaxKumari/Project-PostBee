import { CheckIcon, CircleCheckBigIcon } from "lucide-react";

const pricingPlans = [
    { name: "Starter", price: "Free", period: "", description: "Perfect for creators just getting started with social media automation.", features: ["2 social accounts", "10 scheduled posts/month", "AI content (5 credits/mo)", "Basic dashboard"], cta: "Get Started Free", bg: "bg-white", highlight: false },
    { name: "Pro", price: "$29", period: "/month", description: "Everything you need to grow and automate your social presence.", features: ["Unlimited accounts", "Unlimited scheduling", "AI content (200 credits/mo)", "Priority support"], cta: "Start 14-day Free Trial", bg: "bg-yellow-400", highlight: true },
    { name: "Agency", price: "$79", period: "/month", description: "For teams and agencies managing multiple brands at scale.", features: ["Everything in Pro", "5 team members", "Unlimited AI credits", "Custom AI personas", "Dedicated support"], cta: "Contact Sales", bg: "bg-[#6EE7B7]", highlight: false },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <div className="mb-6 inline-flex items-center gap-1.5 bg-white border-[2.5px] border-black text-black text-xs font-extrabold tracking-[0.12em] uppercase px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000]">
                        <CircleCheckBigIcon className="size-3.5" />
                        Simple pricing
                    </div>
                    <h2 className="font-black text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-black tracking-tight">
                        Plans for every stage
                        <br />
                        <span className="inline-block bg-[#FF6B6B] text-white px-3 py-1 mt-2 rotate-1 border-[3px] border-black shadow-[6px_6px_0_0_#000]">
                            of growth
                        </span>
                    </h2>
                    <p className="mt-6 text-black/70 font-medium max-w-md mx-auto">
                        Start free, upgrade when you're ready. Cancel anytime — no hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start pt-4">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`${plan.bg} relative rounded-3xl border-[3px] border-black p-7 flex flex-col gap-6 shadow-[6px_6px_0_0_#000] ${plan.highlight ? "md:-translate-y-3" : ""}`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-yellow-400 text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full border-[2.5px] border-black">
                                    Most Popular
                                </div>
                            )}
                            <div>
                                <div className="text-sm font-black uppercase tracking-wider mb-2 text-black">{plan.name}</div>
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-black text-black">{plan.price}</span>
                                    <span className="text-sm font-bold mb-2 text-black/70">{plan.period}</span>
                                </div>
                                <p className="text-sm mt-3 font-medium leading-relaxed text-black/80">{plan.description}</p>
                            </div>

                            <ul className="space-y-3">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm font-semibold text-black">
                                        <div className="size-5 rounded-full bg-black flex items-center justify-center shrink-0">
                                            <CheckIcon className="w-3 h-3 text-yellow-400" strokeWidth={4} />
                                        </div>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <a
                                href="#"
                                className={`mt-auto text-center font-extrabold text-sm px-6 py-3.5 rounded-full border-[2.5px] border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all ${
                                    plan.highlight ? "bg-black text-yellow-400" : "bg-white text-black"
                                }`}
                            >
                                {plan.cta}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
