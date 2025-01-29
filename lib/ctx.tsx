import { useContext, createContext, type PropsWithChildren, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { AuthContextType, AuthState, User, storage } from '@/utils/setStorage';
import { router } from 'expo-router';


const AuthContext = createContext<AuthContextType>({} as AuthContextType);


// This hook can be used to access the user info.
export function useSession() {
    const context = useContext(AuthContext);
    // if (process.env.NODE_ENV !== 'production') {
    //   if (!value) {
    //     throw new Error('useSession must be wrapped in a <SessionProvider />');
    //   }
    // }
    if(!context) {
        throw new Error('useSession must be used within a AuthProvider');
    }
    return context;
  }


export function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const [token, user] = await Promise.all([
        storage.getToken(),
        storage.getUser(),
      ]);

      setAuthState({
        token,
        user,
        isLoading: false,
      });
    } catch (error) {
      setAuthState({
        token: null,
        user: null,
        isLoading: false,
      });
    }
  };



  const signIn = async (token: string, user: User) => {
    try {
      await storage.saveToken(token);
      await storage.saveUser(user);
      setAuthState({
        token,
        user,
        isLoading: false,
      });
      router.replace('/dashboard');
    } catch (error) {
      console.error(error);
      Alert.alert('Sign In Failed', (error as any).response?.data?.message || 'An error occurred');
    }
  };



  const signOut = async () => {
    try {
      await storage.clearAuth();
      setAuthState({
        token: null,
        user: null,
        isLoading: false,
      });
    } catch (error) {
      throw new Error('Failed to clear auth state');
    }
  };

    return (
      <AuthContext.Provider
        value={{
            signIn,
            signOut,
            ...authState,
        }}>
        {children}
      </AuthContext.Provider>
    );
  }

  export const useAuth = (): AuthContextType => useContext(AuthContext)