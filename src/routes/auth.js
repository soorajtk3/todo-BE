var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()

router.post('/signUp', async (req, res) =>
{
  
  const { name, email, password } = req.body;
  let hashedPassword;
  let userSignUp;
  if (password) {
    hashedPassword = await bcrypt.hash(password, bcrypt.genSaltSync(8));
  }
  if (email && name && password)
  {
     userSignUp = await prisma.user.create({
      data: {
        name: name,
      email: email,
      password: hashedPassword,
     }
    })
  } else
  {
    return res.status(400).json({status:false, message: 'Unable to sign up' });
}

  if (userSignUp)
  {
    return res.status(200).json({status:true, message: 'User created successfully',data:userSignUp });
  } else
  {
    return res.status(400).json({
      status: false,
      message: 'Unable to sign up'
    });
    
  }

});

router.post('/login', async (req, res) =>
{
  try {
    const { email, password } = req.body;
    console.log(password,'pass');
      const user = await prisma.user.findUnique({
        where: {
          email:email
        },
        select: {
          email: true,
          name: true,
          password:true,
        },
      })
      console.log(user,'user');
      if (!user)
      {
        return res.status(404).json({status:false,message:'User not found'})
      }
    
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
      {
        return res.status(401).json({status:false,message:'Authentication failed'})
      }
    const token = jwt.sign({ username: user.name }, 'SECRET_KEY', { expiresIn: '2000s' })
   
      return res.status(200).json({status:true,token,data:{name:user.name,email:user.email} ,message:'Login success' });
  } catch (error) {
    res.status(500).json({status:false,message:"Login failed"})
  }
 

  
 
})

module.exports = router;

