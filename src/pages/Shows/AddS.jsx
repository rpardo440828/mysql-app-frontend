import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const AddS = () => {
    const { currentUser } = useContext(AuthContext);

    const [show,setShow] = useState({
        title:"",
        desc:"",
        img:"",
        uid:`${currentUser.id}`,
        cat:"show",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setShow(prev=>({...prev, [e.target.name]: e.target.value}))
    };

    const handleClick = async e =>{
        e.preventDefault();
        try {
            await axios.post(`http://localhost:8800/api/post/shows/${currentUser.id}`, show);
            navigate(`/shows/${currentUser.id}`);
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Add New TV Show</h1>
            <input required type="text" placeholder="title" onChange={handleChange} name="title" />
            <input required type="text" id="descText" placeholder="desc" onChange={handleChange} name="desc" />
            <input required type="text" placeholder="img" onChange={handleChange} name="img" />
            <button className="formButton" onClick={handleClick}>Add</button>
        </div>
    );
};

export default AddS;