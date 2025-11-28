// Types pour le système de blog
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string; // Contenu en Markdown
    excerpt: string;
    coverImage: string;
    author: {
        name: string;
        avatar?: string;
    };
    category: string;
    tags: string[];
    language: 'fr' | 'en' | 'mg' | 'es' | 'zh' | 'de';
    status: 'draft' | 'published';
    publishedAt: Date;
    createdAt: Date;
    updatedAt: Date;
    views?: number;
}

export interface BlogCategory {
    id: string;
    name: string;
    slug: string;
    description?: string;
    language: string;
}

export interface CreateBlogPostInput {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    author: {
        name: string;
        avatar?: string;
    };
    category: string;
    tags: string[];
    language: 'fr' | 'en' | 'mg' | 'es' | 'zh' | 'de';
    status: 'draft' | 'published';
}

export interface UpdateBlogPostInput extends Partial<CreateBlogPostInput> {
    id: string;
}
