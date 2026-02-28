import apiClient from '../apiClient';

export const fetchCommStats = async (branchId) => {
    try {
        const response = await apiClient.get('/communication/stats', { params: { branchId } });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchAnnouncements = async (params) => {
    try {
        const response = await apiClient.get('/communication/announcements', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addAnnouncement = async (data) => {
    try {
        const response = await apiClient.post('/communication/announcements', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchMessageTemplates = async (params) => {
    try {
        const response = await apiClient.get('/communication/templates', { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const sendBroadcastMessage = async (data) => {
    try {
        const response = await apiClient.post('/communication/broadcast', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchCommLogs = async (branchId) => {
    try {
        const response = await apiClient.get('/communication/logs', { params: { branchId } });
        return response.data;
    } catch (error) {
        throw error;
    }
};
