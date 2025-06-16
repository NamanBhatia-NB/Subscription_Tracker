import { useState } from "react";
import ExportData from "./ExportData"; // Adjust path as needed
import { useAuth } from "../contexts/AuthContext"
import { useTheme } from "../contexts/ThemeContext"

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth()
    const { theme, toggleTheme } = useTheme()

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo and Title */}
                    <div className="flex items-center">
                        <div className="h-8 w-8 mr-2 text-blue-600 text-2xl">💳</div>
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                            Subscription Tracker
                        </h1>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden sm:flex items-center space-x-3">
                        <span className="text-sm text-gray-600 dark:text-gray-300 hidden md:inline">
                            Welcome, {user?.name}
                        </span>
                        <button
                            onClick={toggleTheme}
                            className="p-2 flex items-center justify-center bg-blue-600 text-white rounded-md hover:bg-blue-700 border"
                        >
                            {theme === "light" ? "🌙" : "☀️"}
                        </button>
                        <ExportData />
                        <button
                            onClick={logout}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 border rounded-md"
                        >
                            🚪 Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="sm:hidden">
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="text-gray-700 dark:text-white focus:outline-none"
                        >
                            {menuOpen ?
                                <> &#10006; </> :
                                <> ☰ </>
                            }

                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {menuOpen && (
                    <div className="sm:hidden mt-2 flex flex-col space-y-2 pb-3 border-t pt-3 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300">
                            Welcome, {user?.name}
                        </span>
                        <button
                            onClick={toggleTheme}
                            className="p-2 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 border w-full"
                        >
                            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
                        </button>
                        <ExportData />
                        <button
                            onClick={logout}
                            className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 border rounded-md w-full"
                        >
                            🚪 Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
