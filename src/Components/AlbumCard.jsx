import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const {
      album: {
        artistName,
        collectionName,
        collectionPrice,
        artworkUrl100,
        trackCount,
        collectionId,
      },
    } = this.props;
    return (
      <div className="album-body">
        <div className="body-img">
          <img
            className="img-album"
            src={ artworkUrl100 }
            alt={ `Album ${artistName}` }
          />
        </div>
        <div className="data-album">
          <h3>
            { artistName }
          </h3>
          <p>
            { collectionName }
          </p>
          <p>
            <i>
              { collectionPrice === undefined
                ? 'Sem preço'
                : `R$ ${collectionPrice}` }
            </i>
          </p>
          <p>
            { `${trackCount} músicas` }
          </p>
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
          >
            { trackCount !== 1 ? 'Ver álbum' : 'Ver single' }
          </Link>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.shape({
    artistName: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    artworkUrl100: PropTypes.string.isRequired,
    collectionPrice: PropTypes.number,
    trackCount: PropTypes.number.isRequired,
    collectionId: PropTypes.number.isRequired,
  }),
};

AlbumCard.defaultProps = {
  album: PropTypes.shape({
    collectionPrice: null,
  }),
};

export default AlbumCard;
