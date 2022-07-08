import React from 'react'
import '../styles/newnavbar.css'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NewNavbar = (props) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {
        props.toggleUser(false)
        navigate('/')
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <>
            <div class="Hamburger">
                {/* CHECKBOX */}
                <input type="checkbox" class="toggler" />
                {/* ICON */}
                <div class="Hamburger_icon flexy">
                    <div></div>
                </div>
                <div class="hamburger_list">
                    <div>
                        <div>
                            <ul className='px-0'>
                                <li className='d-flex justify-content-center mt-3'>
                                    <NavLink activeclassname='active' exact to="/" className="px-3 pt-2 pb-1 mx-0 button ui nav-hamburger-link">Home</NavLink>
                                </li>
                                <li className='d-flex justify-content-center mt-2'>
                                    <NavLink activeclassname='active' exact to="/users" className="px-3 pt-2 pb-1 mx-0 button ui nav-hamburger-link">Userlist</NavLink>
                                </li>
                                <li className='d-flex justify-content-center mt-2'>
                                    <NavLink activeclassname='active' exact to="/chat" className="px-3 pt-2 pb-1 mx-0 button ui nav-hamburger-link">Chat</NavLink>
                                </li>
                                <li className='d-flex justify-content-center mt-2'>
                                    <NavLink activeclassname='active' exact to="/leaderboard" className="px-3 pt-2 pb-1 mx-0 button ui nav-hamburger-link">Leaderboard</NavLink>
                                </li>

                                {props.user === true ?
                                    <li
                                        activeclassname="active"
                                        className="d-flex justify-content-center mt-2"
                                    // exact to="/signin" 
                                    >
                                        <button
                                            onClick={() => { logout() }}
                                            className='px-3 pt-2 pb-1 mx-0 button ui nav-hamburger-link'>
                                            Logout
                                        </button>
                                    </li> : <>

                                        {/* <li className='d-flex justify-content-center mt-2'>
                                            <NavLink exact to="/signin" activeclassname="active" className="px-3 pt-2 pb-1 mx-0 button ui nav-hamburger-link">SignIn</NavLink>
                                        </li> */}
                                        <li className='d-flex justify-content-center mt-2'>
                                            <NavLink activeclassname="active" exact to="/signup" className="px-3 pt-2 pb-1 mx-0 button ui nav-hamburger-link">SignUp</NavLink>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NewNavbar