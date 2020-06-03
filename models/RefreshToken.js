const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RefreshTokenSchema = new Schema({
   name: String,
   token: String
});

const RefreshToken = mongoose.model('refreshTokens', RefreshTokenSchema);

module.exports = RefreshToken;