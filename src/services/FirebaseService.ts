import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

export const setupFirebaseListener = (
    url: string,
    apiKey: string,
    onData: (data: any) => void
) => {
    const firebaseConfig = {
        databaseURL: url,
        apiKey: apiKey,
    };

    const app = initializeApp(firebaseConfig, 'workshop-instance-' + Date.now());
    const db = getDatabase(app);
    const attendanceRef = ref(db, 'Attendance');

    onValue(attendanceRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            const flattened: any[] = [];

            Object.keys(data).forEach(key => {
                const node = data[key];

                // Case 1: Direct child is a record (Attendance/[PushID])
                if (node && (node.Status || node.Timestamp || node.Name)) {
                    flattened.push({
                        ...node,
                        id: key,
                        status_normalized: (node.Status === 'Gone Out' || node.Status === 'Exit') ? 'exit' : 'entry'
                    });
                }
                // Case 2: Nested under name (Attendance/[Name]/[PushID])
                else if (node && typeof node === 'object') {
                    Object.keys(node).forEach(pushId => {
                        const record = node[pushId];
                        if (record && typeof record === 'object') {
                            flattened.push({
                                ...record,
                                id: pushId,
                                firebase_name: key,
                                status_normalized: (record.Status === 'Gone Out' || record.Status === 'Exit') ? 'exit' : 'entry'
                            });
                        }
                    });
                }
            });

            onData(flattened);
        }
    });

    return () => {
        off(attendanceRef);
    };
};
