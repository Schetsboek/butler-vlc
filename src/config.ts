require('dotenv').config({ path: './.env' });

export default {
  PORT: process.env.PORT || '10002',
  VERSION: process.env.VERSION || '1.1',
  MUSIC_FOLDER: process.env.MUSIC_FOLDER || '/home/schetsboek/music',
}