import React from 'react'
import '../styles/navbar.css'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Navbar = (props) => {
    
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link exact to="/" className="navbar-brand py-2">
                        Cupidify 💘
                    </Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <NavLink
                                activeclassname="active"
                                className="nav-link ms-1"
                                exact to="/" >
                                Home
                            </NavLink>
                            <NavLink
                                activeclassname="active"
                                className="nav-link ms-1"
                                exact to="/chat" >
                                Chat
                            </NavLink>
                            <NavLink
                                activeclassname="active"
                                className="nav-link ms-1"
                                exact to="/leaderboard" >
                                Leaderboard
                            </NavLink>
                            <NavLink
                                activeclassname="active"
                                className="nav-link ms-1"
                                exact to="/users" >
                                UserList
                            </NavLink>
                            {props.user === true ?
                                <div
                                    activeclassname="active"
                                    className="nav-link ms-1 logout-link"
                                    onClick={() => { logout() }}
                                // exact to="/signin" 
                                >
                                    Logout
                                </div> : <>
                                    <NavLink
                                        activeclassname="active"
                                        className="nav-link ms-1"
                                        exact to="/signin">
                                        SignIn
                                    </NavLink>
                                    <NavLink
                                        activeclassname="active"
                                        className="nav-link ms-1"
                                        exact to="/signup">
                                        SignUp
                                    </NavLink>
                                </>
                            }

                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar