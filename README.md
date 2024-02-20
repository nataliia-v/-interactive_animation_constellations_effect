# interactive_animation_constellations_effect
 Pure JS project. No frameworks and no libraries. Effect that connects floating particles with lines using dynamic opacity.
v

 ## CanvasRenderingContext2D 
 CanvasRenderingContext2D provides the 2D rendering context for the drawing surface of a <canvas> element.
 It is used for drawing shapes, text, images, and other objects.


## How to calculate the distance between two points in 2d space?
[Look at the connectParticles() method ](/script.js)
Very important coding technique for code for physics simulations,games, or creative coding projects.
To get the distance value we need to imagine there is a right triangle in between them. This will work regardless of
where in whick position relative to each other particleA and particleB are we calculate [DX distance](/images/dx_distance.jpg) between 
particleA and particleB on the horizontal x AIS. We calculate [DY distance](/images/dy_distance.jpg) between particleA and particleB on the vertical y AIS. We know DX, DY, right angle 90. Knowing all of this we can use Pythagoras Theorem formula to calculate [hypotenuse](/images/hypotenuse.jpg) (the longest side of the right triangle) which is also the actual distance between two points (particleA and particleB ) in [connectParticles() method ](/script.js) const distance. 
