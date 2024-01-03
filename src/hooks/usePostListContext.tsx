import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface CategoriesProviderProps {
    children: ReactNode;
}

interface Category {
    id: number;
    category_id: string;
    content: string;
    title: string;
    imageUrl: string;
}

interface ContextValue {
    posts: Category[];
    handleDeletePost: (id: number) => void;

}

const CategoriesContext = createContext<ContextValue | undefined>(undefined);

export const useCategoriesContext = (): ContextValue => {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error('useCategoriesContext must be used within a CategoriesProvider');
    }
    return context;
};

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Category[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get<Category[]>('http://localhost:3001/api/posts/');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDeletePost = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3001/api/posts/${id}`);
            const updatedPosts = posts.filter(post => post.id !== id);
             setPosts(updatedPosts);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const contextValue: ContextValue = {
        posts,
        handleDeletePost,
    };

    return (
        <CategoriesContext.Provider value={contextValue}>
            {children}
        </CategoriesContext.Provider>
    );
};
