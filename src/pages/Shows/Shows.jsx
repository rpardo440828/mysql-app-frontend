import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Shows = () => {
    const { currentUser } = useContext(AuthContext);
    const [shows, setShows] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`https://my-sql-deployment-027007fd602b.herokuapp.com/api/post/shows/${userId}`);
                setShows(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [userId]);

    const handleDelete = async (bid)=>{
        try {
            await axios.delete(`https://my-sql-deployment-027007fd602b.herokuapp.com/api/post/shows/${bid}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="post">
            {currentUser && <h1>Welcome {currentUser.username} to Your TV Show Collection!</h1>}
            <div className="top_btns">
                <button className="addMovie"><Link className="linkText" to={`/shows/add/${currentUser.id}`}>Add New Show</Link></button>
                <button className="addMovie" onClick={()=>setIsOpen(!isOpen)}>{isOpen ? 'Hide Description': 'View Description'}</button>
            </div>

            <div className="movies">
                {Array.isArray(shows) ? shows.map((show)=>(
                    <div className="movie" key={show.id}>
                        {show.img && <img className="img" src={show.img} alt="" />}
                        <h2>{show.title}</h2>
                        {isOpen && (<p>{show.desc}</p>)}
                        {!isOpen && (
                            <div className="btns">
                                <button className="delete" onClick={()=>handleDelete(show.id)}>Delete</button>
                                <Link className="linkText" to={`/shows/update/${currentUser.id}/${show.id}`}><button className="update">Update</button></Link>
                            </div>
                        )}
                    </div>
                )) : ''}
            </div>
        </div>
    );

    
};

export default Shows;