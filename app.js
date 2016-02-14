var express = require("express"),
    app = express(),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    models = require('./models/pintxo'),
    PintxoCtrl = require('./controllers/pintxos'),
    pintxos = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

//var router = express.Router();
pintxos.route('/pintxos')
  .get(PintxoCtrl.findAllPintxos)
  .post(PintxoCtrl.addPintxo);

pintxos.route('/pintxos/:id')
  .get(PintxoCtrl.findById)
  .put(PintxoCtrl.updatePintxo)
  .delete(PintxoCtrl.deletePintxo);

pintxos.route('/recipes/:id').get(PintxoCtrl.generatePDF);

app.use('/api', pintxos);

mongoose.connect('mongodb://localhost/pintxos', function(err, res) {
  if(err) {
    console.log('ERROR: connecting to Database. ' + err);
  }
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
