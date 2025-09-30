import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  // Fetch all posts
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:5000/api/posts');
    setPosts(res.data.reverse()); // latest posts first
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    await axios.post(`http://localhost:5000/api/posts/${postId}/like`, { userId: user.id });
    fetchPosts();
  };

  const handleComment = async (postId) => {
    if(!commentText[postId]) return;
    await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, { 
      userId: user.id, 
      text: commentText[postId] 
    });
    setCommentText({ ...commentText, [postId]: '' });
    fetchPosts();
  };

  return (
    <div>
      <h1>RVC Feed</h1>
      {posts.map(post => (
        <div key={post._id} style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <img src={post.mediaUrl} alt="" width="300" /><br/>
          <b>{post.caption}</b><br/>
          <span>Likes: {post.likes.length} </span>
          <button onClick={() => handleLike(post._id)}>Like</button><br/>

          <div>
            <h4>Comments:</h4>
            {post.comments.map((c, idx) => (
              <p key={idx}>{c.text}</p>
            ))}
            <input 
              placeholder="Write comment..." 
              value={commentText[post._id] || ''} 
              onChange={e => setCommentText({ ...commentText, [post._id]: e.target.value })} 
            />
            <button onClick={() => handleComment(post._id)}>Comment</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Feed;
