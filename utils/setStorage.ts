import * as SecureStore from 'expo-secure-store';

// Keys for storage
const AUTH_TOKEN_KEY='auth_token';
const USER_DATA_KEY='user_data';

export interface User {
    _id: string;
    email: string;
    name?: string;
}

export interface AuthState {
    token: string | null;
    user: User | null;
    isLoading: boolean;
}

export interface AuthContextType extends AuthState {
    signIn: (token: string, user: User) => Promise<void>;
    signOut: () => Promise<void>;
}

export const storage = {
    // Save authentication token
    saveToken: async (token: string) => {
        try {
            await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
        } catch (error) {
            console.error('Error saving token:', error);
            throw error;
        }
    },

    // Get authentication token
    getToken: async () => {
        try {
            return await SecureStore.getItemAsync(AUTH_TOKEN_KEY);
        } catch (error) {
            console.error('Error getting token:', error);
            return null;
        }
    },

    saveUser: async (userData: User) => {
        try {
            await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(userData));
        } catch (error) {
            console.error('Error saving user data:', error);
            throw error;
        }
    },

    getUser: async () => {
        try {
            const userData = await SecureStore.getItemAsync(USER_DATA_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    },

    clearAuth: async () => {
        try {
            await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
            await SecureStore.deleteItemAsync(USER_DATA_KEY);
        } catch (error) {
            console.error('Error clearing auth data:', error);
            throw error;
        }
    }
}