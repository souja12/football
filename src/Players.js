import React from 'react'
// import './Players.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Footer from './Footer.js';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

// ...

const override = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Players = () => {

    const [playerData, setPlayerData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [teamId, setTeamId] = useState('');

    // useEffect(() => {
    //     fetch("https://v3.football.api-sports.io/players?id=276&season=2019", {
    //         method: "GET",
    //         headers: {
    //             "x-rapidapi-host": "v3.football.api-sports.io",
    //             "x-rapidapi-key": "8e0769c4ea6ba7790cec2af92bcf9ad3"
    //         }
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setPlayerData(data.response); // Set the API response to the state
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // }, []);

    const handleSearch = () => {
        setIsLoading(true);
        fetch(`https://v3.football.api-sports.io/players?search=${searchQuery}&season=2021&league=2`, {
            method: 'GET',
            headers: {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': 'c0464fa84b15da7f4a6af68aac2759b2',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.response.length > 0) {
                    const playerId = data.response[0].player.id;
                    fetch(`https://v3.football.api-sports.io/players?id=${playerId}&season=2021`, {
                        method: 'GET',
                        headers: {
                            'x-rapidapi-host': 'v3.football.api-sports.io',
                            'x-rapidapi-key': 'c0464fa84b15da7f4a6af68aac2759b2',
                        },
                    })
                        .then((response) => response.json())
                        .then((playerData) => {
                            setIsLoading(false);
                            setPlayerData(playerData.response[0]);
                        })
                        .catch((err) => {
                            console.log(err);
                            setIsLoading(false);
                        });
                } else {
                    setIsLoading(false);
                    setPlayerData(null);
                }
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
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
                                        <li  style={{ color: 'white', width: 'calc(100% / 5)' }}><a>Home</a></li>
                                        <Link to="/matches" style={{ color: 'white', width: 'calc(100% / 5)' }}><li  style={{ listStyle: 'none' }}><a className="nav-link">Matches</a></li></Link>
                                        <Link to="/players" style={{ color: 'white', width: 'calc(100% / 5)' }}><li className="active" style={{ listStyle: 'none' }}><a className="nav-link">Players</a></li></Link>
                                        <Link to="/news" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">News</a></li></Link>
                                        <Link to="/highlights"  style={{ color: 'white', width: 'calc(100% / 5)' }}><li  style={{ listStyle: 'none' }}><a className="nav-link">Highlights</a></li></Link>
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
            </div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by player name"
                        style={{
                            padding: '15px',
                            fontSize: '18px',
                            border: '2px solid #ccc',
                            borderRadius: '5px',
                            marginRight: '10px',
                            width: '400px',
                        }}
                    />
                    <button
                        onClick={handleSearch}
                        style={{
                            padding: '15px 30px',
                            fontSize: '18px',
                            backgroundColor: '#ee1e46',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        Search
                    </button>
                </div>

                {isLoading ? (
                    <div className="loader-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <ClipLoader color="#ee1e46" css={override} size={50} />
                    </div>

                ) : playerData && playerData.player ? (
                    <div className="player-page">
                        <div className="player-details">
                            <div className="player-image">
                                <img src={playerData?.player?.photo} alt={playerData?.player?.name} />
                            </div>
                            <div className="player-info">
                                <h1>{playerData?.player?.name}</h1>
                                <div className="player-details-row">
                                    <p><strong>Age:</strong> {playerData?.player?.age}</p>
                                    <p><strong>Nationality:</strong> {playerData?.player?.nationality}</p>
                                </div>
                                <div className="player-details-row">
                                    <p><strong>Height:</strong> {playerData?.player?.height}</p>
                                    <p><strong>Weight:</strong> {playerData?.player?.weight}</p>
                                </div>
                            </div>
                        </div>
                        <div className="player-stats">
                            <h2>Statistics</h2>
                            {playerData?.statistics?.map((stats, index) => (
                                <div className="stats-card" key={index}>
                                    <div className="stats-row">
                                        <p><strong>Team:</strong> {stats.team.name}</p>
                                        <p><strong>League:</strong> {stats.league.name}</p>
                                    </div>
                                    <div className="stats-row">
                                        <p><strong>Appearances:</strong> {stats.games.appearences}</p>
                                        <p><strong>Minutes:</strong> {stats.games.minutes}</p>
                                        <p><strong>Goals:</strong> {stats.goals.total}</p>
                                        <p><strong>Assists:</strong> {stats.goals.assists}</p>
                                    </div>
                                    <div className="stats-row">
                                        <p><strong>Yellow Cards:</strong> {stats.cards.yellow}</p>
                                        <p><strong>Red Cards:</strong> {stats.cards.red}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <style>{`
        .player-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        
        .player-details {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }
        
        .player-image img {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 20px;
        }
        
        .player-info h1 {
          font-size: 24px;
          margin-bottom: 10px;
        }
        
        .player-details-row {
          display: flex;
          margin-bottom: 5px;
        }
        
        .player-details-row p {
          margin-right: 10px;
        }
        
        .player-stats {
          width: 100%;
        }
        
        .stats-card {
          background-color: #f4f4f4;
          padding: 10px;
          margin-bottom: 10px;
        }
        
        .stats-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
        
        h2 {
          font-size: 20px;
          text-align: center;
          margin-bottom: 10px;
        }
      `}</style>
                    </div>
                ) : (
                    <div>No player data available.</div>
                )}
            </div>

            <Footer />

        </div>
    )
}

export default Players
