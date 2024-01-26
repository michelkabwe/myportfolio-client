import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
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
    urlsRef:string;
    liveUrl:string;
    sourceCode:string;
}

interface ContextValue {
    posts: Category[];
    handleDeletePost: (id: number) => void;
    handlePostClick: (id: number) => void;
    handleUpdatePost: (id: number, updatedData: Partial<Category>) => void;
    handleSubmitPost: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    titleRef: React.MutableRefObject<HTMLInputElement | null>;
    contentRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    selectRef: React.MutableRefObject<HTMLSelectElement | null>;
    liveUrlRef: React.MutableRefObject<HTMLInputElement | null>;
    sourceCodeRef:React.MutableRefObject<HTMLInputElement | null>;
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

    const handlePostClick = (id: number) => {
        return `http://localhost:3001/api/posts/${id}`
    };

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


    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const liveUrlRef = useRef<HTMLInputElement>(null);
    const sourceCodeRef = useRef<HTMLInputElement>(null);



    const handleSubmitPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('file', selectedFile);
                console.log(selectedFile, 'selectedFILEEEE');
                ;
            }

            const response: any = await axios.post('http://localhost:3001/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });

            const title = titleRef.current?.value || '';
            const content = contentRef.current?.value || '';
            const selectedCategory = selectRef.current?.value || '';
            const liveUrl = liveUrlRef.current?.value || '';
            const sourceCode = sourceCodeRef.current?.value ||'';

            const imageUrl = response.data.imageUrl;

            formData.append('title', title);
            formData.append('content', content);
            formData.append('selectedCategory', selectedCategory);
            formData.append('imageUrl', imageUrl);
            formData.append('liveUrl', liveUrl);
            formData.append('sourceCode', sourceCode);


            const res = await axios.post<FormData>('http://localhost:3001/api/posts/', {
                title, content, selectedCategory, imageUrl, liveUrl, sourceCode

            })

        } catch (error) {
            console.error('Error', error)
        }
    }



    const handleUpdatePost = async (id: number, updatedData: Partial<Category>) => {
        try {
            const response = await axios.put(`http://localhost:3001/api/posts/${id}`, updatedData);
            setPosts(prevPosts =>
                prevPosts.map(post => (post.id === id ? { ...post, ...updatedData } : post))
            );

            return response;
        } catch (error) {
            console.error('Error updating post:', error);
            throw error;
        }
    };


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
        handlePostClick,
        handleUpdatePost,
        handleSubmitPost,
        handleFileChange,
        titleRef,
        contentRef,
        selectRef,
        liveUrlRef,
        sourceCodeRef
    };

    return (
        <CategoriesContext.Provider value={contextValue}>
            {children}
        </CategoriesContext.Provider>
    );
};
