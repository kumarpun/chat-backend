// get configs from environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 4000;
const MONGO_HOST = process.env.MONGO_HOST || 'mongodb+srv://kumarpun:jimin@1234@cluster0-83sos.mongodb.net/chat-app?retryWrites=true&w=majority';
const SECRET = process.env.SECRET || 'secret';
const ROOT = process.env.ROOT || '';
const CHAT_PATH = process.env.CHAT_PATH || '/chat-path';



// init config obj containing the app settings
const config = {
  env: NODE_ENV,
  root: ROOT,
  server: {
    port: PORT,
  },
  mongo: {
    host: MONGO_HOST,
    options: {
      server: {
        reconnectTries: Number.MAX_VALUE,
      },
    },
  },
  secret: SECRET,
  chatPath: CHAT_PATH,
};

module.exports = config;
