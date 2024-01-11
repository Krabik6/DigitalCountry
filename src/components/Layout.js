import {Outlet, NavLink, useLocation} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {Blockchain} from "../blockchain";
// import { CustomLink } from './CustomLink'
// import { NavLink } from 'react-router-dom';
export const Layout = () => {
    const navStylesShared = "p-3 text-white text-xl ";

    const {pathname} = useLocation();
    const [isGood, setIsGood] = useState(window.blockchain instanceof Blockchain);

    window.setIsGood = setIsGood;

    if(pathname !== '/' && !( window.blockchain instanceof Blockchain ) ) {
        return (
            <div>
                rendering this bitch
            </div>
        )
    }
    



    return (
        <>
            <header className="p-6 bg-headerBackground">
                <div className="flex justify-between mx-auto lg:container">
                    <div>
                        <NavLink className={navStylesShared} to="/">Home</NavLink>
                        <NavLink className={navStylesShared} to="/statistics">Statistics</NavLink>

                        <span className={navStylesShared}>
                            Government Resources
                        </span>
                        <NavLink className={navStylesShared} to="/government/news/page/main">Blog</NavLink>
                    </div>

                    <div>
                        <NavLink className={navStylesShared} to="/account">Account</NavLink>
                    </div>
                </div>
            </header>

            <main className="mx-auto lg:container px-4">
                <Outlet/>
            </main>

            <footer className="mx-auto lg:container">Copyrated and protected since 2022</footer>
        </>
    )
}