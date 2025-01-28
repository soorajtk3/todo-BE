var express = require('express');
var router = express.Router();
const VerifyToken = require('../middleware/VerifyToken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


/* GET Todo listing. */
router.get('/',async (req, res) =>
{
  const todo = await prisma.todo.findMany({
    select: {
      id: true,
      userId: true,
      title: true,
      isDone:true,
    }
  }
    
  );
  res.status(200).json({status:true, message: 'Fetched Todos',data:todo});
});

router.post('/', async (req, res) =>
{
  const {title,userId}=req.body
  const createTodo = await prisma.todo.create({
    data: {
      title: title,
      isDone: false,
      userId:userId
    }
   
  })

  if (createTodo)
  {
    res.status(200).json({ status: true, message: 'Todo Created successfully' });
  }
  else
  {
    res.status(400).json({ status: false, message: 'Unable to create todo' });
  }
})

module.exports = router;
