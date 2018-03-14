# animation

A lightweight JavaScript animation library.
You could use like this [demo](https://holyzfy.github.io/animation/demo.html).

## API

### animation.parallel(...targets)

Run the animations of the `targets` collection in parallel.
Returns a promise that resolves when all animations have completed,
without waiting until the previous animation has completed.

### animation.series(...targets)

Run the animations of the `targets` collection in series.
Returns a promise that resolves when all animations have completed,
each one running once the previous animation has completed. 

### animation.race(...targets)

Run the animations of the `targets` collection in parallel.
Returns a promise that resolves as soon as one of the animations of the `targets` has completed.

#### Parameters

The `targets` property defines the elements to animate. 

- CSS Selectors
- DOM Element
- NodeList

#### Return
Promise
