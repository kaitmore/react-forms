import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NewPlaylist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      valid: true
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    })
    if (this.state.input.length > 0 && this.state.input.length < 16) {
      this.setState({
        valid: false
      })
    } else {
      this.setState({
        valid: true
      })
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.input)
    this.setState({
      input: ''
    })
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
              <button disabled={this.state.valid} type="submit" className="btn btn-success">Create Playlist</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>)
  }

}