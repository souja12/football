import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const PAGE_SIZE = 6; // Number of videos to fetch per page

const Highlights = () => {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreVideos, setHasMoreVideos] = useState(true);
    const [selectedCompetition, setSelectedCompetition] = useState('');
    const [competitionOptions, setCompetitionOptions] = useState([]);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = () => {
        setIsLoading(true);
        const startIndex = (currentPage - 1) * PAGE_SIZE;
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
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handleCompetitionChange = e => {
        setSelectedCompetition(e.target.value);
        setCurrentPage(1);
        setVideos([]);
    };

    useEffect(() => {
        setVideos([]); // Reset videos when selectedCompetition changes
        setCurrentPage(1);
        setHasMoreVideos(true);
        fetchVideos();
    }, [selectedCompetition]);

    const displayedVideos = videos.filter(
        video =>
            !selectedCompetition || video.competition === selectedCompetition
    ).slice(0, currentPage * PAGE_SIZE);

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
                                        <Link to="/matches" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Matches</a></li></Link>
                                        <Link to="/players" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Players</a></li></Link>
                                        <Link to="/news" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">News</a></li></Link>
                                        <Link to="/highlights" style={{ color: 'white', width: 'calc(100% / 5)' }}><li className="active" style={{ listStyle: 'none' }}><a className="nav-link">Highlights</a></li></Link>
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

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <h3>Filter By Competitions</h3>
            <select value={selectedCompetition} onChange={handleCompetitionChange}>
                <option value="">All Competitions</option>
                {competitionOptions.map(competition => (
                    <option key={competition} value={competition}>
                        {competition}
                    </option>
                ))}
            </select>
            <br />
            <br />
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between'
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
                    <button
                        onClick={handleLoadMore}
                        style={{
                            padding: '10px 20px',
                            borderRadius: '4px',
                            border: 'none',
                            background: '#007bff',
                            color: '#fff',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        Load More
                    </button>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Highlights;
