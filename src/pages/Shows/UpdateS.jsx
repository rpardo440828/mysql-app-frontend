import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const UpdateS = () => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const [title,setShowTitle] = useState('');
    const [desc,setShowDesc] = useState('');
    const [img,setShowImg] = useState('');
    const userId = location.pathname.split("/")[3];
    const bid = location.pathname.split("/")[4];

    
    useEffect(()=>{
        axios.get(`http://localhost:8800/api/post/shows/${userId}/${bid}`)
        .then(res => {
            setShowTitle(res.data[0].title);
            setShowDesc(res.data[0].desc);
            setShowImg(res.data[0].img);
        })
        .catch(err => console.log(err));
    }, [userId, bid]);

    const navigate = useNavigate();


    const handleClick = async e =>{
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/api/post/shows/${currentUser.id}`, {title, desc, img, bid})
            .then(res => {
                if(res.data.updated) {
                    navigate(`/shows/${currentUser.id}`);
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
            <h1>Update the Show</h1>
            <input 
            required type="text" placeholder="title" onChange={e => setShowTitle(e.target.value)}
             name="title" value={title} />

            <input required type="text" id="descText" onChange={e => setShowDesc(e.target.value)}
              placeholder="desc" name="desc" value={desc} />

            <input required type="text" placeholder="img" onChange={e => setShowImg(e.target.value)}
             name="img" value={img} />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateS;