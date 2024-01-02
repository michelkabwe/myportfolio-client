import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface CategoriesProviderProps {
    children: ReactNode;
}

interface Category {
    category_id: string;
    content: string;
    title: string;
    imageUrl: string;

}

//type UseContext = CategoriesProviderProps & Category

const CategoriesContext = createContext<Category[]>([]);

export const useCategoriesContext = () => {
    return useContext(CategoriesContext);
};

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
    const [posts, setPosts] = useState<Category[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Category[]>('http://localhost:3001/api/posts/');
                setPosts(response.data);
                console.log(posts,'HOOK')
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);


    return (
        <CategoriesContext.Provider value={posts}>
            {children}
        </CategoriesContext.Provider>
    );
};