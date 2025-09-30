import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://your-backend.onrender.com/api"; // replace with your backend URL

function Login({ setUser }) {
  const [form,setForm] = useState({ email:"", password:"" });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post(`${API_URL}/auth/login`, form);
      setUser(res.data.user);
      localStorage.setItem("token", res.data.token);
    }catch(err){
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  }

  return <form onSubmit={handleSubmit} style={{marginBottom:"20px"}}>
    <h2>Login</h2>
    <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
    <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
    <button type="submit">Login</button>
  </form>;
}

export default Login;
