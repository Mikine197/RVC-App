import React, { useState } from 'react';
import Register from './pages/Register';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost';
import Feed from './pages/Feed';

function App() {
  const [user, setUser] = useState(null);

  if(!user){
    return <div style={{padding:"20px"}}>
      <h1>RVC Social App</h1>
      <Register />
      <Login setUser={setUser} />
    </div>;
  }

  return <div style={{padding:"20px"}}>
    <h1>Welcome, {user.name}</h1>
    <CreatePost user={user} />
    <Feed user={user} />
  </div>;
}

export default App;
