const {Router} = require('express');
const router = Router();
const db = require('../db.js');
const api = require('../api.js');
//const axios = require('axios');

const url_api = "http://localhost:9000";

router.get('/', (req,res)=>{
    res.redirect('/login');
})

router.get('/login', (req,res) =>{

    res.render('index.pug');

});

router.get('/login/cerrar', (req,res) =>{

    delete req.session.usuario;
    res.redirect('/login');

});

router.post('/login/validar', async(req,res) =>{

    var datos = req.body;

    var errores = 0;

    if(datos.correo == ""){
        errores = errores + 1;
    }
    if(datos.password == ""){
        errores = errores + 1;
    }
    if(errores == 0){

        try{
            
            var usuario = await db.getOne(datos.correo);
            usuario = usuario[0]; 
            if(usuario.password == datos.password){
                req.session.usuario = usuario;
                res.redirect('/main')
            }else{
                res.redirect('/login');
            }

        }catch{
            res.redirect('/login');
        }  

    }

    res.redirect('login');

});

router.get('/registro', (req,res) =>{

    res.render('registro.pug');

});

router.post('/registro/validar', async (req,res) =>{

    var datos = req.body;

    var errores = 0;

    if(datos.correo == ""){
        errores = errores + 1;
    }
    if(datos.password == ""){
        errores = errores + 1;
    }
    if(errores == 0){
        datos.tipo = 1;
        await db.insertOne(datos);
    }

    res.redirect('/login');

});

router.get('/main', async (req,res)=>{

    const usuario = req.session.usuario;

    if(usuario){
        console.log(usuario);
        res.render('main.pug', {
            usuario
        });
    }else{
        res.redirect('/login');
    }

});

router.get('/administrar', async(req,res)=>{

    const usuario = req.session.usuario;

    if(usuario){

        if(usuario.tipo == 2){
            datos = await api.getNodos();

            res.render('adminnodos.pug', {
                usuario,
                datos,
                url_api
            });   

        }else{
            res.redirect('/main');
        }

   

    }else{
        res.redirect('/login');
    }

})

router.get('/administrar/editar/:id', async(req,res) =>{

    const usuario = req.session.usuario;

    if(usuario){

        if(usuario.tipo == 2){
            id = req.params.id

            ubi = await api.getUbicacion(id);

            dato = await api.getNodo(id);
            console.log(datos);
            res.render('editar.pug', {
                usuario,
                dato,
                url_api,
                ubi
            });
        }else{
            res.redirect('/main');
        }


    }else{
        res.redirect('/login');
    }



})

router.get('/administrar/eliminar/:id', async(req,res) =>{

    const usuario = req.session.usuario;

    if(usuario){

        if(usuario.tipo == 2){
            id = req.params.id

            dato = await api.getNodo(id);
            console.log(datos);
            res.render('eliminar.pug', {
                usuario,
                dato,
                url_api
            });
        }else{
            res.redirect('/main');
        }


    }else{
        res.redirect('/login');
    }
})

router.get('/Eliminacion/:id', async(req,res) =>{

    const usuario = req.session.usuario;

    if(usuario){

        if(usuario.tipo == 2){
            var id = req.params.id
            res.redirect(url_api + "/eliminar/" + id);

        }else{
            res.redirect('/main');
        }


    }else{
        res.redirect('/login');
    }

})

router.get('/historicos', async(req,res)=>{

    const usuario = req.session.usuario;

    if(usuario){

        if(usuario.tipo == 2){
            datos = await api.getNodos();

            res.render('historicos.pug', {
                usuario,
                datos,
                url_api
            });   

        }else{
            res.redirect('/main');
        }

   

    }else{
        res.redirect('/login');
    }

})

router.get('/historicos/:id', async(req,res)=>{

    const usuario = req.session.usuario;

    if(usuario){
        var id = req.params.id;

        if(usuario.tipo == 2){
            total = await api.getDatos(id);
            nodo = total[0];
            datos = total[1];
            res.render('historico.pug', {
                usuario,
                datos,
                nodo,
                url_api
            });   

        }else{
            res.redirect('/main');
        }

   

    }else{
        res.redirect('/login');
    }

})

router.get('/p/:id', async(req,res)=>{

    var id = req.params.id;
    total = await api.getDatos(id);
    nodo = total[0];
    datos = total[1];
    console.log(total);
    console.log(nodo);
    console.log(datos);
    res.send(total);
})

router.post('/historicos/buscar/:id', async(req,res) =>{
    const usuario = req.session.usuario;

    if(usuario){
        var id = req.params.id;

        var fechas = req.body;

        if(usuario.tipo == 2){
            try{
                total = await api.getDatosSeg(id, fechas);
                nodo = total[0];
                datos = total[1];
                res.render('historico.pug', {
                    usuario,
                    datos,
                    nodo,
                    url_api
                });   
            }catch(error){
                res.redirect('/historicos');
            }


        }else{
            res.redirect('/main');
        }

   

    }else{
        res.redirect('/login');
    }

});

router.get('/nodos', async (req,res) =>{

    let datos = await api.getUbis();
    res.send(datos);

})

router.get('/datosT/:id', async(req,res) =>{

    let id  = req.params.id;
    console.log(id);
    let datos = await api.getNodoDato(id);
    res.send(datos);

})

module.exports = router