var band = true;
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
    		} 	
    	},
        regionsSelectable: true,
        regionsSelectableOne: true,
    	regionStyle:{
    		selected:{
    			fill:'red'
    		}
    	}
    });
});
