/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById(playlistId) {
    const query = {
      text: `SELECT playlists.id, playlists.name
      FROM playlists
      WHERE playlists.id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getPlaylistSongById(playlistId) {
    const query = {
      text: `SELECT songs.id, songs.title, songs.performer
      FROM playlist_songs
      LEFT JOIN songs on playlist_songs.song_id = songs.id
      WHERE playlist_id = $1`,
      values: [playlistId],
    };
    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = PlaylistsService;
