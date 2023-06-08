import React from 'react'
import { useState, useEffect } from 'react';


const Allmatches = () => {
    const [matches, setmatches] = useState([]);
    const [visibleMatches, setVisibleMatches] = useState(10);
    const API_KEY = 'e1b28aeb564f4851abae6d5ecaa29beb'; // Replace with your API key
    // Get the current date
    let currentDate = new Date();

    // Calculate the start date (5 days before today)
    let startDate = new Date(currentDate.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Calculate the end date (5 days after today)
    let endDate = new Date(currentDate.getTime() + 0 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    // Construct the API request URL
    let URL = `http://localhost:3002/http://api.football-data.org/v4/matches?competitions=CL,PD,PL,BL1,SA,FL1&dateFrom=${startDate}&dateTo=${endDate}`;

    //const URL = 'http://localhost:3001/https://api.football-data.org/v4/competitions/2001/matches?status=FINISHED&limit=15';

    useEffect(() => {
        hu()
    }, [])

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
                const matches = data.matches;
                for (let i = 0; i < matches.length; i++) {
                    const utcDate = new Date(matches[i].utcDate);
                    const indianDate = utcDate.toLocaleString('en-IN', {
                        timeZone: 'Asia/Kolkata',
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric'
                    });
                    matches[i].indianDate = indianDate;
                }
                console.log('new', matches);
                setmatches(matches)
            })
            .catch(error => console.error(error));
    }


    // useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         const response = await fetch(
    //           `https://apiv3.apifootball.com/?action=get_events&from=${startDate}&to=${endDate}&league_id=302,152&APIkey=ec03badef30fa94a1a73885df7b2853d17e767f052ff324dff7247150507f6bd`
    //         );
    //         const data = await response.json();
    //         setmatches(data);
    //       } catch (error) {
    //         console.error('Error fetching fixtures:', error);
    //       }
    //     };
    
    //     fetchData();
    //   }, []);


    const loadMoreMatches = () => {
        setVisibleMatches((prevVisibleMatches) => prevVisibleMatches + 10);
    };
    console.log('up',matches);
    return (
        <div>
             {matches.slice(0, visibleMatches).map((matches) => {
                return (
                    <div class="containerr">
                        <div class="match">
                            <div class="match-header">
                                <div class="match-status" style={{ backgroundColor: matches.status === 'TIMED' ? 'blue' : '#4caf50' }}>
                                    {matches.status}
                                </div>
                                <div class="match-tournament">
                                    <img src={matches.competition.emblem} />
                                    {matches.competition.name}
                                </div>
                            </div>
                            <div class="match-content">
                                <div class="column">
                                    <div class="team team--home">
                                        <div class="team-logo">
                                            <img src={matches.awayTeam.crest} />
                                        </div>
                                        <h2 class="team-name" style={{ color: 'grey' }}>{matches.awayTeam.name}</h2>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="match-details">
                                        <div class="match-date">
                                            {/* 12 Aug at <strong>19:00</strong> */}
                                            {matches.indianDate}
                                        </div>
                                        <div class="match-score">
                                            <span class="match-score-number match-score-number--leading">
                                                {matches.score.fullTime.away}
                                            </span>
                                            <span class="match-score-divider">:</span>
                                            <span class="match-score-number">{matches.score.fullTime.home}</span>
                                        </div>
                                        {/* <div class="match-time-lapsed">72'</div> */}
                                        <div class="match-referee">
                                            Referee: <strong>{matches?.referees[0]?.name}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div class="column">
                                    <div class="team team--away">
                                        <div class="team-logo">
                                            <img src={matches.homeTeam.crest} />
                                        </div>
                                        <h2 class="team-name" style={{ color: 'grey' }}>{matches.homeTeam.name}</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
            {visibleMatches < matches.length && (
                <button className="load-more-button" onClick={loadMoreMatches}>Load More</button>
            )}
        </div>
    )
}

export default Allmatches
