import type { AttendanceRecord, SubjectAnalytics } from '../types';

// Generate 30 days of realistic attendance data
export const generateHistoricalData = (studentName: string): AttendanceRecord[] => {
    const records: AttendanceRecord[] = [];
    const subjects = ['Digital Electronics', 'Analog Circuits', 'Mobile Computing'];
    const now = new Date();

    for (let i = 30; i > 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        subjects.forEach(subject => {
            // Simulate 85% attendance rate
            if (Math.random() > 0.15) {
                // Entry
                const entryTime = new Date(date);
                entryTime.setHours(9 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));
                records.push({
                    id: `hist-${i}-${subject}-in`,
                    timestamp: entryTime.toISOString(),
                    studentName,
                    subject,
                    type: 'entry'
                });

                // Exit
                const exitTime = new Date(entryTime);
                exitTime.setHours(exitTime.getHours() + 1);
                records.push({
                    id: `hist-${i}-${subject}-out`,
                    timestamp: exitTime.toISOString(),
                    studentName,
                    subject,
                    type: 'exit'
                });
            }
        });
    }
    return records;
};

export const calculateAnalytics = (records: AttendanceRecord[]): SubjectAnalytics[] => {
    const subjects = ['Digital Electronics', 'Analog Circuits', 'Mobile Computing'];
    const stats = subjects.map(subject => {
        const subjectRecords = records.filter(r => r.subject === subject && r.type === 'entry');
        const totalPossible = 30; // Simplified
        return {
            subject,
            attended: subjectRecords.length,
            total: totalPossible,
            percentage: Math.round((subjectRecords.length / totalPossible) * 100)
        };
    });
    return stats;
};
