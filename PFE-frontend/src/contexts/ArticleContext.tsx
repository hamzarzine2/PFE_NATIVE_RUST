import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/config";
import { Article } from "../models/article";

interface ArticleContextProps {
    getArticle: (id: number) => Promise<Article>;
}

const ArticleContext = createContext<ArticleContextProps>({
    getArticle: (id: number) => Promise.resolve({} as Article),
});

const ArticleContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {

    const getArticle = async (id: number): Promise<Article> => {
            try {
                const response = await axios.get(
                    API_URL + `/items/${id}`
                );
                    return response.data;
            } catch (error) {
                console.error("Error fetching article:", error);
            }

        return {} as Article;
        };

    const exposedValue: ArticleContextProps = {
        getArticle,
    };

    return (
        <ArticleContext.Provider value={exposedValue}>
            {children}
        </ArticleContext.Provider>
    );
};

export { ArticleContext, ArticleContextProvider };
