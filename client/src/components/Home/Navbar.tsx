import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

export default function Navbar() {
    return (
        <div className="sticky top-0 z-50 px-4 sm:px-6 pt-4">
            <nav className="max-w-6xl mx-auto bg-white border-[3px] border-black rounded-full shadow-[6px_6px_0_0_#000] px-5 sm:px-6 h-16 flex items-center justify-between">
                <Link to="/" onClick={() => scrollTo(0, 0)} className="flex items-center gap-2.5">
                    <span className="size-9 rounded-full bg-yellow-400 border-[2.5px] border-black flex items-center justify-center text-base">🐝</span>
                    <span className="text-lg lg:text-xl font-extrabold tracking-tight text-black uppercase">PostBee</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-bold text-black">
                    <a href="#features" className="hover:text-yellow-600 transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-yellow-600 transition-colors">How it works</a>
                    <a href="#pricing" className="hover:text-yellow-600 transition-colors">Pricing</a>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/login" className="text-sm font-bold text-black hover:underline hidden sm:block">
                        Sign In
                    </Link>
                    <Link
                        to="/login"
                        className="flex items-center gap-1.5 text-sm font-bold bg-[#FF6B6B] text-white border-[2.5px] border-black px-4 py-2 rounded-full shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        Start free <ArrowRightIcon className="size-3.5" />
                    </Link>
                </div>
            </nav>
        </div>
    );
}
