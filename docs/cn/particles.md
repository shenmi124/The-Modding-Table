# Particles

Particles are free-floating elements that can move and have many different behaviors. They can also interact with the mouse.

To make particles, use `makeParticles(particle, amount)`. `particle` is a particle-defining object, with features as explained below. There is also `makeShinies`, which uses different defaults and creates stationary particles at a random location. There are also a few other useful things listed at the end.

```js

const myParticle {
    image:"options_wheel.png",
    spread: 20,
    gravity: 2,
    time: 3,
    speed() { // Randomize speed a bit
        return (Math.random() + 1.2) * 8 
    },
    etc...
}
```

Features can be functions or constant. These features will be called when each particle is made, with an `id` argument, which is assigned based on which of the `amount` particles being spawned this is. **All of these are optional**, with a default value.

All distances are in pixels and angles are in degrees, with 0 being up and going clockwise.

- time: The amount of time, in seconds, that the particle will last. Default is 3.
- fadeOutTime: The amount of seconds that fading out at the end should take (part of the total lifetime). Default is 1.
- fadeInTime: The amount of seconds that fading in should take (part of the total lifetime). Default is 0.

- image: The image the particle should display. `""` will display no image. Default is a generic particle.
- text: Displays text on the particle. Can use basic HTML.
- style: Lets you apply other CSS styling to the particle.
- width, height: The dimensions of the particle. Default is 35 and 35.
- color: Sets the color of the image to this color.

- angle: The angle that the particle should face. Default is 0.
- dir: The initial angle that the particles should move in, before spread is factored in. Default is whatever angle is.
- spread: If there are several particles, they will be spread out by this many degrees, centered on dir. Default is 30.

- rotation: The amount that the (visual) angle of the particle should change by. Default is 0.
- speed: The starting speed of the particle. Default is 15.
- gravity: The amount the particle should accelerate downwards. Default is 0.

- x, y: The starting coordinates of the particle. Default is at the mouse position.
- offset: How far from the start each particle should appear. Default is 10.
- xVel, yVel: Set initially based on other properties, then used to update movement.

- layer: When changing tabs, if leaving the `layer` tab, this particle will be erased.
- You can add other features to particles, but you must impliment their effects yourself.

Function features: These stay as functions and are for more advanced things. They are optional.

- update(): Called each tick. Lets you do more advanced visual and movement behaviors by changing other properties.
- onClick(), onMouseOver(), onMouseLeave(): Called when the particle is interacted with.


Other useful things that are not features of the particle object:

- setDir(particle, dir), setSpeed(particle, speed): Set the speed/direction on a particle.
- clearParticles(check): Function to delete particles. With no check, it deletes all particles. Check is a function that takes a particle, and returns true if that particle should be deleted.
- You can use Vue.delete(particles, this.id) to make a particle delete itself.
- mouseX and mouseY are variables that track the mouse position.
- sin(x), cos(x), tan(x): functions that do these operations, with x in degrees. (Instead of radians).
- asin(x), acos(x), atan(x): functions that do these operations, with the returned value in degrees. (instead of radians).