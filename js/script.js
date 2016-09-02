var band = true;
$(function(){
	
    $('#world-map').vectorMap({
      	map: 've_mill',
      	onRegionClick: function(event, code) {
        	
    	},
    	onRegionSelected: function(event, code, isSelected, selectedRegions) {
    		if(isSelected){
    			console.log(code);
    			band = false;
    		} 	
    	},
    	regionsSelectable: band,
    	regionStyle:{
    		selected:{
    			fill:'red'
    		}
    	}
  	});
});
