// src/contexts/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ethers } from 'ethers';

interface AuthContextType {
    isAuthenticated: boolean;
    userAddress: string | null;
    userRole: string | null;
    loginWithMetaMask: () => Promise<void>;
    loginWithEmail: (email: string, password: string, role: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userAddress, setUserAddress] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    const loginWithMetaMask = async () => {
        if (typeof (window as any).ethereum !== 'undefined') {
            try {
                await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.BrowserProvider((window as any).ethereum); // Update here
                const signer = await provider.getSigner();
                const address = await signer.getAddress();
                console.log('MetaMask address:', address);
                setUserAddress(address);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('MetaMask login error:', error);
            }
        } else {
            alert('MetaMask is not installed. Please install it to use this feature.');
        }
    };

    const loginWithEmail = (email: string, password: string, role: string) => {
        setUserAddress(email); // Placeholder for real authentication
        setUserRole(role);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserAddress(null);
        setUserRole(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userAddress, userRole, loginWithMetaMask, loginWithEmail, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
