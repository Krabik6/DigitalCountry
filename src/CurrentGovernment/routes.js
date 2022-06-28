import {Route} from "react-router-dom";
import {NewsPage} from "./pages/NewsPage";
import React from "react";
import {NewsArticle} from "./pages/NewsArticle";

export const GovernmentRoutes = (
    <Route path="government">
        <Route path="news">
            <Route path="page/:id" element={<NewsPage/>}/>
            <Route path="article/:id" element={<NewsArticle/>}/>
        </Route>
    </Route>
);