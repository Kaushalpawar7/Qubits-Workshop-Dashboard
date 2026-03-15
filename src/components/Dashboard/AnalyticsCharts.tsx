import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import type { SubjectAnalytics } from '../../types';
import './Analytics.css';

interface AnalyticsProps {
    data: SubjectAnalytics[];
}

export const AnalyticsCharts = ({ data }: AnalyticsProps) => {
    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981'];

    return (
        <div className="analytics-grid">
            <div className="card chart-card">
                <h3>Subject Participation</h3>
                <div className="chart-content">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={70}
                                outerRadius={90}
                                paddingAngle={8}
                                dataKey="attended"
                                stroke="none"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="chart-legend">
                    {data.map((item, index) => (
                        <div key={item.subject} className="legend-item">
                            <span className="dot" style={{ background: COLORS[index % COLORS.length] }} />
                            <span>{item.subject}</span>
                            <span style={{ fontWeight: 600, marginLeft: '4px' }}>{item.percentage}%</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card chart-card">
                <h3>Relative Performance</h3>
                <div className="chart-content">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} layout="vertical" margin={{ left: -20, right: 20 }}>
                            <XAxis type="number" hide />
                            <YAxis
                                type="category"
                                dataKey="subject"
                                stroke="#64748b"
                                fontSize={12}
                                width={100}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: '#f8fafc' }}
                                contentStyle={{
                                    background: '#fff',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '8px'
                                }}
                            />
                            <Bar dataKey="percentage" radius={[0, 6, 6, 0]} barSize={24}>
                                {data.map((_, index) => (
                                    <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} fillOpacity={0.8} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};
