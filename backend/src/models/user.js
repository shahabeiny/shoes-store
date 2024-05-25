const mongoose = require("mongoose");
const time_stamp = require("mongoose-timestamp");
const cron = require("node-cron");

const UserSchema = mongoose.Schema({
  name: { type: String, default: "" },
  family: { type: String, default: "" },
  username: { type: String, minLength: 2, maxLength: 20, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true, unique: true },
  address: { type: String },
  avatar: { type: String, default: "" },
  password: { type: String, required: true },
  otp: { code:{type: String},date: { type: Date } },
  role: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Role",
  },
  is_banned: { type: Boolean, default: false },
  is_active: { type: Boolean, default: false },
},{
  toJSON: { virtuals: true },
}).plugin(time_stamp);

UserSchema.virtual('rates', {
  ref: 'Rate',
  localField: '_id',
  foreignField: 'user'
});

UserSchema.virtual('favorites', {
  ref: 'Favorite',
  localField: '_id',
  foreignField: 'user'
});

UserSchema.index({ createdAt: 1 });

const UserModel = mongoose.model('User', UserSchema);

cron.schedule('0 0 */1 * *', async () => {
  const timeExpire = new Date();
  timeExpire.setHours(timeExpire.getHours() - 24);

  try {
    const result = await UserModel.deleteMany({
      is_active: false,
      createdAt: { $lt: timeExpire }
    });

    console.log(`${result.deletedCount} inactive users deleted.`);
  } catch (error) {
    console.error("Error deleting inactive users:", error);
  }
});

module.exports = UserModel;
