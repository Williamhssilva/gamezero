// src/components/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import '../styles/App.css'; // Corrigido para o caminho correto
import GameDetails from './GameDetails'; // Corrigido para o caminho correto
import Modal from './Modal'; // Corrigido para o caminho correto
import Filters from './Filters'; // Importar o novo componente
import FinishedGamesDashboard from './FinishedGamesDashboard'; // Importar o novo componente
import useDebounce from '../hooks/useDebounce'; // Importe o hook de debounce

function App() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [ordering, setOrdering] = useState('');
    const [platform, setPlatform] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGame, setSelectedGame] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [finishedGames, setFinishedGames] = useState([]);

    const debouncedSearchTerm = useDebounce(searchTerm, 300); // Use o debounce

    useEffect(() => {
        const fetchGames = async () => {
            setLoading(true);
            try {
                let url = `https://api.rawg.io/api/games?key=ae2d749a724648bdafdf8c21deaffa86&page=${page}&page_size=20`;
                if (genre) url += `&genres=${genre}`;
                if (ordering) url += `&ordering=${ordering}`;
                if (platform) url += `&platforms=${platform}`;
                if (debouncedSearchTerm) url += `&search=${debouncedSearchTerm}`;
                
                const response = await fetch(url);
                const data = await response.json();
                setGames(data.results || []);
            } catch (error) {
                console.error('Erro ao buscar jogos:', error);
                setGames([]);
            } finally {
                setLoading(false);
            }
        };

        fetchGames();
    }, [page, genre, ordering, platform, debouncedSearchTerm]); // Use o debouncedSearchTerm

    useEffect(() => {
        const savedGames = JSON.parse(localStorage.getItem('finishedGames')) || [];
        setFinishedGames(savedGames);
    }, []);

    const openModal = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    const filteredGames = games.filter(game => {
        const matchesSearch = game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
        const matchesGenre = genre ? game.genres.some(g => g.name.toLowerCase() === genre.toLowerCase()) : true;
        const matchesPlatform = platform ? game.platforms.some(p => p.platform.name.toLowerCase() === platform.toLowerCase()) : true;
        return matchesSearch && matchesGenre && matchesPlatform;
    });

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <Router>
            <div className="app-container">
                <h1>Jogos</h1>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/finished">Jogos Finalizados</Link>
                </nav>
                <Filters
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    genre={genre}
                    setGenre={setGenre}
                    platform={platform}
                    setPlatform={setPlatform}
                    ordering={ordering}
                    setOrdering={setOrdering}
                />
                <div className="card-container">
                    {Array.isArray(filteredGames) && filteredGames.length > 0 ? (
                        filteredGames.map(game => (
                            <div key={game.id} className="card" onClick={() => openModal(game)}>
                                <div className="badge-container">
                                    {finishedGames.includes(game.id) && (
                                        <i className="fas fa-check finished-badge"></i>
                                    )}
                                </div>
                                <img src={game.background_image} alt={game.name} className="card-image" />
                                <h2 className="card-title">{game.name}</h2>
                                <p className="card-release-date">{game.released}</p>
                                <p className="card-rating">Classificação: {game.rating}</p>
                                <p className="card-genres">Gêneros: {Array.isArray(game.genres) ? game.genres.map(genre => genre.name).join(', ') : 'N/A'}</p>
                                <p className="card-platforms">Plataformas: {Array.isArray(game.platforms) ? game.platforms.map(platform => platform.platform.name).join(', ') : 'N/A'}</p>
                            </div>
                        ))
                    ) : (
                        <div>Nenhum jogo encontrado.</div>
                    )}
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedGame && <GameDetails game={selectedGame} onClose={closeModal} />}
            </Modal>
        </Router>
    );
}

export default App;
