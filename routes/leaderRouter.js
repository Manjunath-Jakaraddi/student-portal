var express = require('express'),
    bodyParser = require('body-parser');

leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')

.all(function (req,res,next) {
  res.writeHead(200,{'Content-Type':'text/plain'});
  next();
})

.get(function (req,res,next) {
  res.end("Sending all the leaders name for you");
})

.post(function (req,res,next) {
  res.end("Adding the leader with name "+req.body.name+" and with description "+req.body.description);
})

.delete(function (req,res,next) {
  res.end("Deleting all the leaders for you");
});

leaderRouter.route('/:leaderId')

.get(function (req,res,next) {
  res.end("Sending leader with the Id "+req.params.leaderId);
})

.put(function (req,res,next) {
  res.write("Updating leader with Id"+req.params.leaderId);
  res.end(" with name "+req.body.name+" and description "+req.body.description);
})

.delete(function (req,res,next) {
  res.end("Deleting leader with Id"+req.params.leaderId);
});

module.exports = leaderRouter;
