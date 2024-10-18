// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import GameDetails from '../GameDetails'; // Importe o componente GameDetails
import Modal from '../Modal'; // Importe o componente Modal

function App() {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [genre, setGenre] = useState('');
    const [ordering, setOrdering] = useState('');
    const [platform, setPlatform] = useState(''); // Estado para plataforma
    const [searchTerm, setSearchTerm] = useState(''); // Estado para pesquisa
    const [selectedGame, setSelectedGame] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                let url = `https://api.rawg.io/api/games?key=ae2d749a724648bdafdf8c21deaffa86&page=${page}&page_size=20`;
                if (genre) {
                    url += `&genres=${genre}`;
                }
                if (ordering) {
                    url += `&ordering=${ordering}`;
                }
                if (platform) {
                    url += `&platforms=${platform}`; // Adiciona filtro de plataforma
                }
                if (searchTerm) {
                    url += `&search=${searchTerm}`; // Adiciona pesquisa por nome
                }
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
    }, [page, genre, ordering, platform, searchTerm]);

    const openModal = (game) => {
        setSelectedGame(game);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedGame(null);
    };

    if (loading) {
        return <div>Carregando...</div>;
    }

    return (
        <Router>
            <div className="app-container">
                <h1>Jogos</h1>
                <div className="filters">
                    <input
                        type="text"
                        placeholder="Pesquisar por nome do jogo"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select onChange={(e) => setGenre(e.target.value)} value={genre}>
                        <option value="">Todos os Gêneros</option>
                        <option value="action">Ação</option>
                        <option value="adventure">Aventura</option>
                        <option value="rpg">RPG</option>
                    </select>
                    <select onChange={(e) => setPlatform(e.target.value)} value={platform}>
                        <option value="">Todas as Plataformas</option>
                        <option value="pc">PC</option>
                        <option value="playstation">PlayStation</option>
                        <option value="xbox">Xbox</option>
                    </select>
                    <select onChange={(e) => setOrdering(e.target.value)} value={ordering}>
                        <option value="">Ordenar por</option>
                        <option value="-released">Data de Lançamento (Mais Recente)</option>
                        <option value="released">Data de Lançamento (Mais Antigo)</option>
                        <option value="-rating">Classificação (Mais Alta)</option>
                        <option value="rating">Classificação (Mais Baixa)</option>
                    </select>
                </div>
                <div className="card-container">
                    {Array.isArray(games) && games.length > 0 ? (
                        games.map(game => (
                            <div key={game.id} className="card" onClick={() => openModal(game)}>
                                <img src={game.background_image} alt={game.name} className="card-image" />
                                <h2 className="card-title">{game.name}</h2>
                                <p className="card-release-date">{game.released}</p>
                                <p className="card-rating">Classificação: {game.rating}</p>
                                <p className="card-genres">Gêneros: {game.genres.map(genre => genre.name).join(', ')}</p>
                                <p className="card-platforms">Plataformas: {game.platforms.map(platform => platform.platform.name).join(', ')}</p> {/* Adicionando plataformas */}
                            </div>
                        ))
                    ) : (
                        <div>Nenhum jogo encontrado.</div>
                    )}
                </div>
                <div className="pagination">
                    <button onClick={() => setPage(prev => Math.max(prev - 1, 1))}>Anterior</button>
                    <span>Página {page}</span>
                    <button onClick={() => setPage(prev => prev + 1)}>Próxima</button>
                </div>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {selectedGame && <GameDetails game={selectedGame} onClose={closeModal} />}
            </Modal>
        </Router>
    );
}

export default App;
