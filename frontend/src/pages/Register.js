import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://your-backend.onrender.com/api"; // replace with your backend URL

function Register() {
  const [form,setForm] = useState({ name:"", email:"", password:"" });

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
      const res = await axios.post(`${API_URL}/auth/register`, form);
      alert(res.data.message);
    }catch(err){
      console.error(err);
      alert(err.response?.data?.message || "Error");
    }
  }

  return <form onSubmit={handleSubmit} style={{marginBottom:"20px"}}>
    <h2>Register</h2>
    <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /><br/>
    <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
    <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><br/>
    <button type="submit">Register</button>
  </form>;
}

export default Register;
