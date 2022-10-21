import { useState } from "react"
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Style.css';
import Button from '@mui/material/Button';
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase-config';

export default function SignUpForm() {
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()
    const submitHandler = async () => {
        if (password != confirmPassword) {
            alert("Password Not Matched")
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password, fullName, phone, confirmPassword)
            if (result) {
                navigate("/")
            }
        } catch (err) {
            alert(err.message)
        }
    }

    const validationHandler = (fullName != "" && email != "" && phone != "" && (password == confirmPassword)) ? false : true
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
            <h1 className="signUpHeading"> Sign Up</h1>
            <div className="signUpMain">
                <TextField
                    required
                    id="outlined-required"
                    label="Full Name"
                    value={fullName}
                    onChange={(e) => { setFullName(e.target.value) }}
                //   defaultValue="Hello World"
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value) }}

                />
                <TextField
                    required
                    id="outlined-required"
                    label="Phone"
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value) }}

                />

                <TextField
                    required
                    id="outlined-password-input"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}

                />
                <TextField
                    required
                    id="outlined-password-input"
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => { setConfirmPassword(e.target.value) }}

                />
                <Button disabled={validationHandler} variant="contained" style={{ width: "26%" }} onClick={submitHandler}>Register</Button>
            </div>
        </Box>

    );
}
