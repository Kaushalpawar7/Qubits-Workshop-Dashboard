import { useEffect, useState } from 'react';
import { TrendingUp, Users, MapPin, Clock } from 'lucide-react';
import './Dashboard.css';

interface KPIProps {
    attendanceRate: number;
    totalLectures: number;
    attendedLectures: number;
    isOnCampus: boolean;
}

export const KPIBar = ({
    attendanceRate,
    totalLectures,
    attendedLectures,
    isOnCampus
}: KPIProps) => {
    const [displayRate, setDisplayRate] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setDisplayRate(attendanceRate), 500);
        return () => clearTimeout(timer);
    }, [attendanceRate]);

    return (
        <div className="kpi-grid">
            <div className="kpi-card">
                <div className="kpi-icon-box primary">
                    <TrendingUp size={24} />
                </div>
                <div className="kpi-content">
                    <p>Attendance Rate</p>
                    <h3>{displayRate}%</h3>
                </div>
            </div>

            <div className="kpi-card">
                <div className="kpi-icon-box secondary">
                    <Users size={24} />
                </div>
                <div className="kpi-content">
                    <p>Lectures Attended</p>
                    <h3>{attendedLectures} / {totalLectures}</h3>
                </div>
            </div>

            <div className="kpi-card">
                <div className="kpi-icon-box accent">
                    <MapPin size={24} />
                </div>
                <div className="kpi-content">
                    <p>Status</p>
                    <div className={`status-badge ${isOnCampus ? 'on' : 'off'}`}>
                        <span className="dot" />
                        {isOnCampus ? 'Active' : 'Missing'}
                    </div>
                </div>
            </div>

            <div className="kpi-card">
                <div className="kpi-icon-box" style={{ background: '#f1f5f9', color: '#64748b' }}>
                    <Clock size={24} />
                </div>
                <div className="kpi-content">
                    <p>Real-time Sync</p>
                    <h3 style={{ fontSize: '1rem', color: '#10b981' }}>Connected</h3>
                </div>
            </div>
        </div>
    );
};
