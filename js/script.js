var band = true;
var template = tabletemplate.innerHTML;
table.innerHTML = _.template(template,{estados:global.info.estados});
var map;

$(function(){
	map = new jvm.Map({
        container: $('#world-map'),
        map: 've_mill',
    
      	onRegionClick: function(event, code) {
            if(band == false){
                event.preventDefault();
            }
    	},
    	onRegionSelected: function(event, code, isSelected, selectedRegions) {
    		if(isSelected){
                global.origen = map.getRegionName(code);
                infectarEstado(code,'pink');
                generarPunto_rojo();
               map.clearSelectedRegions();
                console.log(global.origen);
                band=false;

                for (var i = 0; i < global.info.estados.length; i++) {
                    if(global.origen == global.info.estados[i].nombre){
                        global.info.estados[i].contagiados=global.info.estados[i].contagiados+1;
                        global.info.estados[i].poblacion=global.info.estados[i].poblacion-1;
                    }
                }
    		} 	
    	},
         series: {
            markers:[{
                 attribute: 'fill',
                scale: {
                    '>0':  '#ffcdd2',
                    '25%': '#e57373',
                    '50%': '#f44336',
                    '75%': '#d32f2f',
                    '100%': '#b71c1c'
                },
                legend: {
                  vertical: true
               }
            }],
            regions: [{
                attribute: 'fill',

            }]
        },
        regionsSelectable: true,
        regionsSelectableOne: true,
    	regionStyle:{
    		selected:{
    			fill:'#ffcdd2'
    		}
    	}
    });
});
var colorInicial = function(key){
             var colors = {};
            colors[key] = '#ffcdd2';
             return colors;
        };
var infectarEstado = function(code){
    obj = colorInicial(code);
    map.series.regions[0].setValues(obj);
}
var changeColor = function(code,color){
    var obj = {};
    obj[code]=color;
    map.series.regions[0].setValues(obj);
}
var getColor = function(code){
    obj=colorInicial(code);
var map = $('#world-map').vectorMap('get', 'mapObject');
var color = map.series.regions[0].scale.getValue(code);
console.log(color);
}
var getCodebyRegion = function(region){
    var find = _.where(global.info.estados,{nombre:region});
    return find[0].code;
}


//DIV Puntos ADN
var generarPunto_rojo = function(){
    var value = Math.floor((Math.random() * 3) + 1);
    var point = $('#puntos_red').text();
    value+=parseInt(point);
    document.getElementById("puntos_red").innerHTML = value;
    $('#bubble_red').removeClass('disabled');
}
var activarBoton_rojo = function(){
        global.info.puntos+=parseInt($('#puntos_red').text());
        document.getElementById("adn").innerHTML = global.info.puntos;
        document.getElementById("puntos_red").innerHTML = 0;
         $('#bubble_red').addClass('disabled');
}
var generarPunto_naranja = function(){
    var value = Math.floor((Math.random() * 3) + 1);
    var point = $('#puntos_orange').text();
    value+=parseInt(point);
    document.getElementById("puntos_orange").innerHTML = value;
    $('#bubble_orange').removeClass('disabled');
}
var activarBoton_naranja = function(){
        global.info.puntos+=parseInt($('#puntos_orange').text());
        document.getElementById("adn").innerHTML = global.info.puntos;
         document.getElementById("puntos_orange").innerHTML = 0;
         $('#bubble_orange').addClass('disabled');
}
var activarBoton_azul = function(){
    $('#bubble_blue').removeClass('disabled');
     $('#bubble_blue').on('click',function( ev ){
        ev.preventDefault();
        //Retrasar tasa de cura
    });
}

//$('#bubble_orange').removeClass('disabled');
//$('#bubble_orange').addClass('disabled');

adn.innerHTML = global.info.puntos;


//DIV Estadistica Población

function get_poblaciontotal(){

    var poblaciontotal=0;

 for (var i = 0; i < global.info.estados.length; i++) {
             poblaciontotal+=global.info.estados[i].poblacion;
         }

    return poblaciontotal;
}

function get_contagiadostotal(){

    var contagiadostotal=0;

 for (var i = 0; i < global.info.estados.length; i++) {
             contagiadostotal+=global.info.estados[i].contagiados;
         }

    return contagiadostotal;
}

function get_muertestotal(){

    var muertestotal=0;

 for (var i = 0; i < global.info.estados.length; i++) {
             muertestotal+=global.info.estados[i].muertes;
         }

    return muertestotal;
}
//global.info.poblacioninicial = get_poblaciontotal();
global.info.poblaciontotal=get_poblaciontotal();
global.info.contagiadostotal=get_contagiadostotal();
global.info.muertestotal=get_muertestotal();


pbtotal.innerHTML = global.info.poblaciontotal;
cttotal.innerHTML = global.info.contagiadostotal;
mttotal.innerHTML = global.info.muertestotal;

function get_porc_poblacion(){

    var porc_poblacion=0;

    porc_poblacion=(global.info.poblaciontotal/global.info.poblacioninicial)*100;

    return porc_poblacion;
}

function get_porc_contagiados(){

    var porc_contagiados=0;

    porc_contagiados=(global.info.contagiadostotal/global.info.poblacioninicial)*100;

    return porc_contagiados;
}

function get_porc_muertes(){

    var porc_muertes=0;

    porc_muertes=(global.info.muertestotal/global.info.poblacioninicial)*100;

    return porc_muertes;
}

global.info.porc_poblacion=get_porc_poblacion().toFixed();
global.info.porc_contagiados=get_porc_contagiados().toFixed();
global.info.porc_muertes=get_porc_muertes().toFixed();

document.getElementById("pbporcentaje").style.cssText = "width: "+global.info.porc_poblacion+"%;";
document.getElementById("ctporcentaje").style.cssText = "width: "+global.info.porc_contagiados+"%;";
document.getElementById("mtporcentaje").style.cssText = "width: "+global.info.porc_muertes+"%;";




//DIV Estadisticas de barras de porcentaje

global.info.porc_cura="100%";
porce_cura.innerHTML = global.info.porc_cura;



//-------SET INTERVAL---------


global.info.dias = 0;
global.info.iniciado = 0;
var i = 0;
var probabilidad_puntos;
global.info.puntos = 0;
var j = 0;
var k = 0;

var tasa_base_contagio = 0.05;
var tasa_base_muerte = 0.001;

function updateGame(){
    
    if(global.origen != undefined){ //no incia si no han elegido un estado
        
        if(global.info.iniciado == 0){          //setup inicial
            global.info.iniciado = 1;
            for(i = 0; i < global.info.estados.length; i++){
                if(global.info.estados[i].nombre === global.origen){
                
                global.info.puntos += 1;
                global.info.estados[i].infectado = 1;
                global.info.estados[i].cont_r++;
                global.info.estados[i].contagiados++;
                
                
                }
            }
        }
        else{                    
            document.getElementById("pbtotal").innerHTML = get_poblaciontotal();
            document.getElementById("cttotal").innerHTML = get_contagiadostotal();
            document.getElementById("mttotal").innerHTML = get_muertestotal();

            global.info.poblaciontotal=get_poblaciontotal();
            global.info.contagiadostotal=get_contagiadostotal();
            global.info.muertestotal=get_muertestotal();

            global.info.porc_poblacion=get_porc_poblacion().toFixed();
            global.info.porc_contagiados=get_porc_contagiados().toFixed();
            global.info.porc_muertes=get_porc_muertes().toFixed();

            document.getElementById("pbporcentaje").style.cssText = "width: "+global.info.porc_poblacion+"%;";
            document.getElementById("ctporcentaje").style.cssText = "width: "+global.info.porc_contagiados+"%; background-color: #FF0000";
            document.getElementById("mtporcentaje").style.cssText = "width: "+global.info.porc_muertes+"%; background-color: #190707";
                                //bucle principal del juego
        actualizarTiempo();              // avance de días
        generarADNRandom();     //intenta generar un punto para este día;
        matarContagiados();
        aumentarInfeccion();    //aumenta la infeccion en paises ya infectados, corroe la poblacion san
        contagiarOtrosPaises();  //recorre cada pais infectado e intenta contagiar un vecino sano
        chequearBotones();
        actualizarColores();
        }

    }
}

function matarContagiados(){
    for(i = 0; i < global.info.estados.length; i++){

        if(global.info.estados[i].infectado === 1 && global.info.estados[i].contagiados > 0){
        muertos = Math.random() * tasa_base_muerte * global.info.estados[i].contagiados;
        
        if(tasa_base_muerte > 0 && muertos < 1){
            rand = 100 * Math.random();
            
            if(rand <= tasa_base_muerte*100){
                muertos = 1;
            }

        }
        
        global.info.estados[i].contagiados -= Math.floor(muertos);
        global.info.estados[i].muertes += Math.floor(muertos);
    }
    }
}

function generarADNRandom(){
    probabilidad_puntos = Math.random()*100;
        if(probabilidad_puntos < 15){
            global.info.puntos++;
           // global.info.puntos++;
            document.getElementById("adn").innerHTML = global.info.puntos;
        }
}

function actualizarTiempo(){
    global.info.dias++;
    document.getElementById("dias").innerHTML = global.info.dias;
}

function aumentarInfeccion(){
    for(i = 0; i < global.info.estados.length; i++){

        if(global.info.estados[i].infectado === 1 && global.info.estados[i].poblacion > 0 && global.info.estados[i].contagiados > 0){

            global.info.estados[i].cont_r += global.info.estados[i].contagiados * tasa_base_contagio;
            contagiados_anterior = global.info.estados[i].contagiados;
            
            
            diferencia =  Math.floor(global.info.estados[i].cont_r) - contagiados_anterior;
            
            if(diferencia < global.info.estados[i].poblacion){
                global.info.estados[i].contagiados = Math.floor(global.info.estados[i].cont_r);
            }else{
                global.info.estados[i].contagiados += global.info.estados[i].poblacion - 1;
            }

            if(global.info.estados[i].poblacion - diferencia > 0){
                global.info.estados[i].poblacion -= diferencia;
            }else{
                global.info.estados[i].poblacion = 0;
            }
        }
    }

    table.innerHTML = _.template(template,{estados:global.info.estados});    
}

function contagiarOtrosPaises(){
    for(i = 0; i < global.info.estados.length; i++){
        if(global.info.estados[i].infectado === 1 &&
         (global.info.estados[i].contagiados /  
         (global.info.estados[i].contagiados + global.info.estados[i].poblacion)) >= 0.00001){
         
            indice_afectado = Math.floor(Math.random() * global.info.estados[i].adyacentes.length);
            for(j = 0; j < global.info.estados.length; j++){
                    if(global.info.estados[j].nombre == global.info.estados[i].adyacentes[indice_afectado]){
                        if(global.info.estados[j].infectado == 0 || global.info.estados[j].contagiados == 0){
                        global.info.estados[j].infectado = 1;
                        global.info.estados[j].cont_r++;
                        global.info.estados[j].contagiados++;
                        console.log(global.info.estados[j].nombre + 'Infectado');
                        infectarEstado(global.info.estados[j].code);
                        generarPunto_rojo();
                    }    
                }
            }
        }
    }
}
function actualizarColores(){
    for(i = 0; i < global.info.estados.length; i++){
        if(global.info.estados[i].contagiados >= global.info.states[i].poblacion*0.25){
            changeColor(global.info.estados[i].code,global.info.colors[1]);
        }
        if(global.info.estados[i].contagiados >= global.info.states[i].poblacion*0.50){
            changeColor(global.info.estados[i].code,global.info.colors[2]);
        }
        if(global.info.estados[i].contagiados >= global.info.states[i].poblacion*0.75){
            changeColor(global.info.estados[i].code,global.info.colors[3]);
        }
        if(global.info.estados[i].contagiados >= global.info.states[i].poblacion){
            changeColor(global.info.estados[i].code,global.info.colors[4]);
        }
    }
}

function chequearBotones(){
    

    //Transmision

    //aire1
    if(global.info.puntos>=document.getElementById("aire1adn").innerHTML && global.info.aire1==0){
        document.getElementById("aire1").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_aire1").disabled = false;
        }else{
            document.getElementById("aire1").className = "circle responsive-img burbuja desaturada";
            document.getElementById("boton_aire1").disabled = true;  
        }

    if(global.info.aire1==1){
        document.getElementById("aire1").className = "circle responsive-img burbuja no-desaturada";
    }

    //aire2
    if(global.info.puntos>=document.getElementById("aire2adn").innerHTML && global.info.aire1==1 && global.info.aire2==0){
        document.getElementById("aire2").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_aire2").disabled = false;
    }else{
        document.getElementById("aire2").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_aire2").disabled = true;
    }
    if(global.info.aire2==1){
        document.getElementById("aire2").className = "circle responsive-img burbuja no-desaturada";
    }

    //agua1
    if(global.info.puntos>=document.getElementById("agua1adn").innerHTML && global.info.agua1==0){
        document.getElementById("agua1").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_agua1").disabled = false;
    }else{
        document.getElementById("agua1").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_agua1").disabled = true;
    }

    if(global.info.agua1==1){
        document.getElementById("agua1").className = "circle responsive-img burbuja no-desaturada";
    }

    //agua2
    if(global.info.puntos>=document.getElementById("agua2adn").innerHTML && global.info.agua2==0 && global.info.agua1==1){
        document.getElementById("agua2").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_agua2").disabled = false;
    }else{
        document.getElementById("agua2").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_agua2").disabled = true;
    }
     
    if(global.info.agua2==1){
        document.getElementById("agua2").className = "circle responsive-img burbuja no-desaturada";
    }

    //animal1
    if(global.info.puntos>=document.getElementById("animal1adn").innerHTML && global.info.animal1==0){
        document.getElementById("animal1").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_animal1").disabled = false;
    }else{
        document.getElementById("animal1").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_animal1").disabled = true;
    }

    if(global.info.animal1==1){
        document.getElementById("animal1").className = "circle responsive-img burbuja no-desaturada";
    }

    //animal2
    if(global.info.puntos>=document.getElementById("animal2adn").innerHTML && global.info.animal2==0 && global.info.animal1==1){
        document.getElementById("animal2").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_animal2").disabled = false;
    }else{
        document.getElementById("animal2").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_animal2").disabled = true;
    }

    if(global.info.animal2==1){
        document.getElementById("animal2").className = "circle responsive-img burbuja no-desaturada";
    }

    //Sintomas


    //tos
    if(global.info.puntos>=document.getElementById("tosadn").innerHTML && global.info.tos==0){
        document.getElementById("tos").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_tos").disabled = false;
        }else {
            document.getElementById("tos").className = "circle responsive-img burbuja desaturada";
            document.getElementById("boton_tos").disabled = true;
        }

    if(global.info.tos==1){
        document.getElementById("tos").className = "circle responsive-img burbuja no-desaturada";
    }

    //neumonia
    if(global.info.puntos>=document.getElementById("neumoniaadn").innerHTML && global.info.tos==1 && global.info.neumonia==0){
        document.getElementById("neumonia").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_neumonia").disabled = false;
    }else{
        document.getElementById("neumonia").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_neumonia").disabled = true;
    }

    if(global.info.neumonia==1){
        document.getElementById("neumonia").className = "circle responsive-img burbuja no-desaturada";
    }

    //fibrosis
    if(global.info.puntos>=document.getElementById("fibrosisadn").innerHTML && global.info.fibrosis==0 && global.info.neumonia==1){
        document.getElementById("fibrosis").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_fibrosis").disabled = false;
    }else{
        document.getElementById("fibrosis").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_fibrosis").disabled = true;
    }

    if(global.info.fibrosis==1){
        document.getElementById("fibrosis").className = "circle responsive-img burbuja no-desaturada";
    }

    //diarrea
    if(global.info.puntos>=document.getElementById("diarreaadn").innerHTML && global.info.diarrea==0){
        document.getElementById("diarrea").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_diarrea").disabled = false;
    }else{
        document.getElementById("diarrea").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_diarrea").disabled = true;
    }
    

    if(global.info.diarrea==1){
    document.getElementById("diarrea").className = "circle responsive-img burbuja no-desaturada";
    }

        //anemia
    if(global.info.puntos>=document.getElementById("anemiaadn").innerHTML && global.info.anemia==0 && global.info.diarrea==1 && global.info.tos==1){
        document.getElementById("anemia").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_anemia").disabled = false;
    }else{
        document.getElementById("anemia").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_anemia").disabled = true;
    }

    if(global.info.anemia==1){
        document.getElementById("anemia").className = "circle responsive-img burbuja no-desaturada";
    }

     //hemorragia
    if(global.info.puntos>=document.getElementById("hemorragiaadn").innerHTML && global.info.hemorragia==0 && global.info.anemia==1){
        document.getElementById("hemorragia").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_hemorragia").disabled = false;
    }else{
        document.getElementById("hemorragia").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_hemorragia").disabled = true;
    }

    if(global.info.hemorragia==1){
        document.getElementById("hemorragia").className = "circle responsive-img burbuja no-desaturada";
    }

    //insomnio
    if(global.info.puntos>=document.getElementById("insomnioadn").innerHTML && global.info.insomnio==0){
        document.getElementById("insomnio").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_insomnio").disabled = false;
    }else{
        document.getElementById("insomnio").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_insomnio").disabled = true;
    }

    if(global.info.insomnio==1){
        document.getElementById("insomnio").className = "circle responsive-img burbuja no-desaturada";
    }


    //locura
    if(global.info.puntos>=document.getElementById("locuraadn").innerHTML && global.info.locura==0 && global.info.insomnio==1){
        document.getElementById("locura").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_locura").disabled = false;
    }else{
        document.getElementById("locura").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_locura").disabled = true;
    }

    if(global.info.locura==1){
        document.getElementById("locura").className = "circle responsive-img burbuja no-desaturada";
    }


    //cerebro
    if(global.info.puntos>=document.getElementById("cerebroadn").innerHTML && global.info.cerebro==0 && global.info.locura==1 && global.info.anemia==1){
        document.getElementById("cerebro").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_cerebro").disabled = false;
    }else{
        document.getElementById("cerebro").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_cerebro").disabled = true;
    }

    if(global.info.cerebro==1){
        document.getElementById("cerebro").className = "circle responsive-img burbuja no-desaturada";
    }

  


    //Resistencia


    //frio1
    if(global.info.puntos>=document.getElementById("frio1adn").innerHTML && global.info.frio1==0){
        document.getElementById("frio1").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_frio1").disabled = false;
        }else{
            document.getElementById("frio1").className = "circle responsive-img burbuja desaturada";
            document.getElementById("boton_frio1").disabled = true;
        }


    if(global.info.frio1==1){
        document.getElementById("frio1").className = "circle responsive-img burbuja no-desaturada";
    }

    //frio2
    if(global.info.puntos>=document.getElementById("frio2adn").innerHTML && global.info.frio1==1 && global.info.frio2==0){
        document.getElementById("frio2").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_frio2").disabled = false;
    }else{
        document.getElementById("frio2").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_frio2").disabled = true;
    }

    if(global.info.frio2==1){
        document.getElementById("frio2").className = "circle responsive-img burbuja no-desaturada";
    }


    //calor1
    if(global.info.puntos>=document.getElementById("calor1adn").innerHTML && global.info.calor1==0){
        document.getElementById("calor1").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_calor1").disabled = false;
    }else{
        document.getElementById("calor1").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_calor1").disabled = true;
    }
        
    


    if(global.info.calor1==1){
        document.getElementById("calor1").className = "circle responsive-img burbuja no-desaturada";
    }

    //calor2
    if(global.info.puntos>=document.getElementById("calor2adn").innerHTML && global.info.calor2==0 && global.info.calor1==1){
        document.getElementById("calor2").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_calor2").disabled = false;
    }else{
        document.getElementById("calor2").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_calor2").disabled = true;
    }

    if(global.info.calor2==1){
        document.getElementById("calor2").className = "circle responsive-img burbuja no-desaturada";
    }

    //medicamento1
    if(global.info.puntos>=document.getElementById("medicamento1adn").innerHTML && global.info.medicamento1==0){
        document.getElementById("medicamento1").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_medicamento1").disabled = false;
    }else{
        document.getElementById("medicamento1").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_medicamento1").disabled = true;
    }
    

    if(global.info.medicamento1==1){
        document.getElementById("medicamento1").className = "circle responsive-img burbuja no-desaturada";
    }


    //medicamento2
    if(global.info.puntos>=document.getElementById("medicamento2adn").innerHTML && global.info.medicamento2==0 && global.info.medicamento1==1){
        document.getElementById("medicamento2").className = "circle responsive-img burbuja medio-desaturada";
        document.getElementById("boton_medicamento2").disabled = false;
    }else{
        document.getElementById("medicamento2").className = "circle responsive-img burbuja desaturada";
        document.getElementById("boton_medicamento2").disabled = true;
    }

    

    if(global.info.medicamento2==1){
        document.getElementById("medicamento2").className = "circle responsive-img burbuja no-desaturada";
    }


}


function adquirir_aire1(){
    console.log("click aire 1");
    global.info.puntos -= document.getElementById("aire1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.aire1=1;
    document.getElementById("boton_aire1").disabled = true;
}


//aire2
function adquirir_aire2(){
    console.log("click aire 2");
    global.info.puntos -= document.getElementById("aire2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.aire2=1;
    document.getElementById("boton_aire2").disabled = true;
}



//agua1   
function adquirir_agua1(){
    console.log("click agua 1");
    global.info.puntos -= document.getElementById("agua1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.agua1=1;
    document.getElementById("boton_agua1").disabled = true;
}

//agua2

function adquirir_agua2(){
    console.log("click agua 2");
    global.info.puntos -= document.getElementById("agua2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.agua2=1;
    document.getElementById("boton_agua2").disabled = true;
}


//animal1

function adquirir_animal1(){
    console.log("click animal 1");
    global.info.puntos -= document.getElementById("animal1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.animal1=1;
    document.getElementById("boton_animal1").disabled = true;
}

//animal2

function adquirir_animal2(){
    console.log("click animal 2");
    global.info.puntos -= document.getElementById("animal2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.animal2=1;
    document.getElementById("boton_animal2").disabled = true;
}

//Sintomas


//tos
function adquirir_tos(){
    console.log("click tos");
    global.info.puntos -= document.getElementById("tosadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.tos=1;
    document.getElementById("boton_tos").disabled = true;
}

//neumonia

function adquirir_neumonia(){
    console.log("click neumonia");
    global.info.puntos -= document.getElementById("neumoniaadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.neumonia=1;
    document.getElementById("boton_neumonia").disabled = true;
}

//fibrosis

function adquirir_fibrosis(){
    console.log("click fibrosis");
    global.info.puntos -= document.getElementById("fibrosisadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.fibrosis=1;
    document.getElementById("boton_fibrosis").disabled = true;
}


//diarrea
    
function adquirir_diarrea(){
    console.log("click diarrea");
    global.info.puntos -= document.getElementById("diarreaadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.diarrea=1;
    document.getElementById("boton_diarrea").disabled = true;
}

//anemia

function adquirir_anemia(){
    console.log("click anemia");
    global.info.puntos -= document.getElementById("anemiaadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.anemia=1;
    document.getElementById("boton_anemia").disabled = true;
}

//hemorragia

function adquirir_hemorragia(){
    console.log("click hemorragia");
    global.info.puntos -= document.getElementById("hemorragiaadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.hemorragia=1;
    document.getElementById("boton_hemorragia").disabled = true;
}

//insomnio

function adquirir_insomnio(){
    console.log("click insomnio");
    global.info.puntos -= document.getElementById("insomnioadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.insomnio=1;
    document.getElementById("boton_insomnio").disabled = true;
}


//locura

function adquirir_locura(){
    console.log("click locura");
    global.info.puntos -= document.getElementById("locuraadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.locura=1;
    document.getElementById("boton_locura").disabled = true;
}

//cerebr

function adquirir_cerebro(){
    console.log("click cerebro");
    global.info.puntos -= document.getElementById("cerebroadn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.cerebro=1;
    document.getElementById("boton_cerebro").disabled = true;
}





//Resistencia


//frio1


function adquirir_frio1(){
    console.log("click frio 1");
    global.info.puntos -= document.getElementById("frio1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.frio1=1;
    document.getElementById("boton_frio1").disabled = true;
}



//frio2


function adquirir_frio2(){
    console.log("click frio 2");
    global.info.puntos -= document.getElementById("frio2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.frio2=1;
    document.getElementById("boton_frio2").disabled = true;
}




//calor1

    
function adquirir_calor1(){
    console.log("click calor 1");
    global.info.puntos -= document.getElementById("calor1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.calor1=1;
    document.getElementById("boton_calor1").disabled = true;
}




//calor2

 
function adquirir_calor2(){
    console.log("click calor 2");
    global.info.puntos -= document.getElementById("calor2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.calor2=1;
    document.getElementById("boton_calor2").disabled = true;
}




//medicamento1

function adquirir_medicamento1(){
    console.log("click medicamento 1");
    global.info.puntos -= document.getElementById("medicamento1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.medicamento1=1;
    document.getElementById("boton_medicamento1").disabled = true;
}



//medicamento2


function adquirir_medicamento2(){
    console.log("click medicamento 2");
    global.info.puntos -= document.getElementById("medicamento2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.medicamento2=1;
    document.getElementById("boton_medicamento2").disabled = true;
}



setInterval(updateGame, 100);