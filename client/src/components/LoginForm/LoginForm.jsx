import React, { useState } from 'react'

const Login = ({onSubmit}) => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")

const handleSubmit=(e)=>{
    e.preventDefault();

    if(!email || !password){
        alert("Enter Email and Password")
        return;
    }
    localStorage.setItem("isLoggedIn", "true");
    onSubmit()
}
  return (
    <div>
        <h2>Expense Tracker Login</h2>

        <form onSubmit={handleSubmit}>

            <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email' type='email' />
            <input  value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password' type='password' />

            <button type='submit'>Login </button>
        </form>




    </div>
  )
}

export default Login