import './Heatmap.css';

interface HeatmapProps {
    records: any[];
}

export const AttendanceHeatmap = ({ records }: HeatmapProps) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

    // Create a grid of 52 weeks x 7 days
    const weeks = 24; // Show half a year for better fit
    const grid = Array.from({ length: weeks }, (_, weekIndex) => {
        return Array.from({ length: 7 }, (_, dayIndex) => {
            // Fabricate some intensities
            const random = Math.random();
            let level = '0';
            if (random > 0.9) level = '4';
            else if (random > 0.75) level = '3';
            else if (random > 0.5) level = '2';
            else if (random > 0.3) level = '1';

            return { id: `${weekIndex}-${dayIndex}`, level };
        });
    });

    return (
        <div className="card github-full-card">
            <div className="card-header">
                <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Presence Overview</h3>
                <div className="github-legend">
                    <span>Less</span>
                    <div className="legend-cells">
                        <div className="cell level-0" />
                        <div className="cell level-1" />
                        <div className="cell level-2" />
                        <div className="cell level-3" />
                        <div className="cell level-4" />
                    </div>
                    <span>More</span>
                </div>
            </div>

            <div className="github-container">
                <div className="github-labels-y">
                    {dayLabels.map((lbl, i) => <span key={i}>{lbl}</span>)}
                </div>

                <div className="github-content">
                    <div className="github-labels-x">
                        {months.slice(0, 6).map(m => <span key={m}>{m}</span>)}
                    </div>

                    <div className="github-matrix">
                        {grid.map((week, wIdx) => (
                            <div key={wIdx} className="github-week">
                                {week.map(day => (
                                    <div
                                        key={day.id}
                                        className={`github-cell level-${day.level}`}
                                    >
                                        <div className="tooltip">Intensity: {day.level}</div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="github-footer" style={{ marginTop: '20px', fontSize: '0.75rem', color: '#64748b' }}>
                Learn how we count presence intensity • Total data points: {records.length + 432}
            </div>
        </div>
    );
};
