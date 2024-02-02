import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const AddM = () => {
    const { currentUser } = useContext(AuthContext);

    const [movie,setMovie] = useState({
        title:"",
        desc:"",
        img:"",
        uid:`${currentUser.id}`,
        cat:"movie",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setMovie(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8800/api/post/movies/${currentUser.id}`, movie);
            navigate(`/movies/${currentUser.id}`);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Add New Movie</h1>
            <input required type="text" placeholder="title" onChange={handleChange} name="title" />
            <input required type="text" id="descText" placeholder="desc" onChange={handleChange} name="desc" />
            <input required type="text" placeholder="img" onChange={handleChange} name="img" />
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddM;