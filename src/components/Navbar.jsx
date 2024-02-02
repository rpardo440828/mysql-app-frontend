import React, { useContext } from "react";
import Logo from "../imgs/logo.jpg";
import {Link} from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={Logo} alt="" />
                </div>
                <div className="links">
                    {currentUser ? (
                        <>
                        <button className="nav_btn"><Link className="mainLink" to={`/`}><h3>Home</h3></Link></button>
                        <button className="nav_btn"><Link className="mainLink" to={`/movies/${currentUser.id}`}><h3>Movies</h3></Link></button>
                        <button className="nav_btn"><Link className="mainLink" to={`/books/${currentUser.id}`}><h3>Books</h3></Link></button>
                        <button className="nav_btn"><Link className="mainLink" to={`/shows/${currentUser.id}`}><h3>TV Shows</h3></Link></button></>
                    ) : ("")}

                    <span><h3>{currentUser?.username}</h3></span>
                    {currentUser ? (
                        <button className="nav_btn" onClick={logout}><Link className="mainLink" to="/"><h3>Logout</h3></Link></button>
                    ) : (
                        <button className="nav_btn">
                            <Link className="mainLink" to="/login">
                                <h3>Login</h3>
                            </Link>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;