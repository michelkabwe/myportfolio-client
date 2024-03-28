import React, { createContext, useContext, useState, ReactNode, useRef } from 'react';
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
    urlsRef: string;
    liveUrl: string;
    sourceCode: string;
    codeLangIcon?: string[];
    createdPost?: {
        id: number;
        category_id: string;
        content: string;
        title: string;
        imageUrl: string;
        urlsRef: string;
        liveUrl: string;
        sourceCode: string;
        codeLangIcon?:string[];
    }

}

interface ContextValue {
    posts: Category[];
    fetchPosts: () => Promise<void>;
    handleDeletePost: (id: number) => void;
    handlePostClick: (id: number) => void;
    handleSubmitPostUpdate: (event: React.FormEvent<HTMLFormElement>, id: string) => Promise<void>;
    handleSubmitPost: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    titleRef: React.MutableRefObject<HTMLInputElement | null>;
    contentRef: React.MutableRefObject<HTMLTextAreaElement | null>;
    selectRef: React.MutableRefObject<HTMLSelectElement | null>;
    liveUrlRef: React.MutableRefObject<HTMLInputElement | null>;
    sourceCodeRef: React.MutableRefObject<HTMLInputElement | null>;
    codeLangIconRef: React.MutableRefObject<HTMLInputElement | null>;

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
        return `https://myportfolio-backend-ten.vercel.app/api/posts/${id}`
    };

        const fetchPosts = async () => {
            try {
                const response = await axios.get<Category[]>('https://myportfolio-backend-ten.vercel.app/api/posts/');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };


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
    const codeLangIconRef = useRef<HTMLInputElement>(null);



    const handleSubmitPost = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('file', selectedFile);
                ;
            }

            const response: any = await axios.post('https://myportfolio-backend-ten.vercel.app/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });

            const title = titleRef.current?.value || '';
            const content = contentRef.current?.value || '';
            const selectedCategory = selectRef.current?.value || '';
            const liveUrl = liveUrlRef.current?.value || '';
            const sourceCode = sourceCodeRef.current?.value || '';
            const codeLangIcon = codeLangIconRef.current?.value || '';

            const imageUrl = response.data.imageUrl;


            formData.append('title', title);
            formData.append('content', content);
            formData.append('selectedCategory', selectedCategory);
            formData.append('imageUrl', imageUrl);
            formData.append('liveUrl', liveUrl);
            formData.append('sourceCode', sourceCode);
            formData.append('sourceCode', codeLangIcon);



            const res = await axios.post<Category>('https://myportfolio-backend-ten.vercel.app/api/posts/', {
                title, content, selectedCategory, imageUrl, liveUrl, sourceCode, codeLangIcon

            })


        } catch (error) {
            console.error('Error', error)
        }



    }

    const handleDeletePost = async (id: number) => {
        try {
            await axios.delete(`https://myportfolio-backend-ten.vercel.app/api/posts/${id}`);
            const updatedPosts = posts.filter(post => post.id !== id);
            setPosts(updatedPosts);
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleSubmitPostUpdate = async (event: React.FormEvent<HTMLFormElement>, id: string): Promise<void> => {
        event.preventDefault();

        try {
            const formData = new FormData();
            if (selectedFile) {
                formData.append('file', selectedFile);
                ;
            }

            const response: any = await axios.put(`https://myportfolio-backend-ten.vercel.app/api/upload/${id}/edit`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            });

            const title = titleRef.current?.value || '';
            const content = contentRef.current?.value || '';
            const selectedCategory = selectRef.current?.value || '';
            const liveUrl = liveUrlRef.current?.value || '';
            const sourceCode = sourceCodeRef.current?.value || '';

            const imageUrl = response.data.imageUrl;

            formData.append('title', title);
            formData.append('content', content);
            formData.append('selectedCategory', selectedCategory);
            formData.append('imageUrl', imageUrl);
            formData.append('liveUrl', liveUrl);
            formData.append('sourceCode', sourceCode);


            const res = await axios.put<FormData>(`https://myportfolio-backend-ten.vercel.app/api/posts/${id}/edit`, {
                title,
                content,
                selectedCategory,
                imageUrl,
                liveUrl,
                sourceCode
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            )
            if(res.status === 200){
                console.log("Succesful !");
            }

        } catch (error) {
            console.error('Error', error)
        }
    }

    const contextValue: ContextValue = {
        fetchPosts,
        posts,
        handleDeletePost,
        handlePostClick,
        handleSubmitPostUpdate,
        handleSubmitPost,
        handleFileChange,
        titleRef,
        contentRef,
        selectRef,
        liveUrlRef,
        sourceCodeRef,
        codeLangIconRef
    };

    return (
        <CategoriesContext.Provider value={contextValue}>
            {children}
        </CategoriesContext.Provider>
    );
};
