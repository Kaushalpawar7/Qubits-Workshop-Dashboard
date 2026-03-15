import React, { useState } from 'react';
import { Database, ShieldCheck, Zap, Lock } from 'lucide-react';
import './FirebaseConfig.css';

interface FirebaseConfigProps {
    onConfigSave: (url: string, key: string) => void;
}

export const FirebaseConfig = ({ onConfigSave }: FirebaseConfigProps) => {
    const [url, setUrl] = useState(sessionStorage.getItem('firebase_url') || '');
    const [key, setKey] = useState(sessionStorage.getItem('firebase_key') || '');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sessionStorage.setItem('firebase_url', url);
        sessionStorage.setItem('firebase_key', key);
        onConfigSave(url, key);
    };

    return (
        <div className="config-overlay" style={{ background: '#f8fafc', position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="card config-card" style={{ maxWidth: '440px', padding: '48px', textAlign: 'center' }}>
                <div className="config-header">
                    <div style={{ width: '64px', height: '64px', background: '#eff6ff', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                        <Database color="#3b82f6" size={32} />
                    </div>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Project Setup</h2>
                    <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '32px' }}>Connect your Firebase Realtime database to begin tracking.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="input-group">
                        <Zap size={18} className="input-icon" />
                        <input
                            type="text"
                            placeholder="Firebase URL"
                            required
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            style={{ width: '100%', padding: '12px 12px 12px 42px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={18} className="input-icon" />
                        <input
                            type="password"
                            placeholder="API Key / Secret"
                            required
                            value={key}
                            onChange={(e) => setKey(e.target.value)}
                            style={{ width: '100%', padding: '12px 12px 12px 42px', border: '1px solid #e2e8f0', borderRadius: '8px' }}
                        />
                    </div>

                    <div className="security-info" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px', background: '#ecfdf5', borderRadius: '8px', color: '#065f46', fontSize: '0.85rem' }}>
                        <ShieldCheck size={16} />
                        <span>Credentials remain local to this session.</span>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '14px' }}>
                        Launch Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};
