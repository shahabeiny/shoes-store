const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");

const Role = mongoose
.Schema({
    name: { type: String, required: true, minLength: 2, maxLength: 15 },
    nameEng: { type: String, minLength: 2, maxLength: 20, required: true },
    permissions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission"
    }]
  },{
    toJSON: { virtuals: true },
  }).plugin(time_stamp);

  Role.virtual('users', {
    ref: 'User',
    localField: '_id',
    foreignField: 'role'
  });

  module.exports = mongoose.model('Role', Role);
