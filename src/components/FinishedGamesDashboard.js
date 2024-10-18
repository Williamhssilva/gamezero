import React, { useEffect, useState } from 'react';

const FinishedGamesDashboard = () => {
    const [finishedGames, setFinishedGames] = useState([]);
    const [gamesDetails, setGamesDetails] = useState([]);

    useEffect(() => {
        const savedGames = JSON.parse(localStorage.getItem('finishedGames')) || [];
        setFinishedGames(savedGames);

        // Fetch details for finished games
        const fetchFinishedGamesDetails = async () => {
            const details = await Promise.all(savedGames.map(async (gameId) => {
                const response = await fetch(`https://api.rawg.io/api/games/${gameId}?key=YOUR_API_KEY`);
                return response.json();
            }));
            setGamesDetails(details);
        };

        if (savedGames.length > 0) {
            fetchFinishedGamesDetails();
        }
    }, []);

    return (
        <div className="dashboard-container">
            <h1>Jogos Finalizados</h1>
            {gamesDetails.length > 0 ? (
                <ul>
                    {gamesDetails.map(game => (
                        <li key={game.id}>
                            <h2>{game.name}</h2>
                            <p>Classificação: {game.rating}</p>
                            <p>Data de Lançamento: {game.released}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nenhum jogo finalizado ainda.</p>
            )}
        </div>
    );
};

export default FinishedGamesDashboard;
