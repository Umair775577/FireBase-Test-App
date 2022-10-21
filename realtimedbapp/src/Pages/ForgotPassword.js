import * as React from 'react';
import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Style.css';
import Button from '@mui/material/Button';
import { sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../Firebase-config"
import { useNavigate } from 'react-router-dom';




const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    
    const navigate = useNavigate()


    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }



    const handleSubmit = async ()=>{
        try {
           await sendPasswordResetEmail(auth, email)
           alert("Email sent successfully , please check your inbox")
           setTimeout(() => {
            navigate("/log-in")
           }, 4000);
        } catch (err) {
            alert(err.message)
        }
    }


    return (
        <Box
        component="form" 
        sx={{
            '& .MuiTextField-root': { m: 1, width: '50ch' },
            marginTop: "10rem"
        }}
        noValidate
        autoComplete="off"
    >
        <h1 className="signUpHeading"> Forgot Password</h1>
        <div className="signUpMain">
            <TextField
                required
                id="outlined-required"
                label="Email"
                placeholder='Enter Your Email'
                onChange={handleEmailChange}
                value={email}
            />
            
            <Button variant="contained" style={{ width: "26%" }} onClick={handleSubmit}>Reset</Button>
            <span style={{ marginTop: "2rem" }}>

                 <Button variant="contained" onClick={()=>{navigate("/log-in")}} >Login</Button>
            </span>
        </div>
    </Box>
        
    );
}

export default ForgotPassword;





