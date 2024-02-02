import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const UpdateM = () => {
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);
    const [title,setMovieTitle] = useState('');
    const [desc,setMovieDesc] = useState('');
    const [img,setMovieImg] = useState('');
    const userId = location.pathname.split("/")[3];
    const bid = location.pathname.split("/")[4];

    
    useEffect(()=>{
        axios.get(`http://localhost:8800/api/post/movies/${userId}/${bid}`)
        .then(res => {
            setMovieTitle(res.data[0].title);
            setMovieDesc(res.data[0].desc);
            setMovieImg(res.data[0].img);
        })
        .catch(err => console.log(err));
    }, [userId, bid]);

    const navigate = useNavigate();


    const handleClick = async e =>{
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8800/api/post/movies/${currentUser.id}`, {title, desc, img, bid})
            .then(res => {
                if(res.data.updated) {
                    navigate(`/movies/${currentUser.id}`);
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
            <h1>Update the Movie</h1>
            <input 
            required type="text" placeholder="title" onChange={e => setMovieTitle(e.target.value)}
             name="title" value={title} />

            <input required type="text" id="descText" onChange={e => setMovieDesc(e.target.value)}
              placeholder="desc" name="desc" value={desc} />

            <input required type="text" placeholder="img" onChange={e => setMovieImg(e.target.value)}
             name="img" value={img} />
            <button className="formButton" onClick={handleClick}>Update</button>
        </div>
    );
};

export default UpdateM;