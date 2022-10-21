import * as React from 'react';
import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Style.css';
import Button from '@mui/material/Button';
import { confirmPasswordReset, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../Firebase-config"
import { useNavigate } from 'react-router-dom';



const ResetPassword = () => {
    const [password, setPassword] = useState("")



    const navigate = useNavigate()
    const getPath = window.location.search
    const query = new URLSearchParams(getPath)
    const oobcode = query.get("oobCode")

    const handleSubmit = async ()=>{
        
        try {
           const data = await confirmPasswordReset(auth,oobcode,password)
           alert("Password Reset successfully")
           setTimeout(() => {
            navigate("/log-in")
           }, 1500);
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
            <h1 className="signUpHeading"> Reset-Password</h1>
            <div className="signUpMain">
            <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}

                />
                
                <Button variant="contained" style={{ width: "26%" }} onClick={handleSubmit}>Reset Password</Button>
                <span style={{ marginTop: "2rem" }}>
                     <Button variant="contained" onClick={()=>{navigate("/log-in")}} >Login</Button>
                </span>
            </div>
        </Box>
        
    );
}

export default ResetPassword;





