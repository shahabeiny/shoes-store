const mongoose = require("mongoose");
const debug = require("debug")("app:main");


module.exports = function(){
  mongoose
  .connect(process.env.DBADDRESS,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  .then(() => debug("connected to mongodb!")) // connect ok
  .catch((error) => debug("could not connect to mongodb!")); // connect error
}
