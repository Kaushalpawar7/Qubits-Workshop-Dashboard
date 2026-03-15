import { Zap, Shield, Target, Trophy } from 'lucide-react';
import './InteractiveStats.css';

interface StatProps {
    label: string;
    value: number;
    total: number;
    color: string;
    icon: any;
}

const StatRing = ({ label, value, total, color, icon: Icon }: StatProps) => {
    const percentage = (value / total) * 100;
    const circumference = 2 * Math.PI * 32;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="stat-ring-container">
            <div className="ring-box">
                <svg width="80" height="80">
                    <circle
                        className="ring-bg"
                        cx="40" cy="40" r="32"
                    />
                    <circle
                        className="ring-fill"
                        cx="40" cy="40" r="32"
                        style={{
                            stroke: color,
                            strokeDasharray: circumference,
                            strokeDashoffset: offset
                        }}
                    />
                </svg>
                <div className="ring-icon" style={{ color }}>
                    <Icon size={20} />
                </div>
            </div>
            <div className="ring-info">
                <h3 style={{ fontSize: '1rem' }}>{value}%</h3>
                <p style={{ fontSize: '0.65rem' }}>{label}</p>
            </div>
        </div>
    );
};

export const InteractiveStats = () => {
    return (
        <div className="interactive-stats-grid">
            <div className="card stat-card-glass">
                <div className="card-header-v2">
                    <Zap size={18} color="#3b82f6" />
                    <span>Power Metrics</span>
                </div>
                <div className="rings-wrapper">
                    <StatRing label="Consistency" value={92} total={100} color="#3b82f6" icon={Shield} />
                    <StatRing label="Punctuality" value={78} total={100} color="#8b5cf6" icon={Target} />
                    <StatRing label="Engagement" value={85} total={100} color="#10b981" icon={Trophy} />
                </div>
            </div>

            <div className="card mini-pulse-card">
                <div className="pulse-header">
                    <div className="pulse-indicator">
                        <div className="pulse-dot" />
                        <span>SYSTEM ONLINE</span>
                    </div>
                    <h3>Real-time Activity Stream</h3>
                </div>
                <div className="pulse-visual">
                    <div className="wave-container">
                        <div className="wave" />
                        <div className="wave delay-1" />
                        <div className="wave delay-2" />
                    </div>
                    <div className="pulse-stats">
                        <div className="p-stat">
                            <span className="p-val">48ms</span>
                            <span className="p-lbl">Latency</span>
                        </div>
                        <div className="p-stat">
                            <span className="p-val">100%</span>
                            <span className="p-lbl">Sync</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
