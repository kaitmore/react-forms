import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Songs from './Songs';
import AddSongForm from './AddSongForm';

export default class Playlist extends Component {

  constructor() {
    super();
    this.state = {
      playlist: { name: '' }
    }
    this.fetchPlaylistById = this.fetchPlaylistById.bind(this);
  }

  fetchPlaylistById(playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        console.log("playlist", playlist)
        this.setState({ playlist: playlist });
      });
  }

  componentDidMount() {

    const playlistId = this.props.match.params.playlistId;
    this.fetchPlaylistById(playlistId);

  }

  componentWillReceiveProps(nextProps) {

    const nextPlaylistId = nextProps.match.params.playlistId;
    const currentPlaylistId = this.props.match.params.playlistId;
    if (nextPlaylistId !== currentPlaylistId) {
      this.fetchPlaylistById(nextPlaylistId);
    }
  }


  render() {

    const playlist = this.state.playlist;
    return (
      <div>
        <h3>{playlist.name}</h3>
        <Songs songs={playlist.songs} /> {/** Hooray for reusability! */}
        {playlist.songs && !playlist.songs.length && <small>No songs.</small>}
        <hr />
        <AddSongForm playlistId={this.props.match.params.playlistId} updatePlaylist={this.fetchPlaylistById} />
      </div>)

  }
}
