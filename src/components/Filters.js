// src/components/Filters.js
import React from 'react';

const Filters = ({ searchTerm, setSearchTerm, genre, setGenre, platform, setPlatform, ordering, setOrdering }) => {
    const clearFilters = () => {
        setSearchTerm('');
        setGenre('');
        setPlatform('');
        setOrdering('');
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
    };

    return (
        <form className="filters" onSubmit={handleSubmit}>
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
            <button type="button" onClick={clearFilters}>Limpar Filtros</button>
        </form>
    );
};

export default Filters;
