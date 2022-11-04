const express = require('express')

const servidor = express()

//****************INICIO CONTENEDOR ARCHIVO*********************** */
const fs = require('fs')
let misProductos = [
	{
		
		id:0,
        title: "Pan",
        price: 20,
	
	},
    {
		
		id:0,
        title: "Azucar",
        price: 150,

	},

    {
		
		id:0,
        title: "Aceite",
        price: 250,

	},

    {
		
		id:0,
        title: "sal",
        price: 250,

	},


];




class ContenedorArchivo {
    constructor(productos =[],ruta){
        this.ruta = ruta
        this.productos =productos
    }

    async save(miProducto){

        try{
           
            if(this.productos.length===0)
            {
                miProducto.id =1;
            }
            else
            {
                miProducto.id = this.productos.length+1
             
            }

         
            this.productos.push(miProducto)
            await fs.promises.writeFile(this.ruta, JSON.stringify(this.productos,null,2))
     
        
        } catch(error){
            console.log(error)
        }

        
    }

    async getById(Number){

        this.productos = await this.getAll()
       const producto = this.productos.find(e => e.id == Number)
       
           if(producto ){
            return(producto)
           }
           
            else{
              console.log("producto no existe")
            }
        }

    async getAll(){

        this.productos = JSON.parse(await fs.promises.readFile(this.ruta, 'utf-8'))
   
        return(this.productos)
    }

    async getProdRandom(){

        this.productos = await this.getAll()
    
        return(this.productos[Object.keys(this.productos)[Math.floor(Math.random()*Object.keys(this.productos).length)]])
    }

    async deleteByiId(Numer){

        this.productos = await this.getAll()
        const index = this.productos.findIndex((a) => a.id === Numer  );
        this.productos.splice(index, 1)

        await fs.promises.writeFile(this.ruta, JSON.stringify( this.productos,null,2))
    }

    async deleteAll(){
        await fs.promises.writeFile(this.ruta, '[]')
    }

}

    

async function save() {

    const rutaArchivo = './productos.txt'
await fs.promises.writeFile(rutaArchivo, '[]')

const contenedor = new ContenedorArchivo([],rutaArchivo)


    await contenedor.save(misProductos[0]);   
    await contenedor.save(misProductos[1]);
    await contenedor.save(misProductos[2]);
    await contenedor.save(misProductos[3]);

    servidor.get('/productos', async (peticion, respuesta) =>{
        respuesta.json(await contenedor.getAll())
    })
    
    servidor.get('/productoRandom', async (peticion, respuesta) =>{
        respuesta.json(await contenedor.getProdRandom())
    })
    
}
save()
//****************FIN CONTENEDOR ARCHIVO*********************** */




function conectar(puerto = 0) {
    return new Promise((resolve, reject) => {
        const servidorConectador = servidor.listen(puerto, () => {
            resolve(servidorConectador)
        })
        servidorConectador.on("error", error => reject(error))
    })
}



module.exports = { conectar}
