import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Moon, Globe, Lock, Eye, Volume2, Palette, LogOut } from 'lucide-react';
import { ThemeContext } from '../App';

interface SettingToggleProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    enabled: boolean;
    onChange: (enabled: boolean) => void;
}

function SettingToggle({ icon, title, description, enabled, onChange }: SettingToggleProps) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <div className="flex items-center justify-between py-4">
            <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg ${darkMode ? 'bg-indigo-900/20' : 'bg-indigo-50'}`}>
                    {icon}
                </div>
                <div>
                    <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{description}</p>
                </div>
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={enabled}
                className={`${
                    enabled ? 'bg-indigo-600' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 ${
                    darkMode ? 'focus:ring-offset-gray-900' : ''
                }`}
                onClick={() => onChange(!enabled)}
            >
        <span
            aria-hidden="true"
            className={`${
                enabled ? 'translate-x-5' : 'translate-x-0'
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
            </button>
        </div>
    );
}

interface ColorSchemeOptionProps {
    name: string;
    colors: string[];
    selected: boolean;
    onClick: () => void;
}

function ColorSchemeOption({ name, colors, selected, onClick }: ColorSchemeOptionProps) {
    const { darkMode } = useContext(ThemeContext);

    return (
        <button
            onClick={onClick}
            className={`relative rounded-lg p-2 flex flex-col items-center gap-2 ${
                selected ? 'ring-2 ring-indigo-600' : darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
            }`}
        >
            <div className="flex gap-1">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>
            <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</span>
        </button>
    );
}

export function SettingsPage() {
    const navigate = useNavigate();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [settings, setSettings] = useState({
        notifications: true,
        soundEffects: true,
        autoUpdate: false,
        highContrast: false,
        compactMode: false
    });

    const [selectedColorScheme, setSelectedColorScheme] = useState('default');

    const colorSchemes = [
        {
            name: 'Default',
            colors: ['#4F46E5', '#22C55E', '#EF4444', '#F59E0B']
        },
        {
            name: 'Ocean',
            colors: ['#0EA5E9', '#0D9488', '#6366F1', '#8B5CF6']
        },
        {
            name: 'Forest',
            colors: ['#22C55E', '#15803D', '#854D0E', '#92400E']
        },
        {
            name: 'Sunset',
            colors: ['#F97316', '#DC2626', '#7C3AED', '#2563EB']
        }
    ];

    const handleSettingChange = (key: keyof typeof settings) => (value: boolean) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className={`p-6 max-w-4xl mx-auto ${darkMode ? 'text-white' : ''}`}>
            <div className="mb-8">
                <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Settings</h1>
                <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Manage your application preferences and customize your experience
                </p>
            </div>

            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow divide-y ${darkMode ? 'divide-gray-700' : 'divide-gray-200'}`}>
                <div className="p-6">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Appearance</h2>
                    <div className="space-y-4">
                        <SettingToggle
                            icon={<Moon className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />}
                            title="Dark Mode"
                            description="Use dark theme for all windows"
                            enabled={darkMode}
                            onChange={toggleDarkMode}
                        />
                        <SettingToggle
                            icon={<Eye className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />}
                            title="High Contrast"
                            description="Increase contrast for better visibility"
                            enabled={settings.highContrast}
                            onChange={handleSettingChange('highContrast')}
                        />
                        <div className="pt-4">
                            <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Color Scheme</h3>
                            <div className="grid grid-cols-4 gap-4">
                                {colorSchemes.map((scheme) => (
                                    <ColorSchemeOption
                                        key={scheme.name}
                                        name={scheme.name}
                                        colors={scheme.colors}
                                        selected={selectedColorScheme === scheme.name.toLowerCase()}
                                        onClick={() => setSelectedColorScheme(scheme.name.toLowerCase())}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Notifications</h2>
                    <div className="space-y-4">
                        <SettingToggle
                            icon={<Bell className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />}
                            title="Push Notifications"
                            description="Receive notifications for important updates"
                            enabled={settings.notifications}
                            onChange={handleSettingChange('notifications')}
                        />
                        <SettingToggle
                            icon={<Volume2 className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />}
                            title="Sound Effects"
                            description="Play sounds for notifications and actions"
                            enabled={settings.soundEffects}
                            onChange={handleSettingChange('soundEffects')}
                        />
                    </div>
                </div>

                <div className="p-6">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>System</h2>
                    <div className="space-y-4">
                        <SettingToggle
                            icon={<Globe className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />}
                            title="Auto Updates"
                            description="Automatically install updates when available"
                            enabled={settings.autoUpdate}
                            onChange={handleSettingChange('autoUpdate')}
                        />
                        <SettingToggle
                            icon={<Palette className={`w-5 h-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />}
                            title="Compact Mode"
                            description="Reduce spacing between elements"
                            enabled={settings.compactMode}
                            onChange={handleSettingChange('compactMode')}
                        />
                    </div>
                </div>

                <div className="p-6">
                    <h2 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Account</h2>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}