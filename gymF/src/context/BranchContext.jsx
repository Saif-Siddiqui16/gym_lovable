import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import apiClient from '../api/apiClient';

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
    const { user } = useAuth();
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranch] = useState('all');
    const [loadingBranches, setLoadingBranches] = useState(false);

    useEffect(() => {
        if (user) {
            fetchBranches();
        }
    }, [user]);

    const fetchBranches = async () => {
        try {
            setLoadingBranches(true);
            // Adjust this endpoint if your backend uses a different one
            const response = await apiClient.get('/branches');
            const formattedBranches = Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
            setBranches(formattedBranches);
        } catch (error) {
            console.error('Failed to fetch branches:', error);
            setBranches([]);
        } finally {
            setLoadingBranches(false);
        }
    };

    return (
        <BranchContext.Provider value={{ branches, selectedBranch, setSelectedBranch, loadingBranches, showAllOption: true, showSelector: true }}>
            {children}
        </BranchContext.Provider>
    );
};

export const useBranchContext = () => useContext(BranchContext);
