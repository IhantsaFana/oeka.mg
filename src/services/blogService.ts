import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import type { BlogPost, CreateBlogPostInput, UpdateBlogPostInput } from '@/types/blog';

const COLLECTION_NAME = 'blog-posts';

// Convertir un document Firestore en BlogPost
const convertToBlogPost = (doc: any): BlogPost => {
    const data = doc.data();
    return {
        id: doc.id,
        ...data,
        publishedAt: data.publishedAt?.toDate(),
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
    } as BlogPost;
};

// Créer un nouvel article
export const createBlogPost = async (input: CreateBlogPostInput): Promise<string> => {
    try {
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...input,
            publishedAt: input.status === 'published' ? serverTimestamp() : null,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            views: 0,
        });
        return docRef.id;
    } catch (error) {
        console.error('Error creating blog post:', error);
        throw error;
    }
};

// Mettre à jour un article
export const updateBlogPost = async (input: UpdateBlogPostInput): Promise<void> => {
    try {
        const { id, ...data } = input;
        const docRef = doc(db, COLLECTION_NAME, id);

        // Si le statut passe à "published" et qu'il n'y a pas de publishedAt, on l'ajoute
        const updateData: any = {
            ...data,
            updatedAt: serverTimestamp(),
        };

        // Si on publie l'article, s'assurer que publishedAt est défini
        if (data.status === 'published') {
            // Vérifier si l'article avait déjà un publishedAt
            const docSnap = await getDoc(docRef);
            if (docSnap.exists() && !docSnap.data().publishedAt) {
                updateData.publishedAt = serverTimestamp();
            }
        }

        await updateDoc(docRef, updateData);
    } catch (error) {
        console.error('Error updating blog post:', error);
        throw error;
    }
};

// Supprimer un article
export const deleteBlogPost = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
        console.error('Error deleting blog post:', error);
        throw error;
    }
};

// Récupérer un article par ID
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return convertToBlogPost(docSnap);
        }
        return null;
    } catch (error) {
        console.error('Error getting blog post:', error);
        throw error;
    }
};

// Récupérer un article par slug
// Note: Ne filtre plus par langue - trouve le blog par slug uniquement
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('slug', '==', slug),
            where('status', '==', 'published'),
            limit(1)
        );

        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            return convertToBlogPost(querySnapshot.docs[0]);
        }
        return null;
    } catch (error) {
        console.error('Error getting blog post by slug:', error);
        throw error;
    }
};

// Récupérer tous les articles publiés (avec pagination)
// Note: Ne filtre plus par langue - affiche tous les blogs publiés
export const getPublishedBlogPosts = async (
    limitCount: number = 10
): Promise<BlogPost[]> => {
    try {
        // Requête sans orderBy pour éviter le besoin d'index composite
        const q = query(
            collection(db, COLLECTION_NAME),
            where('status', '==', 'published')
        );

        const querySnapshot = await getDocs(q);
        const posts = querySnapshot.docs.map(convertToBlogPost);

        // Tri en mémoire par publishedAt
        posts.sort((a, b) => {
            const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
            const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
            return dateB - dateA; // Ordre décroissant
        });

        // Limiter les résultats
        return posts.slice(0, limitCount);
    } catch (error) {
        console.error('Error getting published blog posts:', error);
        throw error;
    }
};

// Récupérer tous les articles (incluant brouillons) - pour l'admin
export const getAllBlogPosts = async (language?: string): Promise<BlogPost[]> => {
    try {
        let q;
        if (language) {
            q = query(
                collection(db, COLLECTION_NAME),
                where('language', '==', language),
                orderBy('createdAt', 'desc')
            );
        } else {
            q = query(
                collection(db, COLLECTION_NAME),
                orderBy('createdAt', 'desc')
            );
        }

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(convertToBlogPost);
    } catch (error) {
        console.error('Error getting all blog posts:', error);
        throw error;
    }
};

// Récupérer les articles par catégorie
// Note: Ne filtre plus par langue
export const getBlogPostsByCategory = async (
    category: string,
    limitCount: number = 10
): Promise<BlogPost[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('category', '==', category),
            where('status', '==', 'published'),
            orderBy('publishedAt', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(convertToBlogPost);
    } catch (error) {
        console.error('Error getting blog posts by category:', error);
        throw error;
    }
};

// Récupérer les articles par tag
// Note: Ne filtre plus par langue
export const getBlogPostsByTag = async (
    tag: string,
    limitCount: number = 10
): Promise<BlogPost[]> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('tags', 'array-contains', tag),
            where('status', '==', 'published'),
            orderBy('publishedAt', 'desc'),
            limit(limitCount)
        );

        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(convertToBlogPost);
    } catch (error) {
        console.error('Error getting blog posts by tag:', error);
        throw error;
    }
};

// Incrémenter le nombre de vues
export const incrementBlogPostViews = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const currentViews = docSnap.data().views || 0;
            await updateDoc(docRef, {
                views: currentViews + 1,
            });
        }
    } catch (error) {
        console.error('Error incrementing views:', error);
        // Ne pas lancer d'erreur pour ne pas bloquer l'affichage
    }
};
