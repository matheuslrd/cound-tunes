import React, { Component } from 'react';
import AlbumCard from '../Components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';
import Loading from '../Components/Loading';
import ResultAlbunsArtist from '../Components/ResultAlbunsArtist';
import Header from '../Components/Header';

class Search extends Component {
  constructor() {
    super();

    this.enableOrDisableButton = this.enableOrDisableButton.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
    this.searchEnter = this.searchEnter.bind(this);
    this.state = {
      artistSearch: '',
      artistName: '',
      albumArtist: null,
      disabled: true,
      display: 'inline',
    };
  }

  handleInput({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value });
    this.enableOrDisableButton(value);
  }

  enableOrDisableButton(value) {
    const numberMinEnableButton = 2;
    return (value.length >= numberMinEnableButton)
      ? this.setState({ disabled: false })
      : this.setState({ disabled: true });
  }

  searchArtist() {
    const { artistSearch } = this.state;
    this.setState({ display: 'none' }, async () => {
      const albumArtist = await searchAlbumsAPI(artistSearch);
      this.setState(
        { albumArtist,
          artistName: artistSearch,
          artistSearch: '',
          display: 'inline',
        },
      );
    });
  }

  mapAlbuns(albumArtist) {
    if (albumArtist.length === 0) {
      return <p>Nenhum álbum foi encontrado</p>;
    }

    return albumArtist.map((album) => (
      <AlbumCard key={ album.collectionName } album={ album } />
    ));
  }

  searchEnter({ key }) {
    if (key === 'Enter') {
      this.searchArtist();
    }
  }

  searchForm() {
    const { disabled, artistSearch, display } = this.state;
    return (
      <div className="container-search">
        <input
          type="text"
          className="input-search"
          data-testid="search-artist-input"
          name="artistSearch"
          value={ artistSearch }
          onChange={ this.handleInput }
          onKeyPress={ (event) => this.searchEnter(event) }
          style={ { display: [display] } }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          className="btn-search"
          disabled={ disabled }
          onClick={ () => this.searchArtist() }
          style={ { display: [display] } }
        >
          Pesquisar
        </button>
      </div>
    );
  }

  render() {
    const { albumArtist, display, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section className="container-search-artist">
          { display === 'none' ? <Loading /> : this.searchForm() }
          { artistName !== '' ? <ResultAlbunsArtist artist={ artistName } /> : null }
        </section>
        <section className="container-albuns">
          { albumArtist === null
            ? <p> Encontre sua música! </p> : this.mapAlbuns(albumArtist) }
        </section>
      </div>
    );
  }
}

export default Search;
