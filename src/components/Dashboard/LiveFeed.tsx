import { Activity, ArrowRight, User, LogIn, LogOut } from 'lucide-react';
import type { AttendanceRecord } from '../../types';
import './LiveFeed.css';

interface LiveFeedProps {
    records: AttendanceRecord[];
}

export const LiveFeed = ({ records }: LiveFeedProps) => {
    const latestRecords = [...records].sort((a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 10);

    return (
        <div className="glass-card live-feed-card">
            <div className="feed-header">
                <div className="pulse-icon">
                    <Activity size={20} className="active-pulse" />
                </div>
                <div>
                    <h3 style={{ margin: 0 }}>Real-time Presence Feed</h3>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Live telemetry from Attendance/ node</p>
                </div>
            </div>

            <div className="feed-list">
                {latestRecords.map((record, index) => (
                    <div
                        key={record.id}
                        className="feed-item-v2"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className={`status-indicator-v2 ${record.type}`}>
                            {record.type === 'entry' ? <LogIn size={16} /> : <LogOut size={16} />}
                        </div>

                        <div className="feed-content-v2">
                            <div className="user-info-row">
                                <User size={14} style={{ opacity: 0.5 }} />
                                <span className="student-name-v2">{record.studentName}</span>
                            </div>

                            <div className="action-row-v2">
                                <span className={`status-badge-v2 ${record.type}`}>
                                    {record.type === 'entry' ? 'CAME IN' : 'GONE OUT'}
                                </span>
                                <span className="subject-text-v2">{record.subject}</span>
                            </div>

                            <div className="time-row-v2">
                                {new Date(record.timestamp).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    second: '2-digit'
                                })}
                            </div>
                        </div>

                        <div className="feed-decor-v2">
                            <ArrowRight size={14} className="hover-arrow" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
