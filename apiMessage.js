const Message = require('./Message')
const express = require('express')

const { Router } = express

const messages = new Message('messages.txt')

const router = Router()

router.get('/', async(req,res)=>{
  const items = await messages.getAll()
  res.send(items)
})

router.post('/',async (req,res)=>{
  const {email, message} = req.body
  const date = new Date(Date.now()).toLocaleDateString() + " " + new Date(Date.now()).toLocaleTimeString()
 

  await messages.save({
    email,
    date,
    message
  })

  res.json({'message':'message saved'})
})




module.exports=router;