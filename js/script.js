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
                    '30%': 'pink',
                    '50%': 'red'
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
    			fill:'pink'
    		}
    	}
    });
});
var colorInicial = function(key){
             var colors = {};
            colors[key] = 'pink';
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

var activarBoton_rojo = function(){
    $('#bubble_red').removeClass('disabled');
    $('#bubble_red').on('click',function( ev ){
        ev.preventDefault();
        value= 3;
        global.info.puntos+= value;
        document.getElementById("adn").innerHTML = global.info.puntos;
         $('#bubble_red').addClass('disabled');
    });
}
var activarBoton_naranja = function(){
      $('#bubble_orange').removeClass('disabled');
    $('#bubble_orange').on('click',function( ev ){
        ev.preventDefault();
        value= 3;
        global.info.puntos+= value;
        document.getElementById("adn").innerHTML = global.info.puntos;
         $('#bubble_orange').addClass('disabled');
    });
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


//DIV Virus - transmision - sintomas - resistencia

//Transimision

//aire1
if(global.info.puntos>=document.getElementById("aire1adn").innerHTML && global.info.aire1==0){
    document.getElementById("aire1").className = "circle responsive-img burbuja no-desaturada";
    document.getElementById("boton_aire1").disabled = false;
    //document.getElementById('aire1').removeClass('desaturada');
    }

function adquirir_aire1(){
    console.log("click aire 1");
    global.info.puntos -= document.getElementById("aire1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.aire1=1;
    document.getElementById("boton_aire1").disabled = true;
}

if(global.info.aire1==1){
    document.getElementById("aire1").className = "circle responsive-img burbuja no-desaturada";
}

//aire2
if(global.info.puntos>=document.getElementById("aire2adn").innerHTML && global.info.aire1==1 && global.info.aire2==0){
    document.getElementById("aire2").className = "circle responsive-img burbuja no-desaturada";
    document.getElementById("boton_aire2").disabled = false;
}

function adquirir_aire2(){
    console.log("click aire 2");
    global.info.puntos -= document.getElementById("aire2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.aire2=1;
    document.getElementById("boton_aire2").disabled = true;
}

if(global.info.aire2==1){
    document.getElementById("aire2").className = "circle responsive-img burbuja no-desaturada";
}



//agua1
if(global.info.puntos>document.getElementById("agua1adn").innerHTML && global.info.agua1==0){
    document.getElementById("agua1").className = "circle responsive-img burbuja no-desaturada";
    document.getElementById("boton_agua1").disabled = false;
}
    
function adquirir_agua1(){
    console.log("click agua 1");
    global.info.puntos -= document.getElementById("agua1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.agua1=1;
    document.getElementById("boton_agua1").disabled = true;
}


if(global.info.agua1==1){
    document.getElementById("agua1").className = "circle responsive-img burbuja no-desaturada";
}

//agua2
if(global.info.puntos>document.getElementById("agua2adn").innerHTML && global.info.agua2==0 && global.info.agua1==1){
    document.getElementById("agua2").className = "circle responsive-img burbuja no-desaturada";
    document.getElementById("boton_agua2").disabled = false;
}
 
function adquirir_agua2(){
    console.log("click agua 2");
    global.info.puntos -= document.getElementById("agua2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.agua2=1;
    document.getElementById("boton_agua2").disabled = true;
}


if(global.info.agua2==1){
    document.getElementById("agua2").className = "circle responsive-img burbuja no-desaturada";
}

//animal1
if(global.info.puntos>document.getElementById("animal1adn").innerHTML && global.info.animal1==0){
    document.getElementById("animal1").className = "circle responsive-img burbuja no-desaturada";
    document.getElementById("boton_animal1").disabled = false;
}

function adquirir_animal1(){
    console.log("click animal 1");
    global.info.puntos -= document.getElementById("animal1adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.animal1=1;
    document.getElementById("boton_animal1").disabled = true;
}

if(global.info.animal1==1){
    document.getElementById("animal1").className = "circle responsive-img burbuja no-desaturada";
}

//animal2
if(global.info.puntos>document.getElementById("animal2adn").innerHTML && global.info.animal2==0 && global.info.animal1==1){
    document.getElementById("animal2").className = "circle responsive-img burbuja no-desaturada";
    document.getElementById("boton_animal2").disabled = false;
}

function adquirir_animal2(){
    console.log("click animal 2");
    global.info.puntos -= document.getElementById("animal2adn").innerHTML;
    document.getElementById("adn").innerHTML = global.info.puntos;
    global.info.animal2=1;
    document.getElementById("boton_animal2").disabled = true;
}

if(global.info.animal2==1){
    document.getElementById("animal2").className = "circle responsive-img burbuja no-desaturada";
}

//Sintomas

//Resistencia


//DIV Estadisticas de barras de porcentaje

global.info.porc_cura="100%";
porce_cura.innerHTML = global.info.porc_cura;
