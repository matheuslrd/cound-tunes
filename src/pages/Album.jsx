import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Header from '../Components/Header';
import './album.css';
import Loading from '../Components/Loading';

class Album extends Component {
  constructor() {
    super();

    this.getingMusics = this.getingMusics.bind(this);
    this.state = {
      albumData: {},
      musics: [],
    };
  }

  componentDidMount() {
    this.getingMusics();
  }

  async getingMusics() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ albumData: musics[0], musics });
  }

  mapMusic(musics) {
    return musics.slice(1).map((music) => (
      <MusicCard
        listSongs={ musics }
        music={ music }
        key={ `${music.trackId}` }
      />));
  }

  render() {
    const { albumData:
      { artistName, collectionName, artworkUrl100 }, musics } = this.state;
    const albumData = (
      <section className="album-container">
        <h3 data-testid="album-name">
          { collectionName }
        </h3>
        <h2 data-testid="artist-name" className="artist-name">
          { artistName }
        </h2>
        <img
          src={ artworkUrl100 }
          alt={ `Álbum ${collectionName} de ${artistName}` }
          className="img-album-page-album"
        />
      </section>
    );
    return (
      <div data-testid="page-album">
        <Header />

        <main className="data-album-and-musics">
          {
            artistName === undefined
              ? <Loading />
              : albumData
          }
          <section className="music-container">
            {
              Object.keys(musics).length !== 0
                ? this.mapMusic(musics)
                : <Loading />
            }
          </section>
        </main>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
