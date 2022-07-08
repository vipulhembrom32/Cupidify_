import React from 'react';
import "../styles/chat.css";
import ReactScrollableFeed from 'react-scrollable-feed';
import { db } from "../firebase.config";
import { auth } from '../firebase.config';
import { useState, useEffect } from "react";
import {
    collection,
    onSnapshot,
    // doc,
    addDoc,
    // deleteDoc,
    query,
    serverTimestamp,
    orderBy,
} from "firebase/firestore";
import { useSelector } from 'react-redux';

const Chat = () => {

    const substituteData = useSelector(state => state);
    // const username = substituteData.currentUser;
    // const photourl = substituteData.photourl;
    const email = substituteData.email;

    const [chats, setChats] = useState([]);
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

    const chatsCollectionRef = collection(db, "chats");
    const sortRef = query(chatsCollectionRef, orderBy('createdAt'));
    useEffect(() => {
        onSnapshot(sortRef, (snapshot) => {
            setChats(
                snapshot.docs.map((doc) => {
                    return {
                        id: doc.id,
                        ...doc.data()
                    };
                })
            );
        });

    }, []);

    const submitChat = () => {
        if (form.text) {
            addDoc(chatsCollectionRef, {
                ...form, createdAt: serverTimestamp()
            });
            console.log("submitted");
            setForm({ ...form, text: "" });
        }
    }

    return (
        <>
            <div className='chat-page-bg bg-dark px-lg-5 px-md-4 px-sm-3 px-2'>
            <h2 className="py-3 my-0 flexy text-white">CHit-chAT</h2>
                <div className="chat-section bg-dark">
                    <ReactScrollableFeed className="pe-2">
                        {
                            chats.map((chat, index) => {
                                return (
                                    chat.usermail === email ?
                                        <div key={index} className="d-flex justify-content-end my-4">
                                            <div className='py-2 px-3 chat-own-message text-white bg-valentine'>
                                                {
                                                    chat.taggeduser === "" ? <></> :
                                                        <a href={chat.taggeduserprofile} target="_blank" className="chat-link text-dark">{`@${chat.taggeduser} `}</a>
                                                }
                                                {chat.text}
                                            </div>
                                        </div>
                                        :
                                        <div key={index} className="d-flex justify-content-start my-4">

                                            <div className='py-2 px-3 chat-message bg-light text-dark'>
                                                {
                                                    chat.taggeduser === "" ? <></> :
                                                        <a href={chat.taggeduserprofile} target="_blank" className="chat-link text-valentine">{`@${chat.taggeduser} `}</a>

                                                }
                                                {chat.text}
                                            </div>
                                        </div>
                                )
                            })
                        }
                    </ReactScrollableFeed>
                </div>
                <div className='d-flex type-box justify-content-between mx-lg-5 mx-md-4 mx-sm-3 mx-2'>
                    <input
                        value={form.text}
                        type="text"
                        onChange={(event) => {
                            setForm({ ...form, text: event.target.value });
                        }}
                        onKeyPress={(event)=>{
                            // console.log(event.key)
                            if(event.key==="Enter" && form.text!==""){
                                submitChat();
                            }
                        }}
                        placeholder='Enter your text...'
                        className='mouserat bg-dark form-control text-white chat-input bg-dark me-4'
                    />

                    {form.text === "" ?
                        <button disabled onClick={() => { submitChat() }} className='send-btn mx-0 button ui bg-valentine text-white'>Send</button>
                        :
                        <button onClick={() => { submitChat() }} className='send-btn mx-0 button ui bg-valentine text-white'>Send</button>
                    }
                </div>
            </div>
        </>
    );
};

export default Chat;
