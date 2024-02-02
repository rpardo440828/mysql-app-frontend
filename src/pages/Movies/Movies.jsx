import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Movies = () => {
    const { currentUser } = useContext(AuthContext);
    const [movies, setMovies] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`/post/movies/${userId}`);
                setMovies(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [userId]);

    // Need to fix delete after implementation
    const handleDelete = async (bid)=>{
        try {
            await axios.delete(`http://localhost:8800/api/post/movies/${bid}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="post">
            {currentUser && <h1>Welcome {currentUser.username} to Your Movie Collection!</h1>}
            <div className="top_btns">
                <button className="addMovie"><Link className="linkText" to={`/movies/add/${currentUser.id}`}>Add New Movie</Link></button>
                <button className="addMovie" onClick={()=>setIsOpen(!isOpen)}>{isOpen ? 'Hide Description': 'View Description'}</button>
            </div>

            <div className="movies">
                {Array.isArray(movies) ? movies.map((movie)=>(
                    <div className="movie" key={movie.id}>
                        {movie.img && <img className="img" src={movie.img} alt="" />}
                        <h2>{movie.title}</h2>
                        {isOpen && (<p>{movie.desc}</p>)}
                        {!isOpen && (
                            <div className="btns">
                                <button className="delete" onClick={()=>handleDelete(movie.id)}>Delete</button>
                                <Link className="linkText" to={`/movies/update/${currentUser.id}/${movie.id}`}><button className="update">Update</button></Link>
                            </div>
                        )}
                    </div>
                )) : ''}
            </div>
        </div>
    );

    
};

export default Movies;