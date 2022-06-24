// import { useState } from 'react';
import './App.css';
import React from 'react';
import {Routes, Route} from 'react-router-dom';

import {Homepage} from './pages/Homepage';
import {Statistics} from './pages/Aboutpage';
import {Blogpage} from './pages/Blogpage';
import {Notfoundpage} from './pages/Notfoundpage';
import {Account} from './pages/Account';
import {PresidentAccount} from './pages/PresidentAccount';
import {Blockchain} from "./blockchain";

import {Layout} from './components/Layout'

function App() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route index element={<Homepage/>}/>
                    <Route path="statistics" element={<Statistics/>}/>
                    <Route path="posts" element={<Blogpage/>}/>
                    <Route path="*" element={<Notfoundpage/>}/>
                    <Route path="account" element={<Account/>}/>
                </Route>
            </Routes>
        </>

    );
}

export default App;
