import express from "express"

const{Router} = express

import{
    productosDao as productosApi,
    carritosDao as carritosApi
 }from './daos/index.js'

const app = express()

const esAdmin=true
function crearErrorNoEsAdmin(ruta, metodo){
    const error={
        error: -1,}
    if (ruta && metodo){
        error.descripcion= `ruta '${ruta}' metodo '${metodo}' no autorizado `}
    else {
        error.descripcion='no autorizado'
    }
      return error
    }

      function soloAdmins (req, res, next){
      if (!esAdmin){
         res.json(crearErrorNoEsAdmin())
      }else{
        next ()}}

    //   --------------------------------------

    const productosRouter=new Router()
productosRouter.get('/', async (req, res) =>{
    const productos=await productosApi.listarAll()
    res.json(productos)
})
productosRouter.get('/:id', async (req, res) =>{
    res.json(await productosApi.listar(req.params.id))
})
productosRouter.post('/', soloAdmins, async (req, res) =>{
    res.json(await productosApi.guardar(req.body))
})
productosRouter.put('/:id', soloAdmins, async (req, res) =>{
    res.json(await productosApi.actualizar(req.body))
})
productosRouter.delete('/:id', soloAdmins, async (req, res) =>{
    res.json(await productosApi.borrar(req.params.id))
})


// configuro router de carritos

const carritosRouter = new Router()
carritosRouter.get('/', async (req, res) =>{
    res.json( (await carritosApi.listarAll()).map(c => c.id))
}) 
carritosRouter.post('/', async (req, res) =>{
    res.json(await carritosApi.guardar())
})
carritosRouter.delete('/:id', async (req, res) =>{
    res.json(await carritosApi.borrar (req.params.id))
})

// router de prodcuctos carrito