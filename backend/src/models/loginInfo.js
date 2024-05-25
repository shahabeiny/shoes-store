const mongoose = require('mongoose');
const time_stamp = require('mongoose-timestamp');

const LoginInfoSchema = mongoose
  .Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    browser: { type: String },
    versionBrowser: { type: String },
    os: { type: String },
    versionOs: { type: String },
    ip: { type: String }
  })
  .plugin(time_stamp);

const LoginInfoModel = mongoose.model('LoginInfo', LoginInfoSchema);

module.exports = LoginInfoModel;
