import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const Books = () => {
    const { currentUser } = useContext(AuthContext);
    const [books, setBooks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const location = useLocation();
    const userId = location.pathname.split("/")[2];

    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const res = await axios.get(`/post/books/${userId}`);
                setBooks(res.data);
            }catch(err){
                console.log(err);
            }
        };
        fetchData();
    }, [userId]);

    // Need to fix delete after implementation
    const handleDelete = async (bid)=>{
        try {
            await axios.delete(`https://my-sql-deployment-027007fd602b.herokuapp.com/api/post/books/${bid}`);
            window.location.reload()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="post">
            {currentUser && <h1>Welcome {currentUser.username} to Your Book Collection!</h1>}
            <div className="top_btns">
            <Link className="linkText" to={`/books/add/${currentUser.id}`}><button className="addMovie">Add New Book</button></Link>
                <button className="addMovie" onClick={()=>setIsOpen(!isOpen)}>{isOpen ? 'Hide Description': 'View Description'}</button>
            </div>

            <div className="movies">
                {Array.isArray(books) ? books.map((book)=>(
                    <div className="movie" key={book.id}>
                        {book.img && <img className="img" src={book.img} alt="" />}
                        <h2>{book.title}</h2>
                        {isOpen && (<p>{book.desc}</p>)}
                        {!isOpen && (
                            <div className="btns">
                                <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                                <Link className="linkText" to={`/books/update/${currentUser.id}/${book.id}`}><button className="update">Update</button></Link>
                            </div>
                        )}
                    </div>
                )) : ''}
            </div>
        </div>
    );

    
};

export default Books;