require('dotenv').config();

export default {
  PORT: process.env.PORT || '3030',
  VERSION: process.env.VERSION || '1.0',
  VLC_PORT: process.env.VLC_PORT || '8080',
  VLC_HOST: process.env.VLC_HOST || '127.0.0.1',
  VLC_USERNAME: process.env.VLC_USERNAME || '',
  VLC_PASSWORD: process.env.VLC_PASSWORD || '',
  MUSIC_FOLDER: process.env.MUSIC_FOLDER || '/home/schetsboek/music',
}