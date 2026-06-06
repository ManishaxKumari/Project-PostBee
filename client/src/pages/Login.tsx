import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MailIcon, LockIcon, ArrowRightIcon, User2Icon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

export default function Login() {
    const [loginState, setLoginState] = useState(true);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login, user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post(`/api/auth/${loginState ? "login" : "register"}`, { name, email, password });
            login(data, data.token);
            navigate("/dashboard");
        } catch (error: any) {
            toast.error(error.response?.data?.message || error?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) navigate("/dashboard");
    }, [user]);

    return (
        <div
            className="min-h-screen bg-amber-300 flex items-center justify-center p-4"
            style={{
                backgroundImage:
                    "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                backgroundBlendMode: "soft-light",
            }}
        >
            <div className="relative w-full max-w-md">
                {/* sticker */}
                <span className="absolute -top-5 -left-3 z-10 rotate-[-8deg] bg-rose-400 border-[3px] border-black px-3 py-1 text-xs font-black uppercase shadow-[4px_4px_0_0_#000] rounded-full">
                    buzz in
                </span>

                <div className="bg-white border-[3px] border-black rounded-2xl shadow-[8px_8px_0_0_#000] p-8">
                    <div className="flex flex-col items-center mb-8">
                        <Link to="/" className="flex items-center gap-2">
                            <img src="/favicon.svg" alt="PostBee logo" className="w-10 h-10 rounded-full object-contain" />
                            <h1 className="text-2xl font-black tracking-tight uppercase">PostBee</h1>
                        </Link>
                        <p className="text-black/70 text-sm mt-2 font-bold">
                            {loginState ? "Sign in to your Dashboard" : "Create your account"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                        {!loginState && (
                            <div>
                                <label className="block mb-1.5 font-black uppercase text-xs">Name</label>
                                <div className="relative">
                                    <User2Icon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your name"
                                        className="w-full pl-10 pr-4 py-2.5 bg-amber-50 border-[3px] border-black rounded-xl font-bold focus:outline-none focus:shadow-[3px_3px_0_0_#000] focus:-translate-y-0.5 transition"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                        <div>
                            <label className="block mb-1.5 font-black uppercase text-xs">Email</label>
                            <div className="relative">
                                <MailIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                                <input
                                    type="email"
                                    required
                                    placeholder="you@company.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-amber-50 border-[3px] border-black rounded-xl font-bold focus:outline-none focus:shadow-[3px_3px_0_0_#000] focus:-translate-y-0.5 transition"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block mb-1.5 font-black uppercase text-xs">Password</label>
                            <div className="relative">
                                <LockIcon className="size-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-black" />
                                <input
                                    type="password"
                                    required
                                    placeholder="********"
                                    className="w-full pl-10 pr-4 py-2.5 bg-amber-50 border-[3px] border-black rounded-xl font-bold focus:outline-none focus:shadow-[3px_3px_0_0_#000] focus:-translate-y-0.5 transition"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 py-3 px-4 bg-amber-400 border-[3px] border-black text-black rounded-xl text-sm font-black uppercase tracking-wide shadow-[5px_5px_0_0_#000] hover:-translate-y-0.5 hover:shadow-[7px_7px_0_0_#000] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000] transition disabled:opacity-60 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                "Signing in..."
                            ) : (
                                <>
                                    {loginState ? "Sign In" : "Sign Up"} <ArrowRightIcon className="size-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm font-bold">
                        {loginState ? (
                            <>
                                Don't have an account?{" "}
                                <button onClick={() => setLoginState(false)} className="underline decoration-[3px] decoration-amber-400 font-black hover:text-rose-500">
                                    Create one free
                                </button>
                            </>
                        ) : (
                            <>
                                Already have an account?{" "}
                                <button onClick={() => setLoginState(true)} className="underline decoration-[3px] decoration-amber-400 font-black hover:text-rose-500">
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
