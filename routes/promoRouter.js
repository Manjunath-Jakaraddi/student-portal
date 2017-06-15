var express = require('express'),
    bodyParser = require('body-parser');

promoRouter= express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')

.all(function (req,res,next) {
  res.writeHead(200,{'Content-Type':'text/plain'});
  next();
})

.get(function (req,res,next) {
  res.end("Sending all the promotions for you");
})

.post(function (req,res,next) {
  res.end("Adding the promotionwith name "+req.body.name+" and with description "+req.body.description);
})

.delete(function (req,res,next) {
  res.end("Deleting all the promotions for you");
});

promoRouter.route('/:promotionId')

.get(function (req,res,next) {
  res.end("Sending Promotion with the Id "+req.params.promotionId);
})

.put(function (req,res,next) {
  res.write("Updating Promotion with Id"+req.params.promotionId+" ");
  res.end("with name "+req.body.name+" and description "+req.body.description);
})

.delete(function (req,res,next) {
  res.end("Deleting Promotion with Id"+req.params.promotionId);
});
module.exports = promoRouter;
