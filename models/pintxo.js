var mongoose = require('mongoose'),
    //Schema   = mongoose.Schema;

pintxoSchema = new mongoose.Schema({
  
  name:            { type: String },
  ingredients:     { type: [String] },
  creator:         { type: String },
  recipe:          { type: String },
  qrCode:          { type: String },
  edition:         { type: Number}
});

module.exports = mongoose.model('Pintxos', pintxoSchema);
