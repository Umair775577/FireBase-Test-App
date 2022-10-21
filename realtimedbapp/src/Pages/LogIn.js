import * as React from 'react';
import { useState, useEffect } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Style.css';
import Button from '@mui/material/Button';
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../Firebase-config"
import { Link, useNavigate } from 'react-router-dom';
import SignUpForm from './SignUp';



const LogInForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isRegistering, setIsRegistering] = useState(false)

    const navigate = useNavigate()


    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }



    const handleSignIn = async () => {
        try {
            const data = await signInWithEmailAndPassword(auth, email, password)
            console.log(data)
            localStorage.setItem("token", data?._tokenResponse.refreshToken)
            navigate("/")
        } catch (err) {
            alert(err.message)
        }
    }

    // useEffect(() => {
    //     auth.onAuthStateChanged((user) => {
    //         if (user) {
    //             navigate("/")
    //         }
    //     })
    // }, [])
    return (
        <>
            {!isRegistering ? (<Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                    marginTop: "10rem"
                }}
                noValidate
                autoComplete="off"
            >
                <h1 className="signUpHeading"> Log In</h1>
                <div className="signUpMain">
                    <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    <Button variant="contained" style={{ width: "26%" }} onClick={handleSignIn}>Sign-In</Button>
                    <Link to="/forgot-password"> <p> Forgot Password ? </p></Link>
                    <span style={{ marginTop: "1rem" }}>

                        Create an Account? <Button variant="contained" onClick={() => { setIsRegistering(true) }} >Register</Button>
                    </span>
                </div>
            </Box>) : (<SignUpForm />)}

        </>

    );
}

export default LogInForm;
