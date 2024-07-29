var express = require('express');
var router = express.Router();
const VerifyToken = require('../middleware/VerifyToken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


/* GET users listing. */
router.get('/', VerifyToken,async (req, res) =>
{
  const user = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name:true
    }
  }
    
  );
  res.status(200).json({status:true, message: 'Fetched users',user});
});

module.exports = router;
