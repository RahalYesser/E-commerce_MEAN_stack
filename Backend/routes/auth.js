const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../models/User')
const authorize = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

// Sign-up
router.post(
  '/register-user',
  [
    check('username')
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage('Username must be atleast 3 characters long'),
      check('email', 'Email is required').not().isEmpty(),
      check('password', 'Password should be between 3 to 20 characters long')
      .not()
      .isEmpty()
      .isLength({ min: 3, max: 20 }),
  ],
  (req, res) => {
    const errors = validationResult(req)
    console.log(req.body)

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array())
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        })
        user
          .save()
          .then((response) => {
            res.status(201).json({
              message: 'User successfully created!',
              result: response,
            })
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            })
          })
      })
    }
  },
)

// Sign-in
router.post('/signin',async (req, res) => {
 
  try{
    let users=req.body;
    //console.log(users);
    const user = await userSchema.findOne({email:users.email});
    console.log(user)

    if(!user){
      return res.status(401).send("YOU ARE NOT REGISTRED");
     }

    const isPasswordCorrect = await bcrypt.compare(users.password, user.password);
    console.log(isPasswordCorrect);


    if(!isPasswordCorrect){
       return res.status(401).send("Password is incorrect");
    }

    let jwtToken = jwt.sign(
      {
        email: user.email,
        userId: user._id,
      },
      'longer-secret-is-better',
      {
        expiresIn: '1h', 
      },
    )

    console.log(jwtToken)

    return res.status(200).json({
      token: jwtToken,
      expiresIn: 3600,
      _id: user._id,
    })

  }
  catch (error) {
    return res.status(500).send("Authentification failed")
  }

/*
   userSchema.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        return res.status(401).json({
          message: 'Authentication failed',
        })
      }
      getUser = user
      return bcrypt.compare(req.body.password, user.password)
    })
    .then((response) => {
      if (!response) {
        return res.status(401).json({
          message: 'Authentication failed',
        })
      }
      
     
    })
    .catch((err) => {
      return res.status(401).json({
        message: 'Authentication failed',
      })
    })*/
})



//Get All Users
router.get("/list", async(req, res)=>{
  try{ 
      let users = await userSchema.find();
      res.end(JSON.stringify({status:"success", data:users}));
  }
  catch{
      res.end(JSON.stringify({status:"FAILED", data:"Something went wrong"}));
  }
});


// Get Single User
router.route('/user-profile/:id').get(authorize, (req, res, next) => {

  userSchema.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
  
})

// Update User
router.route('/update-user/:id').put((req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
        console.log('User successfully updated!')
      }
    },
  )
})

// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
  userSchema.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = router

