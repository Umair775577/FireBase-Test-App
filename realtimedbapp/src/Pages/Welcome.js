import '../App.css';
import { uid } from "uid"
import { useState, useEffect } from "react"
import { onValue, ref, remove, set, update } from "firebase/database"
import { auth, db } from "../Firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import image from "../images/test.png"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Welcome = () => {
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [editUuid, setEditUuid] = useState("")



    const navigate = useNavigate()

    //Add Comment 
    const writeToDatabase = () => {
        const uuid = uid()
        set(ref(db, `/${auth.currentUser.uid}/${uuid}`), {
            id: uuid,
            name: newComment,
        })
        setNewComment("")

    }


    // Read Comments 

    const getcomments = () => {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
            setComments([])
            const data = snapshot.val()
            if (data != null) {
                Object.values(data).map((user) => {
                    setComments((oldArray) => [...oldArray, user])
                })
            }
        })
    }



    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                getcomments()
            }
         })
    }, [])




    //Delete Comment

    const deleteHAndler = (id) => {
        remove(ref(db, `/${auth.currentUser.uid}/${id}`))
    }



    // Update Comment

    const editAgeHAndler = (user) => {
        setIsEdit(true)
        setNewComment(user.name)
        setEditUuid(user.id)

    }

    const onSubmit = (user) => {
        update(ref(db, `/${auth.currentUser.uid}/${editUuid}`), {
            name: newComment,
            uuid: editUuid
        })
        setIsEdit(false)
        setNewComment("")
    }



    // signOut
    const signOutHandler = async () => {
        try {
            await signOut(auth)
            navigate("/Log-in")
            localStorage.removeItem("token")
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <>
            <Button variant='contained' className="signoutButton" onClick={signOutHandler}>Sign-Out</Button>
            <div className="App">
                <img className="imageStyle" src={image}></img>

                {comments?.map((user, index) => {
                    return (
                        <>


                            <div key={index} className="commentsMain">
                                <p className="commentsStyle" >{user?.name} </p>
                                <Button className="btnStyle" size="small" variant="contained" onClick={() => { editAgeHAndler(user) }}>Edit</Button>
                                <Button className="btnStyle" size="small" variant="contained" style={{ backgroundColor: "red" }} onClick={() => { deleteHAndler(user.id) }}>Delete</Button>
                            </div>
                        </>
                    )
                })}

                <div className='commentSection'>
                    <TextField
                        id="outlined-multiline-static"
                        label="Add Comment"
                        multiline
                        rows={2}
                        onChange={(e) => { setNewComment(e.target.value) }}
                        value={newComment}
                    />
                    <br />
                    {isEdit ? (<Button size="small" variant="contained" onClick={onSubmit} className="btnStyle" style={{ marginLeft: "2px" }}>Submit</Button>) : (<Button className="btnStyle" size="small" variant="contained" onClick={writeToDatabase}>Post</Button>)}


                </div>


            </div>
        </>

    )
}


export default Welcome