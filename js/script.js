$(function(){
    $('#world-map').vectorMap({
      	map: 've_mill',
      
      	onRegionClick: function (event, code) {
    	var regionName = map.getRegionName(code);
		}
  	});
});
