import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import Header from '../Components/Header';

class Favorites extends Component {
  constructor() {
    super();

    this.fetchFavoritesSong = this.fetchFavoritesSong.bind(this);
    this.state = {
      loading: true,
      favoriteSongsList: [],
    };
  }

  componentDidMount() {
    this.fetchFavoritesSong();
  }

  async fetchFavoritesSong() {
    const favoriteSongsList = await getFavoriteSongs();
    this.setState({ favoriteSongsList, loading: false });
  }

  render() {
    const { state: { loading, favoriteSongsList } } = this;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading />
          : favoriteSongsList.map((music) => (
            <MusicCard key={ music.trackId } music={ music } />
          )) }
      </div>
    );
  }
}

export default Favorites;
