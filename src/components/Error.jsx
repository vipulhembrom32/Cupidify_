import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/error.css'
const Error = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="err-page flexy">
                <div>
                    <div className="flexy text-valentine error-page-text">404 Error Page</div>
                    <div className="flexy text-valentine error-page-text mb-4">Sorry this page doesn't exist</div>
                    <div className="flexy">
                        <button
                            className="button ui bg-valentine text-white"
                            onClick={() =>
                                navigate("/")
                            }
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error