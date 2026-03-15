import { LayoutDashboard, Users, Calendar, Settings, LogOut, ChevronRight } from 'lucide-react';
import './Sidebar.css';

interface SidebarProps {
    onLogout: () => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ onLogout, activeTab, setActiveTab }: SidebarProps) => {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'attendance', label: 'Attendance Logs', icon: Users },
        { id: 'analytics', label: 'Analytics', icon: Calendar },
        { id: 'settings', label: 'Configuration', icon: Settings },
    ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className="logo-box">
                    <div className="logo-icon">Q</div>
                    <span className="logo-text">Qubits IoT</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                        {activeTab === item.id && <ChevronRight size={16} className="active-arrow" />}
                    </button>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="logout-btn" onClick={onLogout}>
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};
