import React from 'react';
import { Auth } from './components/Auth/Auth';
import { Sidebar } from './components/Sidebar/Sidebar';
import { FirebaseConfig } from './components/Dashboard/FirebaseConfig';
import { KPIBar } from './components/Dashboard/KPIBar';
import { AnalyticsCharts } from './components/Dashboard/AnalyticsCharts';
import { AttendanceHeatmap } from './components/Dashboard/AttendanceHeatmap';
import { InteractiveStats } from './components/Dashboard/InteractiveStats';
import { LiveFeed } from './components/Dashboard/LiveFeed';
import { supabase } from './services/supabase';
import { setupFirebaseListener } from './services/FirebaseService';
import { generateHistoricalData, calculateAnalytics } from './services/DataEngine';
import type { AttendanceRecord, SubjectAnalytics } from './types';
import './index.css';

function App() {
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('dashboard');
  const [dbConfigured, setDbConfigured] = React.useState(!!sessionStorage.getItem('firebase_url'));

  const [records, setRecords] = React.useState<AttendanceRecord[]>([]);
  const [analytics, setAnalytics] = React.useState<SubjectAnalytics[]>([]);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  React.useEffect(() => {
    if (session && dbConfigured) {
      const url = sessionStorage.getItem('firebase_url') || '';
      const key = sessionStorage.getItem('firebase_key') || '';

      const historical = generateHistoricalData(session.user.user_metadata.full_name);
      setRecords(historical);
      setAnalytics(calculateAnalytics(historical));

      const unsubscribe = setupFirebaseListener(url, key, (liveRecords: any[]) => {
        const transformed: AttendanceRecord[] = liveRecords.map(item => ({
          id: item.id || `live-${Date.now()}-${Math.random()}`,
          timestamp: typeof item.Timestamp === 'number' ? new Date(item.Timestamp).toISOString() : (item.timestamp || new Date().toISOString()),
          studentName: item.Name || item.firebase_name || session.user.user_metadata.full_name,
          subject: item.subject || 'Workshop Activity',
          type: item.status_normalized || 'entry',
        }));

        setRecords(prev => {
          const existingIds = new Set(prev.map(r => r.id));
          const newEntries = transformed.filter(r => !existingIds.has(r.id));

          if (newEntries.length === 0) return prev;

          // Trigger notifications for new entries
          newEntries.forEach(entry => {
            const toast = document.createElement('div');
            toast.className = 'dashboard-toast';
            toast.innerHTML = `
                <div class="toast-indicator ${entry.type}"></div>
                <div class="toast-body">
                    <strong>${entry.studentName}</strong> ${entry.type === 'entry' ? 'came in' : 'gone out'}
                    <span class="toast-time">just now</span>
                </div>
            `;
            document.body.appendChild(toast);
            setTimeout(() => toast.classList.add('visible'), 10);
            setTimeout(() => {
              toast.classList.remove('visible');
              setTimeout(() => toast.remove(), 300);
            }, 5000);
          });

          const updated = [...newEntries, ...prev].sort((a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );

          setAnalytics(calculateAnalytics(updated));
          return updated;
        });
      });

      return () => unsubscribe();
    }
  }, [session, dbConfigured]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader">LOADING...</div>
      </div>
    );
  }

  if (!session) {
    return <Auth onSuccess={() => { }} />;
  }

  if (!dbConfigured) {
    return <FirebaseConfig onConfigSave={() => setDbConfigured(true)} />;
  }

  return (
    <div className="layout-container">
      <Sidebar
        onLogout={() => supabase.auth.signOut()}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main className="main-content">
        <header className="view-header">
          <div>
            <h1 style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>
              System Overview
            </h1>
            <h2 style={{ fontSize: '1.875rem' }}>
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h2>
          </div>
          <div style={{ padding: '8px 16px', borderRadius: '99px', display: 'flex', alignItems: 'center', gap: '12px', background: 'white', border: '1px solid #e2e8f0', boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
              {session.user.user_metadata.full_name?.[0]}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{session.user.user_metadata.full_name}</span>
              <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{session.user.user_metadata.phone}</span>
            </div>
          </div>
        </header>

        <div className="view-content">
          {activeTab === 'dashboard' && (
            <>
              <div className="welcome-banner glass-card">
                <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
                  Welcome back, {session.user.user_metadata.team_name || 'Team Qubits'}! 👋
                </h2>
                <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
                  Tracking attendance for <strong>{session.user.user_metadata.full_name || 'your'}</strong> workshop.
                </p>
              </div>

              <KPIBar
                attendanceRate={85}
                totalLectures={90}
                attendedLectures={76}
                isOnCampus={true}
              />

              <AttendanceHeatmap records={records} />

              <InteractiveStats />
              <AnalyticsCharts data={analytics} />
            </>
          )}

          {activeTab === 'attendance' && (
            <LiveFeed records={records} />
          )}

          {activeTab === 'settings' && (
            <div className="card" style={{ padding: '40px' }}>
              <h3 style={{ marginBottom: '24px' }}>Connection Settings</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>Current Firebase URL</p>
                  <p style={{ fontSize: '1rem', color: '#0f172a', fontWeight: 500, wordBreak: 'break-all' }}>{sessionStorage.getItem('firebase_url')}</p>
                </div>
                <button
                  className="btn btn-primary"
                  style={{ background: '#ef4444', justifyContent: 'center' }}
                  onClick={() => {
                    sessionStorage.removeItem('firebase_url');
                    setDbConfigured(false);
                  }}
                >
                  Disconnect & Reset
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
