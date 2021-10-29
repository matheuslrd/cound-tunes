import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ResultAlbunsArtist extends Component {
  render() {
    const { artist } = this.props;
    return (
      <p className="result-album-artist">
        Resultado de álbuns de:
        <b className="artist-bold">
          {` ${artist}`}
        </b>
      </p>
    );
  }
}

ResultAlbunsArtist.propTypes = {
  artist: PropTypes.string.isRequired,
};

export default ResultAlbunsArtist;
