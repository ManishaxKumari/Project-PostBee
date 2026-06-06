import { Link } from "react-router-dom";

const footerLinks = {
    Product: ["Features", "How it works", "Pricing", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t-[3px] border-black">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" onClick={() => scrollTo(0, 0)} className="inline-flex items-center gap-2.5 mb-5">
                            <img src="/favicon.svg" alt="PostBee logo" className="w-10 h-10 rounded-full bg-yellow-400 border-[2.5px] border-white p-1 object-contain" />
                            <span className="font-black text-2xl uppercase tracking-tight">PostBee</span>
                        </Link>
                        <p className="text-sm font-medium text-white/70 leading-relaxed max-w-xs">
                            The AI-powered social media scheduler that helps creators and teams grow faster with less effort.
                        </p>
                    </div>

                    {Object.entries(footerLinks).map(([category, links]) => (
                        <div key={category}>
                            <div className="text-xs font-black uppercase tracking-widest mb-5 text-yellow-400">{category}</div>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm font-bold text-white/80 hover:text-yellow-400 transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t-[2.5px] border-white/20">
                    <p className="text-xs font-bold text-white/60">© {new Date().getFullYear()} PostBee. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs font-bold text-white/60 hover:text-yellow-400">Privacy Policy</a>
                        <a href="#" className="text-xs font-bold text-white/60 hover:text-yellow-400">Terms of Service</a>
                        <Link to="/login" className="text-xs font-bold text-white/60 hover:text-yellow-400">Sign In</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
