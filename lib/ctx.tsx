import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '../useStorageState';
import { Alert } from 'react-native';
import axios from 'axios';
import { Redirect } from 'expo-router';

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>;
    signOut: () => void;
    session: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function useAuth() {
//     const context = useContext(AuthContext);
//     if(!context) {
//         throw new Error('useAuth must be used within a AuthProvider');
//     }
//     return context;
// }


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


export function SessionProvider({ children }: PropsWithChildren) {
    const [[iLoading, session], setSession] = useStorageState('session');


  const signIn = async (email: string, password: string) => {
    try {
      const resp = await axios.post('http://192.168.1.45:3000/api/signin', {
        email,
        password,
      });
      if (resp.data) {
        Alert.alert('Sign in successful');
        setSession(resp.data.token);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Sign In Failed', (error as any).response?.data?.message || 'An error occurred');
    }
  };

  const signOut = () => {
    setSession(null);
  }

    return (
      <AuthContext.Provider
        value={{
            signIn,
            signOut,
            session,
        }}>
        {children}
      </AuthContext.Provider>
    );
  }