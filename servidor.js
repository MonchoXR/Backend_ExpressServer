const express = require('express')

const servidor = express()



function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = servidor.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}

function getProductos(productos) {
    return new Promise((resolve, reject) => {

       const getProd=  servidor.get('/productos', (peticion, respuesta) => {
            resolve(respuesta.json(productos))
        })    
        getProd.on("error prod", error => reject(error))
    })
}

function getRandomProd(RandomProd) {
    return new Promise((resolve, reject) => {

        const getProdrandom =  servidor.get('/productoRandom', (peticion, respuesta) => {
            resolve(respuesta.json(RandomProd))
        })
        getProdrandom.on("error prodRandom", error => reject(error))
    })
}

module.exports = { conectar,getProductos,getRandomProd }
