import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://your-backend.onrender.com/api"; // replace with your backend URL

function CreatePost({ user }) {
  const [caption,setCaption] = useState("");
  const [file,setFile] = useState(null);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!file) return alert("Select media file");
    const formData = new FormData();
    formData.append("media", file);
    formData.append("caption", caption);
    formData.append("userId", user.id);

    try{
      await axios.post(`${API_URL}/posts`, formData, { headers:{ "Content-Type":"multipart/form-data" }});
      alert("Post created");
      setCaption("");
      setFile(null);
    }catch(err){
      console.error(err);
      alert("Error creating post");
    }
  }

  return <form onSubmit={handleSubmit} style={{marginBottom:"20px"}}>
    <h2>Create Post</h2>
    <input type="file" onChange={e=>setFile(e.target.files[0])} /><br/>
    <input placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} /><br/>
    <button type="submit">Post</button>
  </form>;
}

export default CreatePost;
