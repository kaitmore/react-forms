import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Songs from './Songs';

export default class AddSongForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allsongs: [''],
      songId: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(allsongs => this.setState({ allsongs }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const playlistId = this.props.playlistId;

    axios.post(`/api/playlists/${playlistId}/songs`, {
      id: this.state.songId
    })
      .then(res => res.data)
      .then(playlist => this.props.updatePlaylist(playlistId))

  }

  handleChange(e) {
    this.setState({
      songId: e.target.value
    }, () => console.log("setstate", this.state))
  }

  render() {
    const songs = this.state.allsongs;
    return (
      <div className="well">
        <form onSubmit={this.handleSubmit} className="form-horizontal" noValidate name="songSelect">
          <fieldset>
            <legend>Add to Playlist</legend>
            <div className="form-group">
              <label htmlFor="song" className="col-xs-2 control-label">Song</label>
              <div className="col-xs-10">
                <select onChange={this.handleChange} value={this.state.selected} className="form-control" name="song">
                  {songs.map((song, i) => {
                    return <option key={i} value={song.id} >{song.name}</option>
                  })}
                </select>
              </div>
            </div>
            <div className="form-group">
              <div className="col-xs-10 col-xs-offset-2">
                <button type="submit" className="btn btn-success">Add Song</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>)
  }
}