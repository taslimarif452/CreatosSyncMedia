import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

// Allowed Google Accounts specifically defined by the user
export const ALLOWED_ADMIN_EMAILS = [
  'tavqeerhussain6@gmail.com',
  'Infinityinfo100@gmail.com'
].map((e) => e.toLowerCase().trim());

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userEmail = user?.email?.toLowerCase().trim() || '';
  const isAdmin = Boolean(user && ALLOWED_ADMIN_EMAILS.includes(userEmail));

  const signInWithGoogle = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const signedInEmail = result.user.email?.toLowerCase().trim() || '';
      
      if (!ALLOWED_ADMIN_EMAILS.includes(signedInEmail)) {
        return {
          success: false,
          error: `Access Denied: (${signedInEmail}) is not authorized to access this Admin Panel.`
        };
      }

      return { success: true };
    } catch (err: any) {
      console.error('Firebase Google sign-in error:', err);
      return {
        success: false,
        error: err?.message || 'Google sign-in failed. Please try again.'
      };
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (err) {
      console.error('Firebase sign-out error:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        signInWithGoogle,
        signOut
      }}
    >
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
