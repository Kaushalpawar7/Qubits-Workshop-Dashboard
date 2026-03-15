export interface DeviceConfig {
    baseUrl: string;
    apiKey: string;
}

export interface UserProfile {
    id: string;
    email: string;
    fullName: string;
    phone: string;
}

export interface AttendanceRecord {
    id: string;
    timestamp: string;
    studentName: string;
    subject: string;
    type: 'entry' | 'exit';
}

export interface SubjectAnalytics {
    subject: string;
    attended: number;
    total: number;
    percentage: number;
}
