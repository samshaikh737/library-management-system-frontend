'use client'

// pages/index.tsx
import Alert from '@/components/Alert';
import React, { createContext,useContext, useState } from 'react';

const AlertCon = createContext();

export const useAlert = () => {
    return useContext(AlertCon);
}

const AlertContext = ({ children }: { children: React.ReactNode }) => {
    const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error' | 'info'; text: string } | null>(null);

    const showAlert = (type: 'success' | 'warning' | 'error' | 'info', text: string, wait?:number) => {
        setAlert({ type, text });
        setTimeout(() => setAlert(null), wait || 5000); // Alert disappears after 5 seconds
    };

    return (
        <AlertCon.Provider value={{ alert, setAlert, showAlert }}>
            <div className="p-4">
                {alert && (
                    <Alert
                        type={alert.type}
                        text={alert.text}
                        isOpen={!!alert}
                        onClose={() => setAlert(null)}
                    />
                )}
            </div>

            {children}
        </AlertCon.Provider >
    );
};

export default AlertContext;
