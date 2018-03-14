# Animation

A lightweight JavaScript animation library. You could use like this [demo](https://holyzfy.github.io/animation/demo.html).

## Demo

```js
animation.parallel('#elem-1', 'div.elem-2', document.querySelector('.elem-3'))
    .then(function () {
        return animation.series(document.querySelectorAll('.demo-xxx'));
    })
    .then(function () {
        return animation.race('#demo-4', '#demo-5');
    })
    .then(function () {
        alert('done');
    });
```

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

The `targets` property defines the elements to animate, you can use the flowing types:

- CSS Selectors
- DOM Element
- NodeList

#### Return
Promise
