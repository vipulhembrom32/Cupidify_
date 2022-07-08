import React from 'react';
import '../styles/sign.css'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { auth } from '../firebase.config';
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { collection } from 'firebase/firestore';
import { db } from '../firebase.config';
import { addDoc } from 'firebase/firestore';
import { onSnapshot } from 'firebase/firestore';

const SignUp = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const [err, setErr] = useState(false);
    const [userlist, setUserlist] = useState([]);

    //  SOCIAL LINKS
    const [fb, setFb] = useState("");
    const [insta, setInsta] = useState("");
    const [lkn, setLkn] = useState("");
    // const [link, setLink] = useState("");

    //  FIREBASE
    const usersCollectionRef = collection(db, "users");
    useEffect(() => {
        onSnapshot(usersCollectionRef, (snapshot) => {
            setUserlist(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);

    //  SIGNUP FUNCTION
    const signInWithGoogle = () => {

        // //  SETTING THE LINK
        // if (fb !== "") {
        //     setLink(fb);
        //     console.log(link, 'link')
        // }
        // else if (insta !== "") {
        //     setLink(`https://www.instagram.com/` + insta`/`);
        // }
        // else if (lkn !== "") {
        //     setLink(lkn)
        // }

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = auth.currentUser;

                const checkEmailPresent = userlist.find((individual) => {
                    return (individual.email === user.email);
                })

                if (checkEmailPresent !== undefined) {  //  EMAIL FOUND

                    setAlert(true);
                    //  LOGOUT AUTH
                    props.toggleUser(false)
                    dispatch({
                        type: 'LOGOUT',
                    });
                    //  CHECK
                    /*
                    signOut(auth).then(() => {
                        // Sign-out successful.
                        props.toggleUser(false)
                        dispatch({
                            type: 'LOGOUT',
                        });
                    }).catch((error) => {
                        // An error happened.
                        console.log(error)
                    });
                    */
                    return;

                }

                const link = ((fb !== "") ? fb : (insta !== "") ? `https://www.instagram.com/${insta}/` : lkn)

                //  AUTH SIGNUP
                addDoc(usersCollectionRef, {
                    name: user.displayName,
                    email: user.email,
                    photourl: user.photoURL,
                    socialaccount: link,
                    count: 0,
                });

                //  REDUX
                const payloadOBJ = {
                    name: user.displayName,
                    email: user.email,
                    photourl: user.photoURL,
                    socialaccount: link,
                }

                //  TOGGLE : REDUX : NAVIGATE
                props.toggleUser(true);
                dispatch({
                    type: 'SIGNIN',
                    payload: payloadOBJ,
                });
                navigate('/users')
            })
            .catch((error) => {
                setErr(true)
                console.log(error);
            });
    };


    return (
        <>
            <div className='flexy sign-box'>

                {/* CARD */}
                <div className="card bg-dark text-white p-2">
                    {/* INFO MESSAGE */}
                    <div class="alert alert-primary d-flex align-items-center" role="alert">
                        <div>
                        <i class="info circle icon" /> &nbsp;
                            You need to fill only/atleast 1 of the 3 inputs
                        </div>
                    </div>

                    {/* ERROR MESSAGE */}
                    {err === true ? (
                        <>
                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                <div>
                                    <i className="fas fa-exclamation-triangle" />&nbsp;
                                    Something went wrong TRY AGAIN !!
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    {/* ALERT MESSAGE */}
                    {alert === true ? (
                        <>
                            <div className="alert alert-warning d-flex align-items-center" role="alert">
                                <div>
                                    <i className="fas fa-exclamation-triangle" />
                                    &nbsp;This mail is already in database ; Try to &nbsp;
                                    <Link className="text-valentine" exact to="/signin">
                                        Sign In
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <></>
                    )}

                    <label htmlFor="" className='mt-3'>Facebook Profile Link</label>
                    <input onChange={(event) => {
                        setFb(event.target.value);
                        setErr(false);
                        setAlert(false);
                    }} type="text" className='mouserat form-control sign-round bg-dark text-white' />

                    <label htmlFor="" className='mt-3'>Insta Id</label>
                    <input onChange={(event) => {
                        setInsta(event.target.value);
                        setErr(false);
                        setAlert(false);
                    }} type="text" className='mouserat form-control sign-round bg-dark text-white' />

                    <label htmlFor="" className='mt-3'>LinkedIn Profile Link</label>
                    <input onChange={(event) => {
                        setLkn(event.target.value);
                        setErr(false);
                        setAlert(false);
                    }} type="text" className='mouserat form-control sign-round bg-dark text-white' />

                    {
                        (fb !== "" || insta !== "" || lkn !== "") ?
                            <button onClick={() => signInWithGoogle()} className='button ui bg-valentine text-white sign-round mx-0 my-3'>
                                <i class="fab fa-google me-2"></i>Sign In with Google
                            </button>
                            :
                            <button disabled className='button ui bg-valentine text-white sign-round mx-0 my-3'>
                                <i class="fab fa-google me-2"></i>Sign In with Google
                            </button>

                    }

                    <div className="flexy">
                        <Link className="text-valentine" exact to="/signin">Already have an account ??</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
