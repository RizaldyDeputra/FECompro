import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import {
    BarChart3,
    Layout,
    List,
    Mail,
    Menu,
    Settings,
    Users
} from 'lucide-react';
import { SidebarItem } from './components/SidebarItem';
import { StatCard } from './components/StatCard';
import { TaskDistribution } from './components/TaskDistribution';
import { Schedule } from './components/Schedule';
import { SentimentOverview } from './components/SentimentOverview';
import { MoodTrend } from './components/MoodTrend';
import { LoginPage } from './pages/LoginPage';
import { UserManagement } from './pages/UserManagement';
import { SettingsPage } from './pages/SettingsPage';

type Page = 'dashboard' | 'widgets' | 'statistics' | 'settings' | 'users';


export const ThemeContext = React.createContext({
    darkMode: false,
    toggleDarkMode: () => {},
});

function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [currentPage, setCurrentPage] = useState<Page>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();
    const { darkMode } = React.useContext(ThemeContext);

    return (
        <div className={`flex h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-[#1a237e] text-white p-6 transition-all duration-300`}>
                <div className={`flex items-center gap-3 mb-8 ${!isSidebarOpen ? 'justify-center' : ''}`}>
                    <div
                        className={`rounded-full bg-white/20 ${isSidebarOpen ? 'w-10 h-10' : 'w-8 h-8'} transition-all duration-300`}></div>
                    {isSidebarOpen && (
                        <div>
                            <h3 className="font-medium">Mas</h3>
                            <p className="text-sm text-white/60">Admin</p>
                        </div>
                    )}
                </div>

                <nav className="space-y-1">
                    <SidebarItem
                        icon={<Layout size={isSidebarOpen ? 20 : 24}/>}
                        text="Dashboard"
                        active={currentPage === 'dashboard'}
                        onClick={() => {
                            setCurrentPage('dashboard');
                            navigate('/dashboard');
                        }}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<Users size={isSidebarOpen ? 20 : 24}/>}
                        text="Users"
                        active={currentPage === 'users'}
                        onClick={() => {
                            setCurrentPage('users');
                            navigate('/users');
                        }}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<List size={isSidebarOpen ? 20 : 24}/>}
                        text="Widgets"
                        active={currentPage === 'widgets'}
                        onClick={() => setCurrentPage('widgets')}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<BarChart3 size={isSidebarOpen ? 20 : 24}/>}
                        text="Statistics"
                        active={currentPage === 'statistics'}
                        onClick={() => setCurrentPage('statistics')}
                        isOpen={isSidebarOpen}
                    />
                    <SidebarItem
                        icon={<Settings size={isSidebarOpen ? 20 : 24}/>}
                        text="Settings"
                        active={currentPage === 'settings'}
                        onClick={() => {
                            setCurrentPage('settings');
                            navigate('/settings');
                        }}
                        isOpen={isSidebarOpen}
                    />
                </nav>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 overflow-auto ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
                <header
                    className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b p-4 flex justify-between items-center`}>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-lg transition-colors`}
                        >
                        <Menu className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </button>
                        <h1 className="text-xl font-semibold">
                            {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
                        </h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className={`p-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} rounded-full`}>
                            <Mail size={20} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                        </button>
                        <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                    </div>
                </header>

                {children}
            </main>
        </div>
    );
}

function Dashboard() {
    const handlePeriodChange = (period: string) => {
        console.log(`Period changed to: ${period}`);
    };

    const { darkMode } = React.useContext(ThemeContext);

    return (
        <div className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Due Tasks" value="45" subtitle="Completed: 14" />
                <StatCard title="Features" value="80" subtitle="Implemented: 11" color="blue" />
                <StatCard title="Issues" value="34" subtitle="Closed today: 10" color="purple" />
                <StatCard title="Overdue" value="7" subtitle="New Added: 4" color="red" />
            </div>

            {/* Sentiment Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <SentimentOverview />
                <MoodTrend />
            </div>

            {/* Task Distribution & Schedule */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskDistribution onPeriodChange={handlePeriodChange} />
                <Schedule onPeriodChange={handlePeriodChange} />
            </div>
        </div>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        // Apply dark mode to the root HTML element
        document.documentElement.classList.toggle('dark', !darkMode);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
                <Route path="/users" element={<DashboardLayout><UserManagement /></DashboardLayout>} />
                <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </ThemeContext.Provider>
    );
}

export default App;