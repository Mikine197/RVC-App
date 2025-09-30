import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Feed({ user }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState({});

  // Fetch posts with pagination
  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/posts?page=${page}&limit=5`);
      if (res.data.length === 0) {
        setHasMore(false); // no more posts
      } else {
        setPosts(prev => [...prev, ...res.data]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
      fetchPosts(); // load next page when near bottom
    }
  };

  const handleLike = async (postId) => {
    await axios.post(`http://localhost:5000/api/posts/${postId}/like`, { userId: user.id });
    // update only that post
    setPosts(prev => prev.map(p => p._id === postId ? { ...p, likes: [...p.likes, user.id] } : p));
  };

  const handleComment = async (postId) => {
    if (!commentText[postId]) return;

    const text = commentText[postId];
    await axios.post(`http://localhost:5000/api/posts/${postId}/comment`, { userId: user.id, text });
    setPosts(prev => prev.map(p => p._id === postId ? { ...p, comments: [...p.comments, { userId: user.id, text }] } : p));
    setCommentText({ ...commentText, [postId]: '' });
  };

  return (
    <div>
      <h1>RVC Feed</h1>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <img src={post.mediaUrl} alt="" width="300" /><br/>
          <b>{post.caption}</b><br/>
          <span>Likes: {post.likes.length}</span>
          <button onClick={() => handleLike(post._id)}>Like</button><br/>

          <div>
            <h4>Comments:</h4>
            {post.comments.map((c, idx) => (
              <p key={idx}><b>{c.userId}</b>: {c.text}</p>
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
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more posts</p>}
    </div>
  );
}

export default Feed;
