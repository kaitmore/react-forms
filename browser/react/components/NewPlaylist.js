import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class NewPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      notValid: true,
      edited: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
      edited: true
    }, () => {
      if (this.state.input.length > 0 && this.state.input.length < 16) {
        this.setState({
          notValid: false
        })
      } else {
        this.setState({
          notValid: true
        })
      }

    })

  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.input)
    this.setState({
      input: ''
    })

    axios.post('/api/playlists',
      {
        name: this.state.input
      })
      .then(res => res.data)
      .then(result => {
        console.log(result) // response json from the server!
      });
  }

  render() {
    return (<div className="well">
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input onChange={this.handleChange} className="form-control" type="text" value={this.state.input} />
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button disabled={this.state.notValid} type="submit" className="btn btn-success">Create Playlist</button>
              {this.state.notValid && this.state.edited ? <div className="alert alert-warning">Please enter a name</div> : <div />}
            </div>
          </div>
        </fieldset>
      </form>
    </div>)
  }

}
