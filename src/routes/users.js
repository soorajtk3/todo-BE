var express = require('express');
var router = express.Router();
// import prisma from '../prismaClient';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource.User details');
});

module.exports = router;
