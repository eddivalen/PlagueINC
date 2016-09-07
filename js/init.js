var virus;
if (typeof(global.info) === 'undefined') {
    global.info = {};
    global.info.estados = [
    {nombre:'Zulia',code:'VE-V',poblacion:4323467,contagiados:0,muertes:0, adyacentes:['Mérida', 'Táchira', 'Trujillo', 'Falcón', 'Lara'], infectado:0},
    {nombre:'Miranda',code:'VE-M',poblacion:3992374,contagiados:0,muertes:0, adyacentes:['Guárico', 'Anzoátegui', 'Aragua', 'Distrito Capital', 'Vargas'], infectado:0},
    {nombre:'Carabobo',code:'VE-G',poblacion:3315506,contagiados:0,muertes:0, adyacentes: ['Cojedes', 'Guárico', 'Aragua', 'Yaracuy'], infectado:0},
    {nombre:'Distrito Capital',code:'VE-A',poblacion:3137710,contagiados:0,muertes:0, adyacentes: ['Miranda', 'Aragua', 'Vargas'], infectado:0},
    {nombre:'Lara',code:'VE-K',poblacion:2219211,contagiados:0,muertes:0, adyacentes: ['Falcón', 'Zulia', 'Trujillo', 'Portuguesa', 'Cojedes', 'Yaracuy'], infectado:0},
    {nombre:'Aragua',code:'VE-D',poblacion:1976470,contagiados:0,muertes:0, adyacentes: ['Vargas', 'Carabobo', 'Cojedes', 'Guárico', 'Anzoátegui'], infectado:0},
    {nombre:'Bolívar',code:'VE-F',poblacion:1874190,contagiados:0,muertes:0, adyacentes:['Amazonas','Apure','Anzoátegui','Delta Amacuro'], infectado:0},
    {nombre:'Anzoátegui',code:'VE-B',poblacion:1788329,contagiados:0,muertes:0, adyacentes:['Monagas', 'Sucre', 'Miranda', 'Guárico', 'Bolívar', 'Nueva Esparta'], infectado:0},
    {nombre:'Táchira',code:'VE-S',poblacion:1578108,contagiados:0,muertes:0,adyacentes:['Zulia','Mérida','Barinas','Apure'], infectado:0},
    {nombre:'Sucre',code:'VE-R',poblacion:1071017,contagiados:0,muertes:0,adyacentes:['Monagas', 'Anzoátegui', 'Nueva Esparta'], infectado:0},
    {nombre:'Falcón',code:'VE-I',poblacion:1029638,contagiados:0,muertes:0,adyacentes:['Zulia', 'Lara', 'Yaracuy'], infectado:0},
    {nombre:'Portuguesa',code:'VE-P',poblacion:1012781,contagiados:0,muertes:0, adyacentes:['Barinas','Trujillo','Lara','Cojedes'], infectado:0},
    {nombre:'Monagas',code:'VE-N',poblacion:998024,contagiados:0,muertes:0,adyacentes:['Delta Amacuro', 'Anzoátegui', 'Sucre', 'Bolívar'], infectado:0},
    {nombre:'Mérida',code:'VE-L',poblacion:992971,contagiados:0,muertes:0,adyacentes:['Zulia', 'Táchira', 'Barinas','Trujillo'], infectado:0},
    {nombre:'Barinas',code:'VE-E',poblacion:989439,contagiados:0,muertes:0,adyacentes:['Apure','Táchira', 'Mérida', 'Trujillo', 'Portuguesa', 'Guárico', 'Cojedes'], infectado:0},
    {nombre:'Guárico',code:'VE-J',poblacion:870951,contagiados:0,muertes:0,adyacentes:['Anzoátegui', 'Bolívar', 'Apure','Barinas','Cojedes','Carabobo','Aragua', 'Miranda'], infectado:0},
    {nombre:'Trujillo',code:'VE-T',poblacion:787988,contagiados:0,muertes:0, adyacentes:['Zulia','Mérida','Barinas','Portuguesa','Lara'], infectado:0},
    {nombre:'Yaracuy',code:'VE-U',poblacion:693876,contagiados:0,muertes:0, adyacentes:['Falcón','Lara','Portuguesa','Cojedes', 'Carabobo'], infectado:0},
    {nombre:'Apure',code:'VE-C',poblacion:587056,contagiados:0,muertes:0, adyacentes:['Bolívar','Guárico','Barinas','Táchira'], infectado:0},
    {nombre:'Vargas',code:'VE-X',poblacion:398018,contagiados:0,muertes:0, adyacentes:['Miranda', 'Aragua', 'Distrito Capital'], infectado:0},
    {nombre:'Cojedes',code:'VE-H',poblacion:348022,contagiados:0,muertes:0, adyacentes:['Carabobo', 'Yaracuy', 'Cojedes','Guárico','Aragua'], infectado:0},
    {nombre:'Delta Amacuro',code:'VE-Y',poblacion:187022,contagiados:0,muertes:0,adyacentes:['Bolívar','Monagas'], infectado:0},
    {nombre:'Amazonas',code:'VE-Z',poblacion:178670,contagiados:0,muertes:0, adyacentes:['Bolívar'], infectado:0},
    {nombre:'Nueva Esparta',code:'VE-O',poblacion:552011,contagiados:0,muertes:0,adyacentes:['Sucre', 'Anzoátegui'],infectado:0},

 
    ];
    global.info.puntos=0;
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
        window.resizeTo(1015,800);
        window.moveTo(150,150);
    }
});

function get_poblacioninicial(){
    var poblacioninicial=0;

        for (var i = 0; i < global.info.estados.length; i++) {
             poblacioninicial+=global.info.estados[i].poblacion;
        }
    return poblacioninicial;
}
global.info.poblacioninicial=get_poblacioninicial();

//banderas de habilidades del virus
//Transmisión
global.info.aire1=0;
global.info.aire2=0;
global.info.agua1=0;
global.info.agua2=0;
global.info.animal1=0;
global.info.animal2=0;

//Sintomas
//Resistencia