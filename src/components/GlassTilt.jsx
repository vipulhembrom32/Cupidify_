import React from 'react'
import Tilt from 'react-vanilla-tilt'
import '../styles/glasstilt.css'

const GlassTilt = (props) => {
    return (
        <>
            <Tilt className="features-card text-valentine p-3">
                <div className="feature-num d-flex justify-content-end">{props.number}</div>
                <div className="feature-title text-center mb-3">{props.title}</div>
                <div className="about-feature-desc text-center text-white">
                {props.desc}
                </div>
            </Tilt>
        </>
    )
}

export default GlassTilt
