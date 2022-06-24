import { Outlet, NavLink } from 'react-router-dom';
// import { CustomLink } from './CustomLink'
// import { NavLink } from 'react-router-dom';
const Layout = () => {
    return (
        <>
        <header>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">Blog</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/account">account</NavLink>
            <NavLink to="/PresidentAccount">PresidentAccount</NavLink>
        </header>

        <main className="container">
            <Outlet />
        </main>

        <footer className="container"> ReactRouter Tutorials 2021</footer>
        {/* <footer className="container">&copy; ReactRouter Tutorials 2021</footer> */}
        </>
    )
}

export {Layout}