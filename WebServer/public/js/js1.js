/*const getData = () =>{
    axios.get('/nodos').then(response =>{
        console.log(response);

    });
};*/

let getData = async() =>{
    let a = await axios.get('/nodos');
    return a.data;
}

let getDataNodo = async(id) =>{
    let a = await axios.get('/datosT/' + id);
    return a.data;
}

async function iniciarMap(){
    let datos_comunas =  await getData();
    var comunas = [];
    let array;

    let info_comunas = [];

    datos_comunas.forEach(element => {
        array = [];
        array = [element.id_nodo, element.nodo, element.latitud, element.longitud];
        comunas.push(array);

    });
    const L = comunas.length;
    for(var i = 0; i<L; i++){

        var dato = comunas[i];
        info_comunas.push(await getDataNodo(dato[0]));
        


    }
    console.log(info_comunas[0]);

    var coord = {lat:3.4112875 ,lng:-76.532408};
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 12,
      center: coord
    });

    let markers = [];

    var sdasda = new google.maps.InfoWindow();
    comunas.forEach(async(element,index) => {
        if(element[2] != "0.0" && element[3] != "0.0"){
            var marker = new google.maps.Marker({
                position: {lat: parseFloat(element[2]), lng: parseFloat(element[3])},
                map,
                title: element[1]
            });
            markers.push(marker);
            
            (function(marker){
                google.maps.event.addListener(marker, 'click', ()=>{
                    console.log(index);
                    let dato = info_comunas[index];
                    Contenido = "<h3>"+ dato.nodo +"</h3><p>"+ dato.lastact  + "</p><hr><h5>Indice UV: " + dato.radiacion + "</h5><p>" + dato.indiceuv +"</p><hr><h5>Sensación térmica: " + dato.dsensacion + "</h5><p>"+ dato.sensacion +"</p>";
                    sdasda.setContent(Contenido);
                    sdasda.open(map,marker);
                });
            })(marker, element)
        }
    });
    /*
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });*/
}


