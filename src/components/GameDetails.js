// src/GameDetails.js
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick'; // Importa o carrossel
import FullScreenImageModal from './FullScreenImageModal'; // Importe o novo componente

function GameDetails({ game, onClose }) {
    const [isFullScreenOpen, setIsFullScreenOpen] = useState(false);
    const [fullScreenImageUrl, setFullScreenImageUrl] = useState('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        const finishedGames = JSON.parse(localStorage.getItem('finishedGames')) || [];
        setIsFinished(finishedGames.includes(game.id));
    }, [game.id]);

    // Configurações do carrossel
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const openFullScreen = (imageUrl, index) => {
        setFullScreenImageUrl(imageUrl);
        setCurrentImageIndex(index);
        setIsFullScreenOpen(true);
    };

    const nextImage = () => {
        if (currentImageIndex < game.short_screenshots.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
            setFullScreenImageUrl(game.short_screenshots[currentImageIndex + 1].image);
        }
    };

    const prevImage = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
            setFullScreenImageUrl(game.short_screenshots[currentImageIndex - 1].image);
        }
    };

    const markAsFinished = () => {
        const finishedGames = JSON.parse(localStorage.getItem('finishedGames')) || [];
        if (!finishedGames.includes(game.id)) {
            finishedGames.push(game.id);
            localStorage.setItem('finishedGames', JSON.stringify(finishedGames));
            setIsFinished(true); // Atualiza o estado para refletir que o jogo foi finalizado
            alert(`${game.name} foi marcado como finalizado!`);
        } else {
            alert(`${game.name} já está marcado como finalizado.`);
        }
    };

    return (
        <div className="details-container">
            <button className="modal-close" onClick={onClose}>✖</button>
            <h1>{game.name}</h1>
            <img src={game.background_image} alt={game.name} className="game-image" />
            <div className="game-description">
                <h2>Descrição</h2>
                <p>{game.description || 'Descrição não disponível.'}</p>
            </div>
            <button onClick={markAsFinished}>
                {isFinished ? 'Jogo Finalizado' : 'Marcar como Finalizado'}
            </button>
            {/* Exibir mensagem se o jogo foi finalizado */}
            {isFinished && <p>Você já finalizou este jogo!</p>}
            <div className="game-info">
                <div className="info-card">
                    <h3>Desenvolvedores</h3>
                    <p>{game.developers && game.developers.length > 0 ? game.developers.map(dev => dev.name).join(', ') : 'Desenvolvedores não disponíveis.'}</p>
                </div>
                <div className="info-card">
                    <h3>Editores</h3>
                    <p>{game.publishers && game.publishers.length > 0 ? game.publishers.map(pub => pub.name).join(', ') : 'Editores não disponíveis.'}</p>
                </div>
                <div className="info-card">
                    <h3>Gêneros</h3>
                    <p>{game.genres && game.genres.length > 0 ? game.genres.map(genre => genre.name).join(', ') : 'Gêneros não disponíveis.'}</p>
                </div>
                <div className="info-card">
                    <h3>Plataformas</h3>
                    <p>{game.platforms && game.platforms.length > 0 ? game.platforms.map(platform => platform.platform.name).join(', ') : 'Plataformas não disponíveis.'}</p>
                </div>
                <div className="info-card">
                    <h3>Classificação</h3>
                    <p>{game.rating} ({game.ratings_count} avaliações)</p>
                </div>
            </div>
            <div className="game-media">
                <h3>Imagens</h3>
                {game.short_screenshots && game.short_screenshots.length > 0 && (
                    <Slider {...settings}>
                        {game.short_screenshots.map((screenshot, index) => (
                            <div key={index} onClick={() => openFullScreen(screenshot.image, index)}>
                                <img src={screenshot.image} alt={`Screenshot ${index + 1}`} className="screenshot-image" />
                            </div>
                        ))}
                    </Slider>
                )}
                {game.clip && (
                    <div className="video-container">
                        <h4>Vídeo</h4>
                        <video controls>
                            <source src={game.clip.clip} type="video/mp4" />
                            Seu navegador não suporta a tag de vídeo.
                        </video>
                    </div>
                )}
            </div>

            {/* Modal de Imagem em Tela Cheia */}
            <FullScreenImageModal 
                isOpen={isFullScreenOpen} 
                onClose={() => setIsFullScreenOpen(false)} 
                imageUrl={fullScreenImageUrl} 
                images={game.short_screenshots} 
                currentIndex={currentImageIndex} 
                onNext={nextImage} 
                onPrev={prevImage} 
            />
        </div>
    );
}

export default GameDetails;
