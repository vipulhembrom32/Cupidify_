import React from 'react'
import { useState, useEffect } from 'react'
import cupid from '../images/cupid.jpg'
import img1 from '../images/img1.svg'
import img2 from '../images/img2.svg'
import img3 from '../images/img3.svg'
import img4 from '../images/img4.svg'
import img5 from '../images/img5.svg'
import img6 from '../images/img6.svg'
import img7 from '../images/img7.svg'
import GlassTilt from './GlassTilt'
import '../styles/customhome.css'

const CustomHome = () => {
    const url = [img1, img2, img3, img4, img5, img6, img7];
    const [x, setX] = useState(0);
    // const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {
            setX((x + 1) % 4);
        }, 3000);
        // clearing interval
        return () => clearInterval(timer);
    });
    return (
        <>
            <div className='custom-home-page'>
                <div className='mb-5 d-flex justify-content-sm-center justify-content-start align-items-center custom-home-heading'>
                    <div className='cinzel custom-home-heading-text me-1 ms-0'>Cupidi&Phi;</div>
                    <div>
                        <img className='cupidimg' src={cupid} alt="" />
                    </div>
                </div>
                <div className="custom-home-content row mx-0">
                    <div className="col text-white col-md-6 col-12 px-2 text-center d-flex align-items-center justify-content-center lss custom-home-content-text fatface">
                        Our UI is hotter than your ex <br /> Now try to impress your next
                    </div>
                    <div className="col col-md-6 col-12 flexy px-0">
                        <img className='skipping-images' src={url[x]} alt="lovely-images" />
                    </div>
                </div>



                <div className="glass-features my-5 flexy">
                    <div className="about-width">
                        <div className="fatface-heading fatface text-white text-md-start text-center mt-4 mb-5">
                            Main Features
                        </div>
                        <div className="row mx-0">
                            <div className="col col-lg-4 col-12 flexy">
                                <GlassTilt
                                    number="01"
                                    title="Send Texts"
                                    desc="Recognize your crush in the crowd and express your love in the chat section"
                                />
                            </div>
                            <div className="col col-lg-4 col-12 flexy">
                                <GlassTilt
                                    number="02"
                                    title="Guaranteed Partner"
                                    desc="Isko use krliya toh love life jhingalala ."
                                />
                            </div>
                            <div className="col col-lg-4 col-12 flexy">
                                <GlassTilt
                                    number="03"
                                    title="LeaderBoard"
                                    desc="See your demand in the leaderboard and make your partner insecure"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-dark text-valentine flexy">
                    <div className="about-width">
                        <div className="fatface-heading fatface text-white text-md-start text-center mt-5 mb-5">
                            FAQs (&nbsp;<del>Joxx</del>&nbsp;)
                        </div>

                        <div className="about-feature-desc mb-4">
                            <div className="faq mb-2 text-secondary">
                                Other pages are not opening ; How will I use ??
                            </div>
                            <div className="faq-answer">
                                You are requested to sign-up to avail all features of the website
                            </div>
                        </div>
                        <div className="about-feature-desc mb-4">
                            <div className="faq mb-2 text-secondary">
                                Increase Count Feature
                            </div>
                            <div className="faq-answer">
                                Open Userlist : Tap any user's profile-card a messaging area will appear . Write your message , it will appear as tagged message in the chat and the leaderboard will also increase his count
                            </div>
                        </div>
                        <div className="about-feature-desc mb-4">
                            <div className="faq mb-2 text-secondary">
                                What is this Profile button ? Does it work ??
                            </div>
                            <div className="faq-answer">
                                Yep !! It works perfectly fine as long as the guy hasn't done a mischief
                            </div>
                        </div>
                        <div className="about-feature-desc mb-4">
                            <div className="faq mb-2 text-secondary">
                                Can i spam my crush's name ??
                            </div>
                            <div className="faq-answer">
                                Ummm !! You definately can but we won't recommend that .
                            </div>
                        </div>
                        <div className="about-feature-desc mb-4">
                            <div className="faq mb-2 text-secondary">
                                Why should i share my Fb link /Insta id ??
                            </div>
                            <div className="faq-answer">
                                Come On Guys !! We are not asking for Bank-PIN code
                            </div>
                        </div>
                        <div className="about-feature-desc mb-4">
                            <div className="faq mb-2 text-secondary">
                                Why are some text differnt in colour in chat section
                            </div>
                            <div className="faq-answer">
                                <del>
                                    Because they are mutant texts.
                                </del>
                                &nbsp;&nbsp;They are tagged users !! Click on them & BOOM !! their profiles open
                            </div>
                        </div>
                        <div className="about-feature-desc mb-4">
                            <div className="faq mb-2 text-secondary">
                                Why Cupidify💘 and not Tinder ??
                            </div>
                            <div className="faq-answer">
                                <del>
                                    Because 9 out of 10 doctors ka yahi manna hai.
                                </del>
                                &nbsp;&nbsp;Because you deserve better .
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer flexy mt-5 px-3">
                    <div>
                        <div className="text-center newsletter-text my-3">
                            For regular updated news subscribe to our newsletter
                        </div>
                        <div className="d-flex justify-content-between">
                            <input
                                type="email"
                                placeholder="Enter mail Id .... "
                                className="form-control bg-dark text-white subscribe-input"
                            />
                            <button className="ui ms-4 me-0 button bg-valentine text-white mouse-rat">
                                Button Under Construction
                            </button>
                        </div>
                    </div>
                </div>

                <div className="footer flexy">
                    <div>
                        <div className="footer-icons flexy">
                            <div>

                                <i class="fab fa-twitter fa-2x me-4" />
                                <i class="fab fa-facebook fa-2x me-4" />
                                <i class="fab fa-instagram fa-2x me-4" />
                                <i class="fas fa-envelope-open-text fa-2x" />
                            </div>
                        </div>
                        <div className="mt-3">
                            © Copyright 2022 Cupidify | <a target="_blank" href="https://www.codechef.com/teams/view/valtyrk_123">Team Valtryek</a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default CustomHome