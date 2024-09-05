import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import { useState } from "react";
import videoHomepage from '../../assets/video-homepage.mp4';



const Home = () => {

    return (
        <>
            <video className='videoHome' autoPlay loop muted>
                <source src={videoHomepage} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className='home-content'>
                <div className='main-title'>There's no way better to ask</div>
                <div className='sub-title'>You don't want to make a boring from
                    And your audience won't answer one.
                    Create a typeform instead and make everyone happy.
                </div>
                <div>
                    <button>Get's started. It's free.</button>
                </div>
            </div>
        </>
    );
}

export default Home;
