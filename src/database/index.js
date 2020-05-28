const mongoose = require("mongoose");

mongoose.connect(process.env.APP_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose;
