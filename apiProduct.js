const Product = require('./Products')
const express = require('express')

const { Router } = express

const product = new Product()

const router = Router()

router.get('/',(req,res)=>{
  const items = product.getAll()
  res.send(items)
})

router.get('/:id',(req,res)=>{
  const { id } = req.params
  const item = product.getById(id)

  if(typeof item === 'undefined'){
    res.json({'error':'producto no encontrado'}) 
  }else{
    res.json(item);
  }
})

router.post('/',(req,res)=>{
  const item = req.body
  product.save(item)
  res.json({'message':'producto se grabo '})
})

router.put('/:id',(req,res)=>{
  const {id} = req.params
  
  const itemUpdated = product.getById(id)

  if(typeof itemUpdated === 'undefined'){
    res.json({'error':'producto no encontrado'}) 
  }else{
    let item = req.body

    item = {id, ...item}

    product.save(item)
    res.json({'message':'Producto se actualizo satisfactoriamente'})  
  }  
})

router.delete('/:id',(req,res)=>{
  const {id} = req.params

  const item = product.getById(id)

  if(typeof item === 'undefined'){
    res.json({'error':'producto no encontrado'}) 
  }else{
    product.deleteById(id);
    const items = product.getAll()

    res.send(items)
  }
})

module.exports=router;