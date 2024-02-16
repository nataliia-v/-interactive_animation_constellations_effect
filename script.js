// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // create an instance CanvasRenderingContext2D 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log(ctx);
const gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height)
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'magenta');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;


class Particle {

  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 40 + 5;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2); // "this.radius +" to full visible particle at the border(left)  " - this.radius * 2" to full visible particle at the border(right)
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2) // "this.radius +" to full visible particle at the border(top)  " - this.radius * 2" to full visible particle at the border(bottom)
    this.vx = Math.random() * 4 - 2 ; // speed
    this.vy = Math.random() * 4 - 2 ;
  }

  draw(context) {
    context.beginPath();
    // to draw a circle on canvas we start by calling begin path to tell JS to draw a new shape built in .arc() method
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2 ); // arc() just defines a path,doesn't draw anything. 0 =  start angle, angle of Math.PI - full circular arc
    context.fill(); // draw the circle
    context.stroke();
  }

  update() {
    this.x += this.vx;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;

    this.y += this.vy;
    if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
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
    this.numberOfParticles = 200;
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
      particle.update();
    })
  }
}
const effect = new Effect(canvas);
console.log(effect);



function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame( animate )
} 

animate();