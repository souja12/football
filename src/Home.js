import React from 'react'
import './App.css';
//import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Row, Col } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';


const PAGE_SIZE = 3

const Home = () => {
    const [match, setMatch] = useState(null);
    const API_KEY = 'e1b28aeb564f4851abae6d5ecaa29beb'; // Replace with your API key
    // Get the current date
    let currentDate = new Date();
    // Calculate the start date (5 days before today)
    let startDate = new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    // Calculate the end date (5 days after today)
    let endDate = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    // Construct the API request URL
    let URL = `http://localhost:3001/http://api.football-data.org/v4/matches?competitions=CL,PD,PL,BL1,SA,FL1&dateFrom=${startDate}&dateTo=${endDate}`;

    useEffect(() => {
        fetch(URL, {
            method: 'GET',
            headers: {
                'X-Auth-Token': API_KEY,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                const matches = data.matches;
                if (matches.length > 0) {
                    const match = matches[0];
                    const utcDate = new Date(match.utcDate);
                    const indianDate = utcDate.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    });
                    match.indianDate = indianDate;
                    setMatch(match);
                }
            })
            .catch(error => console.error(error));
    }, []);


    //for news api calling 

    const [newsData, setNewsData] = useState([]);
    const API_KEYY = '6d80ae95-4398-420d-870b-ad0c8f0f6b84';
    const currentPage = 1;

    const fetchNewsData = async () => {
        try {
            const response = await fetch(
                `https://content.guardianapis.com/search?api-key=${API_KEYY}&q=football&section=football&tag=football/football&show-fields=all&order-by=newest&lang=en&edition=uk,fr,de,es,it&page=${currentPage}`
            );
            const data = await response.json();
            const results = data.response.results.slice(0, 3); // Retrieve only the first three results
            setNewsData(results);
        } catch (error) {
            console.log('Error fetching news data:', error);
        }
    };

    useEffect(() => {
        fetchNewsData();
    }, []);
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    console.log(newsData);

    //for next match
    const [nextMatch, setNextMatch] = useState(null);
    const API_KEYYY = 'e1b28aeb564f4851abae6d5ecaa29beb'; // Replace with your API key
    let currentDatee = new Date();
    let startDatee = new Date(currentDatee.getTime() - 0 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    let endDatee = new Date(currentDatee.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    let URLL = `http://localhost:3002/http://api.football-data.org/v4/matches?competitions=CL,PD,PL,BL1,SA,FL1&dateFrom=${startDatee}&dateTo=${endDatee}`;

    useEffect(() => {
        fetchNextMatch();
    }, []);

    const fetchNextMatch = () => {
        fetch(URLL, {
            method: 'GET',
            headers: {
                'X-Auth-Token': API_KEYYY,
                'Content-Type': 'application/json'
            },
            mode: 'cors'
        })
            .then(response => response.json())
            .then(data => {
                const matches = data.matches;
                if (matches.length > 0) {
                    const nextMatch = matches[0];
                    const utcDate = new Date(nextMatch.utcDate);
                    const indianDate = utcDate.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    });
                    nextMatch.indianDate = indianDate;
                    setNextMatch(nextMatch);
                }
            })
            .catch(error => console.error(error));
    };

    //for video slider 
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPagee, setCurrentPagee] = useState(1);
    const [hasMoreVideos, setHasMoreVideos] = useState(true);
    const [selectedCompetition, setSelectedCompetition] = useState('');
    const [competitionOptions, setCompetitionOptions] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = () => {
        setIsLoading(true);
        const startIndex = (currentPagee - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;

        fetch(
            `https://www.scorebat.com/video-api/v3/feed/?token=ODg2ODZfMTY4NDc0MjEyNl84MTVhNzk1MDBjN2RkYjk4MDU1ODhiZjk5MzUyZWFjOTUwOTYxZjJm&page=${currentPage}&limit=${PAGE_SIZE}`
        )
            .then(response => response.json())
            .then(data => {
                const allVideos = data.response.map(video => {
                    const videoUrl = video.videos[0].embed.match(/src='([^']+)'/)[1];
                    const date = new Date(video.date);
                    const formattedDate = `${date.getDate()} ${getMonthName(
                        date.getMonth()
                    )} ${date.getFullYear()} ${formatTime(
                        date.getHours(),
                        date.getMinutes()
                    )}`;
                    return { ...video, videoUrl, formattedDate };
                });

                setVideos(prevVideos => [...prevVideos, ...allVideos]);
                setIsLoading(false);

                if (allVideos.length < PAGE_SIZE) {
                    setHasMoreVideos(false);
                }

                const uniqueCompetitions = Array.from(
                    new Set(allVideos.map(video => video.competition))
                );
                setCompetitionOptions(uniqueCompetitions);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    };

    const getMonthName = monthIndex => {
        const monthNames = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        return monthNames[monthIndex];
    };

    const formatTime = (hours, minutes) => {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = minutes.toString().padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${ampm}`;
    };

    const handleLoadMore = () => {
        setCurrentPagee(prevPage => prevPage + 1);
    };

    const handleCompetitionChange = e => {
        setSelectedCompetition(e.target.value);
        setCurrentPagee(1);
        setVideos([]);
    };

    useEffect(() => {
        setVideos([]); // Reset videos when selectedCompetition changes
        setCurrentPagee(1);
        setHasMoreVideos(true);
        fetchVideos();
    }, [selectedCompetition]);

    const displayedVideos = videos.filter(
        video =>
            !selectedCompetition || video.competition === selectedCompetition
    ).slice(0, currentPagee * PAGE_SIZE);

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
                                        <Link to="/matches" style={{ color: 'white', width: 'calc(100% / 5)' }}><li className="active" style={{ listStyle: 'none' }}><a className="nav-link">Home</a></li></Link>
                                        <Link to="/matches" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Matches</a></li></Link>
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
                                <h1 className="text-white">World Cup Event</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, molestias repudiandae pariatur.</p>
                                <div id="date-countdown"></div>
                                <p>
                                    <Link to="/matches" style={{ color: 'white' }}><a style={{ backgroundColor: '#ee1e46', border: '1px solid #ee1e46' }} className="btn btn-primary py-3 px-4 mr-3">All Matches</a></Link>
                                    <a className="more light">Learn More</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>




                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            {match && (
                                <div className="d-flex team-vs">
                                    <span className="score">{match.score.fullTime.home}-{match.score.fullTime.away}</span>
                                    <div className="team-1 w-50">
                                        <div className="team-details w-100 text-center">
                                            <img src={match.homeTeam.crest} alt="Image" className="img-fluid" />
                                            <h3>{match.homeTeam.name}</h3>
                                            <ul className="list-unstyled">
                                                {match?.homeTeamEvents?.map((event, index) => (
                                                    <li key={index}>{event.player.name} ({event.minute})</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="team-2 w-50">
                                        <div className="team-details w-100 text-center">
                                            <img src={match.awayTeam.crest} alt="Image" className="img-fluid" />
                                            <h3>{match.awayTeam.name}</h3>
                                            <ul className="list-unstyled">
                                                {match?.awayTeamEvents?.map((event, index) => (
                                                    <li key={index}>{event.player.name} ({event.minute})</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="latest-news">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 title-section">
                                <h2 className="heading">Latest News</h2>
                            </div>
                        </div>
                        <div className="row no-gutters">
                            {newsData.map((news, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="post-entry">
                                        <a href="#">
                                            <img src={news.fields.thumbnail} alt="Image" className="img-fluid" />
                                        </a>
                                        <div className="caption">
                                            <div className="caption-inner">
                                                <h3 className="mb-3">{news.webTitle}</h3>
                                                <div className="author d-flex align-items-center">
                                                    <div className="img mb-2 mr-3">
                                                        <img src="images/person_1.jpg" alt="" />
                                                    </div>
                                                    <div className="text">
                                                        <h4>{news.fields.byline}</h4>
                                                        <span>{formatDate(news.webPublicationDate)} | Sports</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div class="site-section bg-dark">
                    <div class="container">
                        <div class="row">
                            <div className="col-lg-6">
                                <div className="widget-next-match">
                                    <div className="widget-title">
                                        <h3>Next Match</h3>
                                    </div>
                                    <div className="widget-body mb-3">
                                        <div className="widget-vs">
                                            {nextMatch ? (
                                                <div className="d-flex align-items-center justify-content-around justify-content-between w-100">
                                                    <div className="team-1 text-center">
                                                        <img src={nextMatch.homeTeam.crest} alt="Image" />
                                                        <h3>{nextMatch.homeTeam.name}</h3>
                                                    </div>
                                                    <div>
                                                        <span className="vs"><span>VS</span></span>
                                                    </div>
                                                    <div className="team-2 text-center">
                                                        <img src={nextMatch.awayTeam.crest} alt="Image" />
                                                        <h3>{nextMatch.awayTeam.name}</h3>
                                                    </div>
                                                </div>
                                            ) : (
                                                <p>Loading next match...</p>
                                            )}
                                        </div>
                                    </div>
                                    {nextMatch && (
                                        <div className="text-center widget-vs-contents mb-4">
                                            <h4>{nextMatch.competition.name}</h4>
                                            <p className="mb-5">
                                                <span className="d-block">{nextMatch.indianDate}</span>

                                                <strong className="text-primary">{nextMatch.venue}</strong>
                                            </p>
                                            <div id="date-countdown2" className="pb-1"></div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="widget-next-match">
                                    <table class="table custom-table">
                                        <thead>
                                            <tr>
                                                <th>P</th>
                                                <th>Team</th>
                                                <th>W</th>
                                                <th>D</th>
                                                <th>L</th>
                                                <th>PTS</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><strong class="text-white">Football League</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td><strong class="text-white">Soccer</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td><strong class="text-white">Juvendo</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td><strong class="text-white">French Football League</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td><strong class="text-white">Legia Abante</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                            <tr>
                                                <td>6</td>
                                                <td><strong class="text-white">Gliwice League</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                            <tr>
                                                <td>7</td>
                                                <td><strong class="text-white">Cornika</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                            <tr>
                                                <td>8</td>
                                                <td><strong class="text-white">Gravity Smash</strong></td>
                                                <td>22</td>
                                                <td>3</td>
                                                <td>2</td>
                                                <td>140</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-12 title-section">
                            <h2 className="heading">Videos</h2>
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {displayedVideos.map((video, index) => (
                        <div
                            key={video.title}
                            style={{
                                width: 'calc(50% - 20px)',
                                marginBottom: '20px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                padding: '20px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <h2 style={{ marginBottom: '10px' }}>{video.title}</h2>
                            <p style={{ marginBottom: '5px' }}>{video.competition}</p>
                            <p style={{ marginBottom: '5px' }}>{video.formattedDate}</p>
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '0',
                                    paddingBottom: '56.25%',
                                    marginBottom: '10px'
                                }}
                            >
                                <iframe
                                    src={video.videoUrl}
                                    title={video.title}
                                    allowFullScreen
                                    allow="autoplay; fullscreen"
                                    style={{
                                        position: 'absolute',
                                        top: '0',
                                        left: '0',
                                        width: '100%',
                                        height: '100%',
                                        border: 'none',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        borderRadius: '4px'
                                    }}
                                ></iframe>
                            </div>
                        </div>
                    ))}
                    {isLoading && <p>Loading...</p>}
                    {!isLoading && hasMoreVideos && (
                        <Link to='/highlights'>
                            <button
                                style={{
                                    padding: '10px 20px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    background: '#007bff',
                                    color: '#fff',
                                    cursor: 'pointer',
                                    width: '100%',
                                    height: '17%',
                                    marginTop: '120%'
                                }}
                            >
                                See More
                            </button>
                        </Link>
                    )}
                </div>

                {/* <div class="container site-section">
                    <div class="row">
                        <div class="col-6 title-section">
                            <h2 class="heading">Our Blog</h2>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="custom-media d-flex">
                                <div class="img mr-4">
                                    <img src="images/img_1.jpg" alt="Image" class="img-fluid" />
                                </div>
                                <div class="text">
                                    <span class="meta">May 20, 2020</span>
                                    <h3 class="mb-4"><a href="#">Romolu to stay at Real Nadrid?</a></h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.</p>
                                    <p><a href="#">Read more</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="custom-media d-flex">
                                <div class="img mr-4">
                                    <img src="images/img_3.jpg" alt="Image" class="img-fluid" />
                                </div>
                                <div class="text">
                                    <span class="meta">May 20, 2020</span>
                                    <h3 class="mb-4"><a href="#">Romolu to stay at Real Nadrid?</a></h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus deserunt saepe tempora dolorem.</p>
                                    <p><a href="#">Read more</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}



                <footer className="footer-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="widget mb-3">
                                    <h3>News</h3>
                                    <ul className="list-unstyled links">
                                        <li>All</li>
                                        <li>Club News</li>
                                        <li>Media Center</li>
                                        <li>Video</li>
                                        <li>RSS</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="widget mb-3">
                                    <h3>Tickets</h3>
                                    <ul className="list-unstyled links">
                                        <li>Online Ticket</li>
                                        <li>Payment and Prices</li>
                                        <li>Contact &amp; Booking</li>
                                        <li>Tickets</li>
                                        <li>Coupon</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="widget mb-3">
                                    <h3>Matches</h3>
                                    <ul className="list-unstyled links">
                                        <li>Standings</li>
                                        <li>World Cup</li>
                                        <li>La Lega</li>
                                        <li>Hyper Cup</li>
                                        <li>World League</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="widget mb-3">
                                    <h3>Social</h3>
                                    <ul className="list-unstyled links">
                                        <li>Twitter</li>
                                        <li>Facebook</li>
                                        <li>Instagram</li>
                                        <li>Youtube</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row text-center">
                            <div className="col-md-12">
                                <div className="pt-5">
                                    <p>
                                        {' '}
                                        &copy;
                                        <script>{`document.write(new Date().getFullYear());`}</script> All rights reserved | This template is
                                        made with <i className="icon-heart" aria-hidden="true"></i> by{' '}
                                        <span>Colorlib</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>

            </div>
        </div>
    )
}

export default Home
