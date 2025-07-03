var express = require('express');
var router = express.Router();
const VerifyToken = require('../middleware/VerifyToken');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


/* GET Todo listing. */
router.get('/',VerifyToken,async (req, res) =>
{

  let userDetails;
  
  const user = await prisma.user.findFirst({
    where: {

      name: req.user.username
    }
  });
  if (user)
    {
      userDetails = {name:user.name,email:user.email,userId:user.id}
      }

  const todo = await prisma.todo.findMany({
    where: {
      userId:userDetails.userId
    },
    select: {
      id: true,
      userId: true,
      title: true,
      status:true
    }
  }
    
  );
  res.status(200).json({status:true, message: 'Fetched Todos',data:todo});
});

router.post('/', async (req, res) =>
{
  const { title, userId } = req.body
  const createTodo = await prisma.todo.create({
    data: {
      title: title,
      status: 'TODO',
      userId: parseInt(userId)
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
});

router.delete('/:id', async (req, res) =>
{
  const Id = parseInt(req.params.id);
  try
  {
    const deleteTodo = await prisma.todo.delete({
      where: {
        id: Id,
      },
    });
    if (deleteTodo)
    {
      res.status(200).json({ message: 'Todo deleted successfully' });
    }
  } catch (error)
  {
    res.status(400).json({ message: 'Failed to delete todo' })
  }


});

router.patch('/:id', async (req, res) =>
{
  const Id = parseInt(req.params.id);
  const updatedData = req.body.title;

  try {
      const updateTodo = await prisma.todo.update({
    where: {
      id: Id
    },
    data: {
      title: updatedData
    }
      });
    if (updateTodo)
    { 
      res.status(200).json({status:true, message: 'Todo updated successfully' });
    }
  } catch (error) {
     res.status(400).json({ status:false,message: 'failed to update todo' });
  }

}

)
module.exports = router;
