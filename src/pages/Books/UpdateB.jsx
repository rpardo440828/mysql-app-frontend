import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const UpdateB = () => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const [title,setBookTitle] = useState('');
    const [desc,setBookDesc] = useState('');
    const [img,setBookImg] = useState('');
    const userId = location.pathname.split("/")[3];
    const bid = location.pathname.split("/")[4];

    
    useEffect(()=>{
        axios.get(`http://localhost:8800/api/post/books/${userId}/${bid}`)
        .then(res => {
            setBookTitle(res.data[0].title);
            setBookDesc(res.data[0].desc);
            setBookImg(res.data[0].img);
        })
        .catch(err => console.log(err));
    }, [userId, bid]);

    const navigate = useNavigate();


    const handleClick = async e =>{
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/api/post/books/${currentUser.id}`, {title, desc, img, bid})
            .then(res => {
                if(res.data.updated) {
                    navigate(`/books/${currentUser.id}`);
                } else {
                    alert("Not updated");
                }
            })
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div className="form">
            <h1>Update the Book</h1>
            <input 
            required type="text" placeholder="title" onChange={e => setBookTitle(e.target.value)}
             name="title" value={title} />

            <input required type="text" id="descText" onChange={e => setBookDesc(e.target.value)}
              placeholder="desc" name="desc" value={desc} />

            <input required type="text" placeholder="img" onChange={e => setBookImg(e.target.value)}
             name="img" value={img} />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateB;