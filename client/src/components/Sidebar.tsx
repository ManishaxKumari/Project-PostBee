import { CalendarDaysIcon, LayoutDashboardIcon, LogOutIcon, UsersIcon, Wand2Icon } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

// Renamed visually to a floating bottom nav, but kept the file/export name
// so existing imports (`import Sidebar from './Sidebar'`) keep working.
const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (val: boolean) => void }) => {
    const { logout, user } = useAuth()
    const location = useLocation()
    const [hovered, setHovered] = useState<string | null>(null)

    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboardIcon, path: '/dashboard' },
        { name: 'Accounts', icon: UsersIcon, path: '/accounts' },
        { name: 'Scheduler', icon: CalendarDaysIcon, path: '/schedule' },
        { name: 'AI Composer', icon: Wand2Icon, path: '/ai-composer' },
    ]

    // Suppress unused-prop warnings; props kept for API compatibility with Layout.
    void isOpen
    void setIsOpen

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <nav className="relative flex items-center gap-1 sm:gap-2 bg-white rounded-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.25)] px-3 py-2 border border-slate-100">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path
                    const showTip = hovered === item.name

                    return (
                        <div key={item.name} className="relative">
                            {showTip && (
                                <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-slate-800 text-xs rounded-lg shadow-md whitespace-nowrap after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-white">
                                    {item.name}
                                </div>
                            )}
                            <NavLink
                                to={item.path}
                                end={item.path === '/dashboard'}
                                onMouseEnter={() => setHovered(item.name)}
                                onMouseLeave={() => setHovered(null)}
                                className={`flex items-center justify-center rounded-full transition-all duration-200 ${
                                    isActive
                                        ? 'size-12 bg-yellow-400 text-white shadow-lg shadow-yellow-400/40 scale-110'
                                        : 'size-11 text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <item.icon className="size-5" />
                            </NavLink>
                        </div>
                    )
                })}

                <div className="mx-1 h-8 w-px bg-slate-200" />

                {/* User avatar */}
                <div
                    className="relative"
                    onMouseEnter={() => setHovered('__user')}
                    onMouseLeave={() => setHovered(null)}
                >
                    {hovered === '__user' && (
                        <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-slate-800 text-xs rounded-lg shadow-md whitespace-nowrap">
                            {user?.name || 'Account'}
                        </div>
                    )}
                    <div className="size-11 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                </div>

                {/* Logout */}
                <div
                    className="relative"
                    onMouseEnter={() => setHovered('__logout')}
                    onMouseLeave={() => setHovered(null)}
                >
                    {hovered === '__logout' && (
                        <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-white text-slate-800 text-xs rounded-lg shadow-md whitespace-nowrap">
                            Sign Out
                        </div>
                    )}
                    <button
                        onClick={logout}
                        className="size-11 flex items-center justify-center rounded-full text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150"
                    >
                        <LogOutIcon className="size-5" />
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Sidebar
