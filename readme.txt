# GameZero

GameZero é uma aplicação web desenvolvida em React que permite aos usuários fazerem a gestão dos seus jogos terminados. A aplicação utiliza a API RAWG para buscar informações sobre jogos, incluindo detalhes, imagens e vídeos.

## Funcionalidades

- **Pesquisa de Jogos**: Os usuários podem pesquisar jogos por nome.
- **Filtros**: Filtre jogos por gênero, plataforma e ordenação.
- **Detalhes do Jogo**: Visualize detalhes completos de cada jogo, incluindo desenvolvedores, editores, gêneros e plataformas.
- **Modal de Imagem**: Visualize imagens em um carrossel e abra uma visualização em tela cheia.
- **Responsividade**: A aplicação é responsiva e funciona bem em dispositivos móveis.

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construir interfaces de usuário.
- **React Router**: Para navegação entre componentes.
- **Slick Carousel**: Para exibir imagens em um carrossel.
- **CSS**: Para estilização da aplicação.

## Instalação

Para rodar a aplicação localmente, siga os passos abaixo:

1. Clone o repositório:
   ```bash
   git clone https://github.com/Williamhssilva/gamezero.git
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd gamezero
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Adicione sua chave da API RAWG no arquivo `App.js`:
   ```javascript
   const url = `https://api.rawg.io/api/games?key=YOUR_API_KEY&page=${page}&page_size=20`;
   ```

5. Inicie a aplicação:
   ```bash
   npm start
   ```

## Uso

Após iniciar a aplicação, você pode:

- Pesquisar jogos usando a barra de pesquisa.
- Filtrar jogos por gênero e plataforma.
- Clicar em um jogo para ver mais detalhes.
- Navegar pelas imagens do jogo em um carrossel e abrir uma visualização em tela cheia.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir um problema ou enviar um pull request.

## Contato

Para mais informações, entre em contato com [williamhss90@gmail.com](mailto:williamhss90@gmail.com).