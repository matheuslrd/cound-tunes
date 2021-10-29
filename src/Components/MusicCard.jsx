import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.addOrRemoveToFavorite = this.addOrRemoveToFavorite.bind(this);
    this.recoverFavoriteSongs = this.recoverFavoriteSongs.bind(this);
    this.state = {
      checked: false,
      display: 'inline',
    };
  }

  componentDidMount() {
    this.recoverFavoriteSongs();
  }

  async recoverFavoriteSongs() {
    const { music: { trackId } } = this.props;
    const favoriteSongs = await getFavoriteSongs();
    const checkFavoriteSong = favoriteSongs.some((music) => trackId === music.trackId);
    if (checkFavoriteSong) {
      this.setState({ checked: true });
    }
  }

  async addOrRemoveToFavorite({ target: { checked } }) {
    const { props: { music } } = this;
    this.setState({ checked: !checked, display: 'none' });
    if (checked) {
      await addSong(music);
      this.setState({ checked: true });
    } else {
      await removeSong(music);
      this.setState({ checked: false });
    }
    this.setState({ display: 'inline' });
  }

  render() {
    const { checked, display } = this.state;
    const { music: { trackName, trackId, previewUrl } } = this.props;
    return (
      <div className="song-card-item">
        <div className="favorite-and-name">
          <label htmlFor={ `${trackId}` } data-testid={ `checkbox-music-${trackId}` }>
            <input
              type="checkbox"
              id={ `${trackId}` }
              name="checked"
              className="favorite-checked"
              checked={ checked }
              onChange={ this.addOrRemoveToFavorite }
              style={ { display } }
            />
            { display === 'none' ? <Loading /> : null }
          </label>
          <p>
            { trackName }
          </p>
        </div>
        <div className="audio-body">
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>
              audio
            </code>
            .
          </audio>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape(
    {
      trackName: PropTypes.string,
      trackId: PropTypes.string,
      previewUrl: PropTypes.string,
    },
  ).isRequired,
};

export default MusicCard;
