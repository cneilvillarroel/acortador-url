module.exports = {
    host: 'http://localhost',
    //host: 'https://cenco.sud/',
    //host: 'https://youtu.be/',
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/shorturls',
    SECRET_TOKEN: 'dreamcatcher12345*'
  }
  