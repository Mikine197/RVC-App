import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ user }) {
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);

  const handlePost = async () => {
    const formData = new FormData();
    formData.append('media', file);
    formData.append('caption', caption);
    formData.append('userId', user.id);

    await axios.post('http://localhost:5000/api/posts', formData);
    alert("Post created!");
  }

  return (
    <div>
      <h2>Create Post</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} /><br/>
      <input placeholder="Caption" onChange={e => setCaption(e.target.value)} /><br/>
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default CreatePost;
