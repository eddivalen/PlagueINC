var virus;
if (typeof(global.info) === 'undefined') {
    global.info = {};
    global.info.estados = [
    {nombre:'Zulia',poblacion:4323467,contagiados:0,muertes:0},
    {nombre:'Miranda',poblacion:3992374,contagiados:0,muertes:0},
    {nombre:'Carabobo',poblacion:3315506,contagiados:0,muertes:0},
    {nombre:'Distrito Capital',poblacion:3137710,contagiados:0,muertes:0},
    {nombre:'Lara',poblacion:2219211,contagiados:0,muertes:0},
    {nombre:'Aragua',poblacion:1976470,contagiados:0,muertes:0},
    {nombre:'Bolívar',poblacion:1874190,contagiados:0,muertes:0},
    {nombre:'Anzoátegui',poblacion:1788329,contagiados:0,muertes:0},
    {nombre:'Táchira',poblacion:1578108,contagiados:0,muertes:0},
    {nombre:'Sucre',poblacion:1071017,contagiados:0,muertes:0},
    {nombre:'Falcón',poblacion:1029638,contagiados:0,muertes:0},
    {nombre:'Portuguesa',poblacion:1012781,contagiados:0,muertes:0},
    {nombre:'Monagas',poblacion:998024,contagiados:0,muertes:0},
    {nombre:'Mérida',poblacion:992971,contagiados:0,muertes:0},
    {nombre:'Barinas',poblacion:989439,contagiados:0,muertes:0},
    {nombre:'Guárico',poblacion:870951,contagiados:0,muertes:0},
    {nombre:'Trujillo',poblacion:787988,contagiados:0,muertes:0},
    {nombre:'Yaracuy',poblacion:693876,contagiados:0,muertes:0},
    {nombre:'Apure',poblacion:587056,contagiados:0,muertes:0},
    {nombre:'Vargas',poblacion:398018,contagiados:0,muertes:0},
    {nombre:'Cojedes',poblacion:348022,contagiados:0,muertes:0},
    {nombre:'Delta Macuro',poblacion:187022,contagiados:0,muertes:0},
    {nombre:'Amazonas',poblacion:178670,contagiados:0,muertes:0},
    {nombre:'Dependencias Federales',poblacion:6500,contagiados:0,muertes:0},
    ];
     
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