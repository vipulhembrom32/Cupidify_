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

const SignIn = (props) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [link, setLink] = useState("");
    const [alert, setAlert] = useState(false);
    const [err, setErr] = useState(false);
    const [userlist, setUserlist] = useState([]);

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

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {

                const user = auth.currentUser;

                const checkEmailPresent = userlist.find((individual) => {
                    return (individual.email === user.email);
                })

                if (checkEmailPresent === undefined) {

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
                console.log(error);
            });
    };

    return (
        <>
            <div className='flexy sign-box'>
                <div className="card bg-dark text-white p-2">
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
                                    &nbsp;This mail is not present in database ; Try to &nbsp;
                                    <Link className="text-valentine" exact to="/signup">
                                        Sign Up
                                    </Link>
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
                            setAlert(false);
                        }}
                        className='button ui bg-valentine text-white sign-round mx-0 my-3'>
                        <i class="fab fa-google me-2"></i>Sign In with Google
                    </button>
                    <div className="flexy">
                        <Link className="text-valentine" exact to="/signup" >Don't have an account ??</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;
