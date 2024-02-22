// setup
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d'); // create an instance CanvasRenderingContext2D 
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gradient = ctx.createLinearGradient(0,0,canvas.width, canvas.height)
gradient.addColorStop(0, 'white');
gradient.addColorStop(0.5, 'magenta');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;
ctx.strokeStyle = 'white';

console.log(ctx);


class Particle {

  constructor(effect) {
    this.effect = effect;
    this.radius = Math.random() * 5 + 5;
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2); // "this.radius +" to full visible particle at the border(left)  " - this.radius * 2" to full visible particle at the border(right)
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2) // "this.radius +" to full visible particle at the border(top)  " - this.radius * 2" to full visible particle at the border(bottom)
    this.vx = Math.random() * 1 - 0.5 ; // speed
    this.vy = Math.random() * 1 - 0.5 ;
  }

  draw(context) {
    context.beginPath();
    // to draw a circle on canvas we start by calling begin path to tell JS to draw a new shape built in .arc() method
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2 ); // arc() just defines a path,doesn't draw anything. 0 =  start angle, angle of Math.PI - full circular arc
    context.fill(); // draw the circle
    context.stroke();
  }

  update() {
    if(this.effect.mouse.pressed){
      const dx = this.x - this.effect.mouse.x;// calculete the distasnce between particle and mouse (dx and dy)
      const dy = this.y - this.effect.mouse.y;
      const distance = Math.hypot(dx, dy);
      const force = this.effect.mouse.radius / destance;
      if(distance < this.effect.mouse.radius){ // push particle from mouse
        const angle = Math.atan2(dy, dx); // gives countreclockwise angle in radians, between the positive x-axis and a line projected from point 0,0 towards specificx and y coordinates (target points)
        this.x += Math.cos(angle);
        this.y += Math.sin(angle); 
      }
    };

    this.x += this.vx;
    if (this.x > this.effect.width - this.radius || this.x < this.radius) this.vx *= -1;

    this.y += this.vy;
    if (this.y > this.effect.height - this.radius || this.y < this.radius) this.vy *= -1;
  }

  reset() {
    this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
    this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2) 
  }
}


// width and height avaliable canvas area. We need to be sure, that we draw our shapes only within the canvas area and not somewere of screen. 

// Effect is a store of all custom settings and the helper methods 
class Effect {
  // width and height avaliable canvas area. We need to be sure, that we draw our shapes only within the canvas area and not somewere of screen. 
  constructor (canvas, context) {
    this.canvas = canvas;
    this.context = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.particles = []; // particles will be stored here 
    this.numberOfParticles = 200;
    this.createParticles();

    this.mouse = {
      x: 0,
      y: 0,
      pressed: false, // pressed button
      radius: 150, // mouse radius
    }

    window.addEventListener('resize', e => {
      this.resize(e.target.window.innerWidth, e.target.window.innerHeight)
    })

    window.addEventListener('mousemove', e => {
      if(this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }

    } );

    window.addEventListener('touchmove', e => {
      if(this.mouse.pressed) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
      }

    } );

    window.addEventListener('mousedown', e => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    } )

    window.addEventListener('touchstart', e => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    } )

    window.addEventListener('mousedown', e => {
      this.mouse.pressed = true;
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    } )

    window.addEventListener('mouseup', e => {
      this.mouse.pressed = false;
    } )

    window.addEventListener('touchend', e => {
      this.mouse.pressed = false;
    } )

  }

  createParticles() {
    // this method will run just once to initialize the Effect and create 20 particle object

    for (let i = 0; i < this.numberOfParticles; i++) {
      this.particles.push( new Particle(this) )
    }
  }

  handleParticles(context) {
    this.connectParticles(context);
    this.particles.forEach((particle) => {
      particle.draw(context);
      particle.update();
    })

   
  }

  connectParticles(context) {
    const maxDistance = 100;
    // compare every particle inside particles array
    for( let particleA = 0; particleA < this.particles.length; particleA++ ){
      // we can calculate particles distance and check if they are less than 100 pixels
      //Cycle over the entire particles array and for each of those particles run over the same array again to compare each particle  
      for(let particleB = particleA; particleB < this.particles.length; particleB++) {
        // comparing two particles at the time untill we compared all of them.
        // Always be comparing particle object A in the array against another particle aobject B in the same array.
        // calculate the distance between this two points(in 2d space) (Read in README):

        const dx = this.particles[particleA].x - this.particles[particleB].x;
        const dy = this.particles[particleA].y - this.particles[particleB].y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance) {
          // context.save(); ?
          const opacity = 1 - (distance/maxDistance);
          context.globalAlpha = opacity;
          context.beginPath();
          context.moveTo(this.particles[particleA].x, this.particles[particleA].y);
          context.lineTo(this.particles[particleB].x, this.particles[particleB].y);
          context.stroke();
          // context.restore(); ?
        }
      }
    }
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height - height;

    const gradient = this.context.createLinearGradient(0,0,width, height)
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.5, 'magenta');
    gradient.addColorStop(1, 'blue');
    this.context.fillStyle = gradient;
    this.context.strokeStyle = 'white';
    this.particles.forEach((particle) => {
      particle.reset();
    } )
  }
}
const effect = new Effect(canvas, ctx);
console.log(effect);



function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  effect.handleParticles(ctx);
  requestAnimationFrame( animate )
} 

animate();