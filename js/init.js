var virus;
if (typeof(global.info) === 'undefined') {
    global.info = {};
    global.info.zulia = '4323467';
    global.info.miranda = '3992374';
    global.info.carabobo ='3315506';
  	global.info.distritocapital ='3137710';
  	global.info.lara= '2219211';
  	global.info.aragua = '1976470';
  	global.info.bolivar = '1874190';
    global.info.anzoategui = '1788329'; 	
    global.info.tachira = '1578108'; 
    global.info.sucre = '1071017';
    global.info.falcon = '1029638'; 
    global.info.portuguesa = '1012781'; 
    global.info.monagas = '998024';  
    global.info.merida = '992971'; 	
    global.info.barinas = '989439'; 
    global.info.guarico = '870951';
    global.info.trujillo = '787988 '; 
    global.info.yaracuy = '693876'; 
    global.info.apure = '587056';  
    global.info.nueva_esparta = '552011'; 
    global.info.vargas = '398018'; 
    global.info.cojedes = '348022'; 
    global.info.delta_macuro = '187022'; 
    global.info.amazonas = '178670'; 
    global.info.dep_fed = '6500'; 
}
$('#jugar').on('click',function( ev ){
    ev.preventDefault();
    var element = $('#nombre_virus');
    if(element.val() === ''){
      alert('No se puede comenzar el juego sin definir un nombre.');
    }else{
        virus = element.val();
        global.info.virus = virus;
        console.log(global.info.virus);
        window.location.href = "../html/game.html";
    }
});