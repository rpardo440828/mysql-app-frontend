import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const AddB = () => {
    const { currentUser } = useContext(AuthContext);

    const [book,setBook] = useState({
        title:"",
        desc:"",
        img:"",
        uid:`${currentUser.id}`,
        cat:"book",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault();
        try {
            await axios.post(`https://my-sql-deployment-027007fd602b.herokuapp.com/api/post/books/${currentUser.id}`, book);
            navigate(`/books/${currentUser.id}`);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Add New Book</h1>
            <input required type="text" placeholder="title" onChange={handleChange} name="title" />
            <input required type="text" id="descText" placeholder="desc" onChange={handleChange} name="desc" />
            <input required type="text" placeholder="img" onChange={handleChange} name="img" />
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddB;