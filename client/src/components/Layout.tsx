import { useState } from 'react'
import Sidebar from './Sidebar'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const pageTitles: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/accounts': 'Social Accounts',
    '/schedule': 'Post Scheduler',
    '/ai-composer': 'AI Composer',
}

const Layout = () => {
    const { isAuthenticated, isLoading } = useAuth()
    const location = useLocation()
    const title = pageTitles[location.pathname] || 'SocialAI'

    // Kept for API compatibility with Sidebar's props (no longer used by bottom nav)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-50">
                <div className="size-8 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            {/* Top Bar */}
            {/* <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 md:px-8 gap-4 shrink-0">
                <div className="flex items-center gap-2">
                    <img src="/logo.svg" alt="logo" className="size-6" />
                    <span className="text-xl tracking-tight text-slate-800">PostBee</span>
                </div>
                <div className="ml-4 md:ml-8">
                    <h1 className="text-slate-900">{title}</h1>
                    <p className="text-sm text-slate-400 hidden sm:block">
                        Manage and automate your social presence
                    </p>
                </div>
            </header> */}

            {/* Main content — bottom padding to clear the floating nav */}
            <main className="flex-1 overflow-auto p-4 sm:p-6 md:p-8 xl:p-12 pb-32">
                <Outlet />
            </main>

            {/* Floating bottom navigation */}
            <Sidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </div>
    )
}

export default Layout
