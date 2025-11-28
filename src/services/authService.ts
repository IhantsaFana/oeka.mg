import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import { auth } from '@/config/firebase';

// Connexion avec Google
export const loginWithGoogle = async (): Promise<User> => {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error: any) {
        console.error('Error logging in with Google:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
};

// Connexion avec email et mot de passe
export const loginWithEmail = async (email: string, password: string): Promise<User> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error: any) {
        console.error('Error logging in:', error);
        throw new Error(getAuthErrorMessage(error.code));
    }
};

// Déconnexion
export const logout = async (): Promise<void> => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

// Écouter les changements d'état d'authentification
export const onAuthChange = (callback: (user: User | null) => void) => {
    return onAuthStateChanged(auth, callback);
};

// Obtenir l'utilisateur actuel
export const getCurrentUser = (): User | null => {
    return auth.currentUser;
};

// Messages d'erreur en français
const getAuthErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/invalid-email':
            return 'Adresse email invalide';
        case 'auth/user-disabled':
            return 'Ce compte a été désactivé';
        case 'auth/user-not-found':
            return 'Aucun compte trouvé avec cet email';
        case 'auth/wrong-password':
            return 'Mot de passe incorrect';
        case 'auth/invalid-credential':
            return 'Email ou mot de passe incorrect';
        case 'auth/too-many-requests':
            return 'Trop de tentatives. Réessayez plus tard';
        case 'auth/popup-closed-by-user':
            return 'La fenêtre de connexion a été fermée';
        default:
            return 'Une erreur est survenue lors de la connexion';
    }
};
