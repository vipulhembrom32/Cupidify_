import React from 'react'
import '../styles/newsign.css'
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

const NewSign = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [signin, setSignin] = useState(false);
    const [link, setLink] = useState("");
    const [signinalert, setSigninalert] = useState(false);
    const [signupalert, setSignupalert] = useState(false);
    const [err, setErr] = useState(false);
    const [userlist, setUserlist] = useState([]);

    //  SOCIAL LINKS
    const [fb, setFb] = useState("");
    const [insta, setInsta] = useState("");
    const [lkn, setLkn] = useState("");

    //  BUTTON AFFECT
    const register = () => {
        setSignin(false)
        document.getElementById("btn").style.left = "0";
        setErr(false);
        setSigninalert(false);
    }
    const login = () => {
        document.getElementById("btn").style.left = "7.5rem";
        setSignin(true);
        setErr(false);
        setSigninalert(false);
    }

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
    const signUpWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = auth.currentUser;

                const checkEmailPresent = userlist.find((individual) => {
                    return (individual.email === user.email);
                })

                if (checkEmailPresent !== undefined) {  //  EMAIL FOUND

                    setSignupalert(true);
                    //  LOGOUT AUTH
                    props.toggleUser(false)
                    dispatch({
                        type: 'LOGOUT',
                    });
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
                // console.log(error);
            });
    };




    //  SIGNIN FUNCTION
    const signInWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = auth.currentUser;

                const checkEmailPresent = userlist.find((individual) => {
                    return (individual.email === user.email);
                })

                if (checkEmailPresent === undefined) {

                    setSigninalert(true);
                    //  LOGOUT AUTH
                    props.toggleUser(false)
                    dispatch({
                        type: 'LOGOUT',
                    });

                    return;
                }

                userlist.forEach((individual) => {
                    if (individual.email === user.email) {
                        setLink(individual.socialaccount);
                    }
                })

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
                // console.log(error);
            });
    };


    return (
        <>
            <div class="hero flexy">
                <div class="form-box">
                    <div class="button-box">
                        <div id="btn"></div>
                        <button type="button"
                            onClick={() => { register() }}
                            class="toggle-btn" >SignIn</button>
                        <button type="button" class="toggle-btn"
                            onClick={() => { login() }}
                        >SignUp</button>
                    </div>
                    <div className="flexy px-4">
                        {signin === true ?
                            <div className='link-input-box'>
                                {/* INFO MESSAGE */}
                                <div class="alert alert-primary d-flex align-items-center" role="alert">
                                    <div>
                                        <i class="info circle icon" /> &nbsp;
                                        Fill atleast 1 input (Accepting real ids only)
                                    </div>
                                </div>

                                {/* ERROR MESSAGE */}
                                {err === true ? (
                                    <>
                                        <div className="alert alert-danger d-flex align-items-center" role="alert">
                                            <div>
                                                <i className="fas fa-exclamation-triangle" />&nbsp;
                                                Something went wrong Try Again !!
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}

                                {/* ALERT MESSAGE */}
                                {signupalert === true ? (
                                    <>
                                        <div className="alert alert-warning d-flex align-items-center" role="alert">
                                            <div>
                                                <i className="fas fa-exclamation-triangle" />
                                                &nbsp;This mail is already in database ; Try to
                                                Sign In
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}

                                <form id="login">
                                    <label className="form-label m-0 text-white">FacebookLink</label>
                                    <input onChange={(event) => {
                                        setFb(event.target.value);
                                        setErr(false);
                                        setSignupalert(false);
                                    }}
                                        type="text"
                                        class="form-control text-white input-form mb-2 mouserat" placeholder="fb-profile-link" />

                                    <label className="form-label m-0 text-white">Insta Id</label>
                                    <input onChange={(event) => {
                                        setInsta(event.target.value);
                                        setErr(false);
                                        setSignupalert(false);
                                    }} type="text" class="form-control text-white input-form mb-2 mouserat" placeholder="insta-id" />

                                    <label className="form-label m-0 text-white">LinkedIn Link</label>
                                    <input onChange={(event) => {
                                        setLkn(event.target.value);
                                        setErr(false);
                                        setSignupalert(false);
                                    }} type="text" class="form-control text-white input-form mb-2 mouserat" placeholder="linked-in-profile-link" />
                                </form>

                                {
                                    (fb !== "" || insta !== "" || lkn !== "") ?

                                        <button onClick={() => signUpWithGoogle()} class=" mb-5 mt-3 button ui submit-btn mouserat">
                                            <i class="fab fa-google me-2"></i>Sign Up with Google
                                        </button> :

                                        <button disabled class=" mb-5 mt-3 button ui submit-btn mouserat">
                                            <i class="fab fa-google me-2"></i>Sign Up with Google
                                        </button>
                                }
                            </div>
                            : <>

                                {/* SIGNIN */}

                                <div className='link-input-box'>
                                    {/* ERROR MESSAGE */}
                                    {err === true ? (
                                        <>
                                            <div className="alert alert-danger d-flex align-items-center" role="alert">
                                                <div>
                                                    <i className="fas fa-exclamation-triangle" />&nbsp;
                                                    Something went wrong Try Again
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}

                                    {/* ALERT MESSAGE */}
                                    {signinalert === true ? (
                                        <>
                                            <div className="alert alert-warning d-flex align-items-center" role="alert">
                                                <div>
                                                    <i className="fas fa-exclamation-triangle" />
                                                    &nbsp;This mail is not present in database ; Try to
                                                    Sign Up
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                    <button
                                        onClick={() => {
                                            signInWithGoogle();
                                            setErr(false);
                                            setSigninalert(false);
                                        }} class=" mb-5 button ui submit-btn mouserat">
                                        <i class="fab fa-google me-2"></i>Sign In with Google
                                    </button>
                                </div>
                            </>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default NewSign
