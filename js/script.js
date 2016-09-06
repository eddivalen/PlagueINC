var band = true;
var template = tabletemplate.innerHTML;
table.innerHTML = _.template(template,{estados:global.info.estados});

$(function(){
    var map,
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

        regionsSelectable: true,
        regionsSelectableOne: true,
    	regionStyle:{
    		selected:{
    			fill:'pink'
    		}
    	}
    });
});


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

porce_poblacion.innerHTML = global.info.porc_poblacion+"%";
porce_contagiados.innerHTML = global.info.porc_contagiados+"%";
porce_muertes.innerHTML = global.info.porc_muertes+"%";

document.getElementById("pbporcentaje").style.cssText = "width: "+global.info.porc_poblacion+"%;";
document.getElementById("ctporcentaje").style.cssText = "width: "+global.info.porc_contagiados+"%;";
document.getElementById("mtporcentaje").style.cssText = "width: "+global.info.porc_muertes+"%;";
