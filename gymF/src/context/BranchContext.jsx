import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import apiClient from '../api/apiClient';

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
    const { user } = useAuth();
    const [branches, setBranches] = useState([]);
    const [selectedBranch, setSelectedBranchState] = useState(() => localStorage.getItem('selectedBranch') || 'all');
    const [loadingBranches, setLoadingBranches] = useState(false);

    const setSelectedBranch = (val) => {
        setSelectedBranchState(val);
        localStorage.setItem('selectedBranch', val);
    };

    useEffect(() => {
        console.log('BranchContext useEffect triggered, user:', user);
        if (user) {
            console.log('Attempting to fetch branches for role:', user.role);
            fetchBranches();
        }
    }, [user]);

    const fetchBranches = async () => {
        try {
            setLoadingBranches(true);
            // Adjust this endpoint if your backend uses a different one
            // We skip setting the x-tenant-id header for this specific call to get all available branches
            const response = await apiClient.get('/branches', { headers: { 'x-tenant-id': undefined } });
            const formattedBranches = Array.isArray(response.data?.data) ? response.data.data : (Array.isArray(response.data) ? response.data : []);
            console.log('Fetched branches payload:', response.data);
            console.log('Formatted branches:', formattedBranches);
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
