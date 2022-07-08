import React from 'react'
import '../styles/newleaderboard.css'
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

const NewLeaderboard = () => {
    const [userlist, setUserlist] = useState([]);

    const chatCollectionRef = collection(db, "users");
    const sortRef = query(chatCollectionRef, orderBy("count", "desc"));
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
        });
    }, []);

    return (
        <>
            <div class="leaderboard-back-image">
                <div className="scroll-respect pb-5">
                    <div class="text-white leaderboard_heading my-4 flexy">
                        <div class="custom_leaderboard_heading flexy pt-2 px-4">
                            LEADERBOARD
                        </div>
                    </div>

                    <div className="userlistcontainer">
                        <div className="row mx-0">
                            {
                                userlist.map((user, index) => {
                                    return (
                                        <>
                                            <div key={index}
                                                className="col mt-4 col-12 py-3 px-1 flexy">
                                                <>
                                                    <div>

                                                        <div className='ps-3 leaderboard-rank mb-1'>
                                                            {index + 1}
                                                        </div>
                                                        <div
                                                            className='profile_card py-1 px-2 row mx-0'>
                                                            {/* d-flex align-content-center justify-content-between  */}
                                                            <div className='flexy col col-4'>
                                                                <a href={user.socialaccount} target="_blank" className="button ui mouserat text-white bg-valentine mx-0 profile_card_button">Profile</a>
                                                            </div>
                                                            <div className="flexy leaderboard-count-text text-white col col-2">
                                                                {user.count}<i className="heart ms-1 icon text-valentine" />

                                                            </div>
                                                            <div className='flexy text-center text-white leaderboard-text col-4'>{user.name}</div>
                                                            <div className='flexy col col-2'>
                                                                <img src={user.photourl} alt="profile pic" className='userlist-profile-pic' />
                                                            </div>
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
                </div>
            </div >

        </>
    )
}

export default NewLeaderboard