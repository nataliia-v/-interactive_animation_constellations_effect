// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // create an instance CanvasRenderingContext2D 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.fillStyle = 'yellow';

console.log(ctx);



class Particle {

  constructor(effect) {
    this.effect = effect;
    this.x = Math.random() * this.effect.width;
    this.y = Math.random() * this.effect.height;
    this.radius = 15;
  }

  draw(context) {
    context.beginPath();
    // to draw a circle on canvas we start by calling begin path to tell JS to draw a new shape built in .arc() method
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2 ); // arc() just defines a path,doesn't draw anything. 0 =  start angle, angle of Math.PI - full circular arc
    context.fill(); // draw the circle

  }
}


// width and height avaliable canvas area. We need to be sure, that we draw our shapes only within the canvas area and not somewere of screen. 

// Effect is a store of all custom settings and the helper methods 
class Effect {
  // width and height avaliable canvas area. We need to be sure, that we draw our shapes only within the canvas area and not somewere of screen. 
  constructor (canvas) {
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = []; // particles will be stored here 
    this.numberOfParticles = 20;
    this.createParticles();
  }

  createParticles() {
    // this method will run just once to initialize the Effect and create 20 particle object

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push( new Particle(this) )
    }
  }

  handleParticles(context) {
    this.particles.forEach((particle) => {
      particle.draw(context);
    })
  }
}
const effect = new Effect(canvas);
console.log(effect);

effect.handleParticles(ctx);

function animate() {
  
} 