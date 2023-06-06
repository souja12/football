import React, { useState, useEffect } from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';



const API_KEY = '6d80ae95-4398-420d-870b-ad0c8f0f6b84'; // Replace with your actual API key

function NewsComponent() {
    const [newsData, setNewsData] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // useEffect hook will handle the API call
    useEffect(() => {
        fetchNewsData();
    }, [currentPage]);

    // Function to fetch news data from the API
    const fetchNewsData = async () => {
        try {
            const response = await fetch(
                `https://content.guardianapis.com/search?api-key=${API_KEY}&q=football&section=football&tag=football/football&show-fields=all&order-by=newest&lang=en&edition=uk,fr,de,es,it&page=${currentPage}`
            );
            const data = await response.json();
            const results = data.response.results;
            setNewsData((prevNewsData) => [...prevNewsData, ...results]);
        } catch (error) {
            console.log('Error fetching news data:', error);
        }
    };

    // Function to handle "Read More" button click
    const handleReadMore = (newsItem) => {
        setSelectedNews(newsItem);
    };

    // Function to close the popup
    const handleClosePopup = () => {
        setSelectedNews(null);
    };

    // Function to handle "Load More" button click
    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
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
                                        <Link to="/matches" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Matches</a></li></Link>
                                        <Link to="/players" style={{ color: 'white', width: 'calc(100% / 5)' }}><li style={{ listStyle: 'none' }}><a className="nav-link">Players</a></li></Link>
                                        <Link to="/news" style={{ color: 'white', width: 'calc(100% / 5)' }}><li className="active" style={{ listStyle: 'none' }}><a className="nav-link">News</a></li></Link>
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
                                <h1 className="text-white">Get All Football News</h1>
                                <p>Get all football news controversy transfer market interviews and many more</p>
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
            <br />
            <div style={styles.newsContainer}>
                {newsData.map((newsItem) => (
                    <div key={newsItem.id} style={styles.newsCard}>
                        {newsItem.fields.thumbnail && (
                            <img
                                src={newsItem.fields.thumbnail}
                                alt={newsItem.webTitle}
                                style={styles.thumbnail}
                            />
                        )}
                        <div style={styles.contentContainer}>
                            <h2 style={styles.title}>{newsItem.webTitle}</h2>
                            <p style={styles.description}>{newsItem.fields.trailText}</p>
                        </div>
                        <button onClick={() => handleReadMore(newsItem)} style={styles.readMoreButton}>
                            Read More
                        </button>
                    </div>
                ))}
                {selectedNews && (
                    <div style={styles.popupContainer}>
                        <div style={styles.popupContent}>
                            <div style={styles.popupHeader}>
                                <h2 style={styles.popupTitle}>{selectedNews.webTitle}</h2>
                                <button onClick={handleClosePopup} style={styles.closeButton}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#333"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        style={styles.closeIcon}
                                    >
                                        <path d="M18 6L6 18M6 6l12 12"></path>
                                    </svg>
                                </button>


                            </div>
                            {selectedNews.fields.thumbnail && (
                                <img
                                    src={selectedNews.fields.thumbnail}
                                    alt={selectedNews.webTitle}
                                    style={styles.popupThumbnail}
                                />
                            )}
                            <p style={styles.popupBodyText}>{selectedNews.fields.bodyText}</p>
                        </div>
                    </div>
                )}
            </div>
            {currentPage < 5 && (
                <div style={styles.loadMoreContainer}>
                    <button onClick={handleLoadMore} style={styles.loadMoreButton}>
                        Load More
                    </button>
                </div>
            )}
            <br />
        </div>
    );
}

const styles = {
    newsContainer: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '16px',
        marginBottom: '16px',
    },
    newsCard: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    thumbnail: {
        width: '100%',
        marginBottom: '8px',
        borderRadius: '4px',
    },
    contentContainer: {
        flex: '1',
    },
    title: {
        fontSize: '20px',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#333',
    },
    description: {
        fontSize: '16px',
        marginBottom: '8px',
        color: '#666',
    },
    readMoreButton: {
        border: 'none',
        background: '#1e88e5',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
        alignSelf: 'flex-end',
    },
    popupContainer: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: '999',
    },
    popupContent: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        maxWidth: '80%',
        maxHeight: '80%',
        overflow: 'auto',
    },
    popupHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    popupTitle: {
        fontSize: '24px',
        marginBottom: '8px',
        fontWeight: '600',
        color: '#333',
    },
    popupThumbnail: {
        width: '90%',
        height: '50%',
        objectFit: 'cover',
        borderRadius: '4px',
    },
    popupBodyText: {
        fontSize: '16px',
        marginBottom: '8px',
        color: '#666',
    },
    closeButton: {
        border: 'none',
        background: 'none',
        fontSize: '24px',
        color: '#333',
        cursor: 'pointer',
        alignSelf: 'flex-end',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        transition: 'background-color 0.3s',
    },

    closeIcon: {
        width: '20px',
        height: '20px',
    },

    loadMoreContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '16px',
    },
    loadMoreButton: {
        border: 'none',
        background: '#1e88e5',
        color: '#fff',
        padding: '8px 16px',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default NewsComponent;
