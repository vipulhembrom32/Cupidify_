import React from 'react'
import '../styles/newuserlist.css'
import { db } from "../firebase.config";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { useSelector } from "react-redux"; import {
    // collection,
    // onSnapshot,
    doc,
    setDoc,
    addDoc,
    deleteDoc,
    // query,
    serverTimestamp,
    // orderBy,
} from "firebase/firestore";

const NewUserlist = () => {

    const substituteData = useSelector(state => state);
    const email = substituteData.email;

    const [popup, setPopup] = useState(false);
    const [userlist, setUserlist] = useState([]);
    const [form, setForm] = useState({
        text: "",
        usermail: email,
        taggeduserid: "",
        taggeduser: "",
        taggedusermail: "",
        taggeduserprofile: "",
        taggedusercount: 0,
        taggeduserphoto: "",
    });

    const [list, setList] = useState(userlist);
    const [search, setSearch] = useState("");

    const usersCollectionRef = collection(db, "users");
    const chatsCollectionRef = collection(db, "chats");

    const sortRef = query(usersCollectionRef, orderBy("name"));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setUserlist(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
            setList(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });
    }, []);

    const handleSubmit = () => {

        setPopup(false);
        addDoc(chatsCollectionRef, {
            ...form, createdAt: serverTimestamp()
        });
        // console.log("submitted");

        const updateOBJ = {
            name: form.taggeduser,
            email: form.taggedusermail,
            count: form.taggedusercount + 1,
            socialaccount: form.taggeduserprofile,
            photourl: form.taggeduserphoto,
        }
        setDoc(doc(db, 'users', form.taggeduserid), updateOBJ)
        resetForm();
    }

    useEffect(() => {
        if (search === "") {
            setList(userlist);
        }
        else {
            const newlist = userlist.filter((user) => {
                return (user.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
            })
            setList(newlist)
        }
    }, [search])

    const resetForm = () => {
        setForm({
            text: "",
            usermail: email,
            taggeduserid: "",
            taggeduser: "",
            taggedusermail: "",
            taggeduserprofile: "",
            taggedusercount: 0,
            taggeduserphoto: "",
        });
    };

    return (
        <>
            <div class="userlist-background">
                <div className="scroll-respect pb-5">
                    {/* </div> */}
                    <div className='text-white userlist-heading my-4 flexy'>
                        Userlist
                    </div>
                    <div class="input-container flexy my-4 px-3">
                        <input
                            type="text"
                            name="Name"
                            placeholder="Search People ... "
                            class="search_user_input form-control ps-4 text-white"
                            onChange={(event) => { setSearch(event.target.value) }}
                            value={search}
                        />
                    </div>

                    <div className="userlistcontainer">
                        <div className="row mx-0">
                            {/* <div className="col col-12 px-2 flexy">
                            <div class="contacts smaller-block d-flex align-items-center justify-content-between">
                                <div class="userlist-profile-pic">
                                </div>
                                <div className='text-white'>
                                    NAMEUFIDJKNVDFVKJ
                                </div>
                                <a href="social_media.com" target='_blank' class="text-white button ui bg-valentine userlist-profile-button">Profile</a>
                            </div>
                        </div> */}
                            {
                                list.length === 0 ? <>
                                    <div className='col col-12 mt-4 p-3 text-white flexy'>
                                        <div className="profile_card py-1 px-3 flexy mt-4">
                                            Sorry this user is not present ; Search something else
                                        </div>
                                    </div>
                                </> :
                                    list.map((user, index) => {
                                        return (
                                            <>
                                                <div key={index}
                                                    className="col mt-4 col-12 py-3 px-1 flexy">
                                                    <>
                                                        <div
                                                            onClick={(event) => {
                                                                if (user.email !== email) {
                                                                    const clist = event.target.classList
                                                                    // console.log(event.target.classList)
                                                                    // console.log(clist[0])
                                                                    // ((event.target.classList.includes('button')) ?
                                                                        setPopup(!clist.contains('button'))
                                                                    // :
                                                                        // setPopup(true))
                                                                    
                                                                    setForm({
                                                                        ...form, taggeduserid: user.id,
                                                                        taggeduser: user.name,
                                                                        taggedusermail: user.email,
                                                                        taggeduserprofile: user.socialaccount,
                                                                        taggedusercount: user.count,
                                                                        taggeduserphoto: user.photourl,
                                                                    });
                                                                }
                                                            }}
                                                            className='profile_card py-1 px-2 row mx-0'>
                                                            <div className='flexy col col-4'>
                                                                <a href={user.socialaccount} onClick={(event) => { 
                                                                    // console.log(event); 
                                                                    setPopup(false) 
                                                                }} target="_blank" className="button ui mouserat text-white bg-valentine mx-0 profile_card_button">Profile</a>
                                                            </div>
                                                            <div className='flexy text-center text-white leaderboard-text col-6'>{user.name}</div>
                                                            <div className='flexy col col-2'>
                                                                <img src={user.photourl} alt="profile pic" className='userlist-profile-pic' />
                                                            </div>
                                                        </div>
                                                    </>
                                                </div>
                                            </>
                                        )
                                    })
                            }
                        </div>
                    </div>


                    {popup && (
                        <div className="popup">
                            <div className="popup-inner bg-color60 p-4">
                                <h1 className="text-white">Send Your Dil ki Baat</h1>
                                <form
                                    onSubmit={(event) => {
                                        event.preventDefault();
                                    }}
                                >
                                    <div className="form-group mb-3">
                                        <label className="text-white mb-2">Text</label>
                                        <textarea
                                            className="form-control bg-dark text-white"
                                            type="text"
                                            placeholder="Enter your secret ..."
                                            value={form.title}
                                            onChange={(event) => {
                                                setForm({ ...form, text: event.target.value });
                                            }}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        {form.text === "" ?
                                            <button
                                                disabled
                                                onClick={() => {
                                                    handleSubmit();
                                                }}
                                                className="ui button text-white bg-valentine round-corner mx-0"
                                            >
                                                Send
                                            </button> : <button
                                                onClick={() => {
                                                    handleSubmit();
                                                }}
                                                className="ui button text-white bg-valentine round-corner mx-0"
                                            >
                                                Send
                                            </button>}
                                        <button
                                            onClick={() => {
                                                resetForm();
                                                setPopup(false);
                                            }}
                                            className="button mx-0 ui bg-light text-valentine round-corner"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}

export default NewUserlist