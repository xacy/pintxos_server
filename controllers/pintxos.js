var mongoose = require('mongoose');
var Pintxos  = mongoose.model('Pintxos');
var     qr = require('qr-image');
var pdf = require('pdfkit');

//GET - Return all pintxos in the DB
exports.prueba = function(req,res){
  console.log("prueba");
};

exports.findAllPintxos = function(req, res) {
  console.log("lol");
    Pintxos.find(function(err, pintxos) {
    if(err) res.send(500, err.message);

    console.log('GET /pintxos')
        res.status(200).jsonp(pintxos);
    });
};
exports.findById = function(req, res) {
    Pintxos.findById(req.params.id, function(err, pintxo) {
    if(err){
      res.send(500, err.message);
    }

    console.log('GET /pintxos/' + req.params.id);
        res.status(200).jsonp(pintxo);
    });
};
exports.addPintxo = function(req, res) {
    console.log('POST');
    console.log(req.body);
    var pintxo = new Pintxos({
        name:           req.body.name,
        ingredients:    req.body.ingredients,
        creator:        req.body.creator,
        recipe:         req.body.recipe,
        qrcode:         req.body.qrcode,
        edition:        req.body.edition
    });

    pintxo.save(function(err, pintxo) {
      console.log("guardar");
        if(err){
          res.send(500, err.message);
        } //return res.status(500).send( err.message);
    res.status(200).send('OK');
  });

};
exports.updatePintxo = function(req, res) {
    Pintxos.findById(req.params.id, function(err, pintxo) {
        pintxo.name   = req.body.name;
        pintxo.ingredients    = req.body.ingredients;
        pintxo.creator = req.body.creator;
        pintxo.recipe  = req.body.recipe;
        pintxo.qrcode = req.body.qrcode;
        pintxo.edition   = req.body.edition;

        pintxo.save(function(err) {
            if(err){
              return res.status(500).send(err.message);
            }
            else{
              res.status(200).jsonp(pintxo);
              //exports.generatePDF(req,res,pintxo);

            }
        });
    });

};
exports.deletePintxo = function(req, res) {
    Pintxos.findById(req.params.id, function(err, pintxo) {
        pintxo.remove(function(err) {
            if(err) return res.status(500).send(err.message);
      res.status(200).send();
        })
    });

};
exports.getQrRecipe = function(text){
  var code = qr.imageSync(text, { type: 'png' });
  //res.type('svg');
  //code.pipe(res);
  return code;
};
exports.generatePDF = function(req,res,pintxo){
  var doc= new pdf({size:'A4',layout: 'landscape'});
  doc.font('fonts/Montserrat-Regular.ttf').fontSize(25);
   //doc.text('Some text with an embedded font!', 100, 100);
   doc.text(pintxo.name);
   doc.text(pintxo.ingredients);
   var code=exports.getQrRecipe("http://localhost:3000/api/recipe/"+pintxo._id);
   doc.image(new Buffer(exports.getQrRecipe()));
   doc.end();
   console.log("fin doc");
   doc.pipe(res);
}
