import React from 'react'
import '../styles/newhome.css'
import cupid from '../images/cupid.jpg'
// import newheart from '../images/newheart.png'
import img1 from '../images/img1.svg'
import img2 from '../images/img2.svg'
import img3 from '../images/img3.svg'
import img4 from '../images/img4.svg'
import img5 from '../images/img5.svg'

const NewHome = () => {
    return (
        <>
        <div className='background-div'>

            <div class="Heading" >CUPIDIFY</div>
            <img src={cupid} class="cupid" alt="network-issue" />
            <img src={img2} class="back_img_2" alt="network-issue" />
            <img src={img3} class="back_img_3" alt="network-issue" />
            {/* <img src={img5} class="back_img_4" alt="network-issue" /> */}
            <img src={img4} class="heart" alt="network-issue" />
            <div class="quote">
                HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO
                <br />
                HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO
            </div>
        </div>
        </>
    )
}

export default NewHome
