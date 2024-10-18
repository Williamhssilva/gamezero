// src/components/FullScreenImageModal.js
import React from 'react';
import '../styles/FullScreenImageModal.css'; // Corrigido para o caminho correto

const FullScreenImageModal = ({ isOpen, onClose, imageUrl, images, currentIndex, onNext, onPrev }) => {
    if (!isOpen) return null;

    return (
        <div className="fullscreen-overlay" onClick={onClose}>
            <div className="fullscreen-content" onClick={(e) => e.stopPropagation()}>
                <button className="fullscreen-close" onClick={onClose}>✖</button>
                <button className="fullscreen-prev" onClick={onPrev} disabled={currentIndex === 0}>❮</button>
                <img src={imageUrl} alt="Fullscreen" className="fullscreen-image" />
                <button className="fullscreen-next" onClick={onNext} disabled={currentIndex === images.length - 1}>❯</button>
            </div>
        </div>
    );
};

export default FullScreenImageModal;
