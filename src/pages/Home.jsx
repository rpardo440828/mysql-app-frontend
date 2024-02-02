import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Home = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="Home">
            {currentUser ? <h1 className="title">Welcome {currentUser.username} to Your Collections!</h1>: <h1 className="title">Welcome to Your New Collection Platform</h1>}
            <section className="movie_billboard">
                <div className="movie_billboard_container">
                    <header className="movie_billboard_header">
                        {currentUser ? <h1 className="movie_billboard_headline">
                            Welcome to Your Movie Collection!
                        </h1>:
                        <h1 className="movie_billboard_headline">
                            Create Your Own Movie Collection
                        </h1>}
                        {currentUser ? <p className="movie_billboard_header_p">
                            Check out your movie collection! Add movies to your watch later collection,
                             view where to watch them, and rate your movies out of 5 stars.
                        </p>:
                        <p className="movie_billboard_header_p">
                            Login or register and start creating your movie collection now! Add movies to your watch later collection,
                            view where to watch them, and rate your movies out of 5 stars.
                        </p>}
                        {currentUser ? 
                            <Link className="linkTextH" to={`/movies/${currentUser.id}`}><button className="movie_billboard_header_btn">Movies</button></Link>:
                            <Link className="linkTextH" to="/login"><button className="movie_billboard_header_btn">Login</button></Link>}
                    </header>
                    <div className="movie_billboard_illustration">
                        <img className="HomeImg" src="https://t3.ftcdn.net/jpg/05/52/90/10/360_F_552901001_iVDRtsrQOjVvyH3foTMEYW2t0YalwYCL.jpg" alt="Movie Background Picture" />
                    </div>
                </div>
            </section>

            <section className="movie_billboard" id="book">
                <div className="movie_billboard_container">
                    <header className="movie_billboard_header" id="book">
                        {currentUser ? <h1 className="movie_billboard_headline" id="book">
                            Welcome to Your<br /> Book Collection!
                        </h1>:
                        <h1 className="movie_billboard_headline" id="book">
                            Create Your Own Book Collection
                        </h1>}
                        {currentUser ? <p className="movie_billboard_header_p" id="book">
                            Check out your book collection! Add books to your read later collection,
                             view where to buy them, and rate your books out of 5 stars.
                        </p>:
                        <p className="movie_billboard_header_p" id="book">
                            Login or register and create your book collection! Add books to your read later collection,
                            view where to buy them, and rate your books out of 5 stars.
                        </p>}
                        {currentUser ? 
                        <Link to={`/books/${currentUser.id}`}>
                            <button className="movie_billboard_header_btn">
                                Books
                            </button>
                        </Link>:
                        <Link to="/login">
                            <button className="movie_billboard_header_btn">
                                Login
                            </button>
                        </Link>}
                    </header>
                    <div className="movie_billboard_illustration">
                        <img className="HomeImg" src="https://static.vecteezy.com/system/resources/previews/030/663/365/non_2x/book-high-quality-4k-ultra-hd-hdr-free-photo.jpg" alt="Book Background Picture" />
                    </div>
                </div>
            </section>

            <section className="movie_billboard">
                <div className="movie_billboard_container">
                    <header className="movie_billboard_header">
                        {currentUser ? <h1 className="movie_billboard_headline">
                            Welcome to Your<br /> TV Show Collection!
                        </h1>:
                        <h1 className="movie_billboard_headline">
                            Create Your Own TV Show Collection!
                        </h1>}
                        {currentUser ? <p className="movie_billboard_header_p">
                            Check out your TV show collection! Add TV shows to your watch later collection,
                            view where to watch them, and rate your shows out of 5 stars.
                        </p>:
                        <p className="movie_billboard_header_p">
                            Login or register and create your TV show collection! Add TV shows to your watch later collection,
                            view where to watch them, and rate your shows out of 5 stars.
                        </p>}
                        {currentUser ? 
                        <Link to={`/shows/${currentUser.id}`}>
                            <button className="movie_billboard_header_btn">
                                TV Shows
                            </button>
                        </Link>:
                        <Link to="/login">
                            <button className="movie_billboard_header_btn">
                                Login
                            </button>
                        </Link>}
                    </header>
                    <div className="movie_billboard_illustration">
                        <img className="HomeImg" src="https://e1.pxfuel.com/desktop-wallpaper/351/653/desktop-wallpaper-rick-and-morty-purple-backgrounds-1920x1080-rick-and-morty-computer.jpg" alt="TV Show Background Picture" />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;