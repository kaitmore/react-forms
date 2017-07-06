import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = (props) => {

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link to="/albums">ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to="/artists">ARTISTS</Link>
        </h4>
      </section>
      <hr />
      <section>
        <h4 className="text-muted">PLAYLISTS</h4>
        <h4>
          <Link className="btn btn-primary btn-block" to="/add-playlist">
            <span className="glyphicon glyphicon-plus"></span> PLAYLIST
          </Link>
          <hr />
          <ul className="list-unstyled">
            {props.playlists.map(playlist => {
              <li className="playlist-item menu-item">
                <Link to="WHERE_TO_GO">playlist</Link>
              </li>
            })}
            <li className="playlist-item menu-item">
              <Link to="WHERE_TO_GO">another playlist</Link>
            </li>
          </ul>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;
