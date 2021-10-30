const axios = require('axios');

base_ip = "http://localhost:9000";

let getNodos = async() =>{

    ruta = "/nodos";
    datos = await axios.get(base_ip + ruta);
    return datos.data;

}

let getNodo = async(id) =>{

    ruta = "/nodo/" + id;
    datos = await axios.get(base_ip + ruta);
    return datos.data[0];

}

let getUbicacion = async(id) =>{

    ruta = "/Nodoubicacion/" + id;
    datos = await axios.get(base_ip + ruta);
    return datos.data[0];

}

let getDatos = async(id) =>{

    ruta = "/datos/nodo/" + id;
    datos = await axios.get(base_ip + ruta);
    return datos.data;

}

let getDatosSeg = async(id, fechas) =>{

    ruta = "/datos/nodo/seg/" + id;
    datos = await axios.post(base_ip + ruta, fechas);
    return datos.data;

}

let getNodoDato = async(id) =>{

    ruta = "/datosT/" + id;
    datos = await axios.get(base_ip + ruta);
    return datos.data;

}

let getUbis = async() =>{
    ruta = "/nodoT";
    datos = await axios.get(base_ip + ruta);
    return datos.data;
}

module.exports = {
    getNodos,
    getNodo,
    getUbicacion,
    getDatos,
    getDatosSeg,
    getNodoDato,
    getUbis
}