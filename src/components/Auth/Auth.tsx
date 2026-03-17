import React, { useState } from 'react';
import { User, Users, ArrowRight } from 'lucide-react';
import './Auth.css';

interface OnboardingProps {
    onSuccess: (userData: { fullName: string; teamName: string }) => void;
}

export const Auth: React.FC<OnboardingProps> = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        teamName: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Save to sessionStorage for persistence within the session
        sessionStorage.setItem('user_full_name', formData.fullName);
        sessionStorage.setItem('user_team_name', formData.teamName);

        onSuccess(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth-container">
            <div className="glass-card auth-card neon-border">
                <div className="auth-header">
                    <h2 className="neon-text">Welcome to Qubits</h2>
                    <p className="text-secondary">
                        Enter your details to access the Attendance Dashboard
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <User size={18} className="input-icon" />
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Your Full Name"
                            required
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input-group">
                        <Users size={18} className="input-icon" />
                        <input
                            type="text"
                            name="teamName"
                            placeholder="Team Name (e.g. Team One)"
                            required
                            value={formData.teamName}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn-primary auth-submit">
                        <span>Get Started</span>
                        <ArrowRight size={20} />
                    </button>
                </form>

                <div className="auth-footer">
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        No account required. Data stays in this session.
                    </p>
                </div>
            </div>
        </div>
    );
};
