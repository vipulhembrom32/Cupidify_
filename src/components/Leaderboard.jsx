import React from 'react';
import { db } from "../firebase.config";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "../styles/leaderboard.css";


const Leaderboard = () => {
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
            <div className="page-bg text-white">
                <h1 className="py-3 flexy">LeaderBoard</h1>
                <div className="table-container d-flex justify-content-center px-2">
                    <table className="table text-white my-2 px-2">
                        <tr>
                            <th></th>
                            <th className="text-center py-2">Name</th>
                            <th className="text-center py-2">Count</th>
                            <th className="text-center py-2">Profile Link</th>
                        </tr>
                        {userlist.map((user, index) => {
                            return (
                                <tr>
                                    <td className="text-center">
                                        <img src={user.photourl} alt="profile pic" className='leaderboard-profile-pic' />

                                    </td>
                                    <td className='text-center'>
                                        {user.name}
                                    </td>
                                    <td className="text-center">
                                        {user.count}<i className="heart icon text-valentine" />
                                    </td>
                                    <td className="text-center">
                                        <a className='text-white mx-0 button ui bg-valentine'
                                            target='_blank' 
                                            href={user.socialaccount}>
                                            Profile
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </table>
                </div>
            </div>
        </>
    );
};

export default Leaderboard;
