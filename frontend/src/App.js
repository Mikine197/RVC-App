import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>RVC Social App</h1>
      <div>
        {posts.map(post => (
          <div key={post._id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
            <img src={post.mediaUrl} alt="" width="200" />
            <p>{post.caption}</p>
            <p>Likes: {post.likes.length}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
