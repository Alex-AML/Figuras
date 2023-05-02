class Naves {
  constructor(x, y, alto, ancho, vx, vy) {
    this.posicion = createVector(x,y);
    this.alto = alto;
    this.ancho = ancho;
    this.velocidad = createVector(vx,vy);
  }
}

class NaveJugador extends Naves{
  
  constructor(x, y, vx, vy) {
      super(x, y, vx, vy);
  }

  movimiento(mx,my){
    image(img,mx -65, my-45);
  }

}

class Asteroide extends Naves{
  constructor(x, y, alto, ancho, vx, vy) {
      super(x, y, alto, ancho, vx, vy);
  }
  
 draw()
  {
 image(asteroide,this.posicion.x,this.posicion.y,this.alto,this.ancho);
  }
 
  update()
  {
    if (this.posicion.x + this.ancho <= 320)
    {
      let valor = 2;
      this.velocidad.x = this.velocidad.x * -valor;
      this.velocidad.y = this.velocidad.y * -valor;
      Energia = Energia - 1;
    }

    let distancia = dist(mouseX,mouseY,this.posicion.x,this.posicion.y);

    if (distancia < 60)
    {
      this.velocidad.x = 2000;
    }

  this.posicion.add(this.velocidad);
  }

  movimiento (DMI,DMA,TA){
    for (let Ataque = DMI; Ataque < DMA && timer <= TA; Ataque++) {
    asteroides[Ataque].draw();
    asteroides[Ataque].update();   
    }
  }
 }

class Interfaz {

  posicionPlaneta(){
    image(planeta,-300,100);
  }

  posicionBarrera(){
    image(barrera,220,0);
  } 

  BarraEnergia (){
    let EtiquetaEnergia;

    EtiquetaEnergia = createP('Energia: ');
    EtiquetaEnergia.style('font-size', '20px');
    EtiquetaEnergia.position(10, 20);
    EtiquetaEnergia.style('color', '#FFFFFF');

    textAlign(CENTER, CENTER);
    textSize(20);
    text(Energia, width = 100, height = 53);
    fill(0, 102, 153);
  }

  Temporizador (){

    textAlign(CENTER, CENTER);
    textSize(100);
    text(timer, width = 80, height = 350);

    if (frameCount % 60 == 0 && timer > 0) {timer --;}

    if (timer == 0 && Energia >=1) {
      text("Felicidades, ganaste", 800, height/2);
    }

    else if (Energia <= 0){
      text("Te toco soportar la derrota", 850, height/2);
      Energia = 0;
      timer = 0;
    }

  }
}

let Energia = 10;
let timer = 12;
let nave1;
let planetaC;
let img;
let bg;
let planeta;
let barrera;
let asteroide;
var asteroides = [];

function preload(){
  bg = loadImage('Imagenes/Inicio.jpg');
  img = loadImage('Imagenes/cohete.png');
  planeta = loadImage('Imagenes/planeta.png');
  barrera = loadImage('Imagenes/Barrera.png');
  asteroide = loadImage('Imagenes/asteroide1.png');
}

function setup() {
  createCanvas(1500, 700);
  ataqueAsteroide = new Asteroide ();
  nave1 = new NaveJugador(mouseX,mouseY,200);
  planetaC = new Interfaz ();
  noCursor(); 

  for(let Ataque = 0; Ataque < 30; Ataque++){
  asteroides.push(new Asteroide(random(1200,1450),random(25,600),random(50,100),random(50,100),-15,random(-2,1)));
  }
  
}

function draw() {
  background(bg);
  nave1.movimiento(mouseX,mouseY);
  planetaC.posicionPlaneta(200,300);
  planetaC.posicionBarrera();
  planetaC.BarraEnergia();
  planetaC.Temporizador();

  if (Energia > 0)
  {
  ataqueAsteroide.movimiento(0,5,11);
  ataqueAsteroide.movimiento(5,10,9);
  ataqueAsteroide.movimiento(10,15,6);
  ataqueAsteroide.movimiento(15,30,3);
  }

}
