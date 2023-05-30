import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Matches.css';
//import './Matchess.css';
import $ from 'jquery';
import Allmatches from './Allmatches';
import Upcomming from './Upcomming';
import { Spinner } from 'spin.js';
import 'spin.js/spin.css';
import CompleteMatches from './complete';
import Footer from './Footer';
import PointsTable from './PointsTable';

const Matches = () => {
    const [matches, setmatches] = useState([]);
    const [activeItem, setActiveItem] = useState('allMatches');
    const [loading, setLoading] = useState(false);


    const API_KEY = 'e1b28aeb564f4851abae6d5ecaa29beb'; // Replace with your API key
    // const URL = 'http://localhost:3001/https://api.football-data.org/v4/competitions/2001/matches?status=FINISHED&limit=15';

    function hu() {
        fetch(URL, {
            method: 'GET',
            headers: {
                'X-Auth-Token': API_KEY,
                'Content-Type': 'application/json'
            },
            mode: 'cors' // Add this line
        })
            .then(response => response.json())
            .then(data => {
                const matches = data.matches.slice(-20);
                setmatches(matches)
            })
            .catch(error => console.error(error));
    }

    console.log(matches);
    useEffect(() => {
        hu()
    }, [])


    useEffect(() => {
        window.scrollTo(1770, 1770); // Scroll to the top of the page when component changes
    }, [activeItem]);



    useEffect(() => {
        const tabsNewAnim = $('#navbar-animmenu');
        const selectorNewAnim = $('#navbar-animmenu').find('li').length;
        const activeItemNewAnim = tabsNewAnim.find('.active');
        const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
        const itemPosNewAnimLeft = activeItemNewAnim.position();
        $(".hori-selector").css({
            "left": itemPosNewAnimLeft.left + "px",
            "width": activeWidthNewAnimWidth + "px"
        });

        $("#navbar-animmenu").on("click", "li", function (e) {
            $('#navbar-animmenu ul li').removeClass("active");
            $(this).addClass('active');
            const activeWidthNewAnimWidth = $(this).innerWidth();
            const itemPosNewAnimLeft = $(this).position();
            $(".hori-selector").css({
                "left": itemPosNewAnimLeft.left + "px",
                "width": activeWidthNewAnimWidth + "px"
            });
        });
    }, []);

    const handleItemClick = (item) => {
        setLoading(true);
        setActiveItem(item);
        setTimeout(() => {
            setLoading(false);
        }, 4000);
    };

    return (
        <div>
            <div class="site-wrap">
                <div class="site-mobile-menu site-navbar-target">
                    <div class="site-mobile-menu-header">
                        <div class="site-mobile-menu-close">
                            <span class="icon-close2 js-menu-toggle"></span>
                        </div>
                    </div>
                    <div class="site-mobile-menu-body"></div>
                </div>


                <header className="site-navbar py-4" role="banner">
                    <div className="container">
                        <div className="d-flex align-items-center">
                            <div className="site-logo">
                                <a href="index.html">
                                    <img src="https://i.ibb.co/rFTrxDL/logo.png" alt="Logo" />
                                </a>
                            </div>
                            <div className="ml-auto">
                                <nav className="site-navigation position-relative text-right" role="navigation">
                                    <ul className="site-menu main-menu js-clone-nav mr-auto">
                                        <Link to="/" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Home</a></li></Link>
                                        <Link to="/matches" style={{ color: 'white', width: 'calc(100% / 5)' }}><li className="active" style={{ listStyle: 'none' }}><a className="nav-link">Matches</a></li></Link>
                                        <Link to="/players" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Players</a></li></Link>
                                        <Link to="/news" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">News</a></li></Link>
                                        <Link to="/highlights" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Highlights</a></li></Link>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="hero overlay" style={{ backgroundImage: "url('https://i.ibb.co/5rhf0LL/bg-3.jpg')" }}>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-5 ml-auto">
                                <h1 className="text-white">UCL And All Match Event</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, molestias repudiandae pariatur.</p>
                                <div id="date-countdown"></div>
                                {/* <p>
                                    <a href="#" className="btn btn-primary py-3 px-4 mr-3">Book Ticket</a>
                                    <a href="#" className="more light">Learn More</a>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>




                <div id="navbar-animmenu">
                    <ul className="show-dropdown main-navbar">
                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>
                        <li className={activeItem === 'allMatches' ? 'active' : ''}>
                            <a href="javascript:void(0);" onClick={() => handleItemClick('allMatches')}>
                                <i className="fas fa-tachometer-alt"></i>
                                <b>All Matches</b>
                            </a>
                        </li>
                        <li className={activeItem === 'upcomingMatches' ? 'active' : ''}>
                            <a href="javascript:void(0);" onClick={() => handleItemClick('upcomingMatches')}>
                                <i className="far fa-address-book"></i>
                                <b>Upcoming Matches</b>
                            </a>
                        </li>
                        <li className={activeItem === 'completeMatches' ? 'active' : ''}>
                            <a href="javascript:void(0);" onClick={() => handleItemClick('completeMatches')}>
                                <i className="far fa-clone"></i>
                                <b>Complete Matches</b>
                            </a>
                        </li>
                        <li className={activeItem === 'pointsTable' ? 'active' : ''}>
                            <a href="javascript:void(0);" onClick={() => handleItemClick('pointsTable')}>
                                <i className="far fa-calendar-alt"></i>
                                <b>Points Table</b>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="component-container">
                    {activeItem === 'allMatches' && <Allmatches />}
                    {activeItem === 'upcomingMatches' && <Upcomming />}
                    {activeItem === 'completeMatches' && <CompleteMatches />}
                    {activeItem === 'pointsTable' && <PointsTable />}
                    {loading && (
                        <div className="loading-overlay">
                            <div className="loading-spinner"></div>
                        </div>
                    )}
                </div>
                {/* <Allmatches /> */}


            </div>
            <br></br>
            <br></br>
            <br></br>
            <Footer />
        </div>
    )
}

export default Matches
