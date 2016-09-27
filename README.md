# deltas [![Build Status](https://travis-ci.org/jeremenichelli/deltas.svg?branch=master)](https://travis-ci.org/jeremenichelli/deltas)

Library to configure and listen to device motion changes based on defined delta variations for each angle.

**Why?** Though you can listen to the _device orientation_ event, you will receive long floating numbers for each angle that is affected when the user moves the device. Creating **deltas** listeners you can easily configure actions for specific variation points.


## Use

Include the script inside the _dist_ folder in your project:

```html
<script src="dist/deltas.js"></script>
```

or install it running `npm install --save deltas` and import it:


```js
import { Listener } from delta;

let listener = new Listener({
  delta: 15,
  action(delta, angle) {
    // do something...
  }
});
```

### How it works

When setting a delta you're instructing the listener to fire an action each time an angle varies proportionally. This means that if you set a delta to `10`, the action will be fired when the orientation angle is `10`, `20`, `30`, etc.

Each action receives two arguments, the depth of the delta reached and the angle. If you set a delta to `10`, the action will be called with `1` when the orientation angle is `10`, with `2` when the orientation angle is `20`, etc.

The second argument is the angle which can be alpha, beta or gamma. These three come from the spec fo the device orientation event.

### alpha

The alpha swirls around the z axis. Imagine a phone is set on a flat surface, like a table, and you rotate without lifting it, that's the alpha angle and it goes from `0` to `360`.

### beta

The beta angle swirls around the x axis, which is the one that crosses the device from side to side and goes from `-180` to `180`, being zero when is to rest horizontally.

### gamma

The gamma angle swirls around the y axis, which is the one that crosses the device from top to bottom and goes from `-90` to `90`, being zero when is to rest horizontally.


_Orientation angles can be hard to figure, I recommend this MDN article about them: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Orientation_and_motion_data_explained_


### Set it up

With deltas listeners you can execute actions every time the angle varies an amount of degrees.

```js
import { Listener } from delta;

let listener = new Listener({
  delta: 10,
  action(delta, angle) {
    // this will be called for each angle
  }
});
```

But you can also just listen to one specific angle.

```js
let listener = new Listener({
  alpha: {
    delta: 10,
    action(delta, angle) {
      // this will be called only for alpha angle
    }
  }
});
```

You can pass a default delta and action, and add just a special action.

```js
let listener = new Listener({
  delta: 10,
  action(delta, angle) {
    // this will get called for beta and gamma
  },
  alpha: {
    action(delta, angle) {
      // this will be called only for alpha angle
    }
  }
});
```

Or add just a special delta.

```js
let listener = new Listener({
  delta: 10,
  action(delta, angle) {
    // this will get called for all angles
  },
  alpha: {
    delta: 25
  }
});
```

Or customize all!

```js
let listener = new Listener({
  alpha: {
    delta: 10,
    action(delta, angle) {
      // this will be called only for alpha angle
    }
  },
  beta: {
    delta: 20,
    action(delta, angle) {
      // this will be called only for beta angle
    }
  },
  gamma: {
    delta: 30,
    action(delta, angle) {
      // this will be called only for gamma angle
    }
  }
});
```


### Disclaimer

Deltas listeners were tested in latest Chrome mobile, latest Opera mini and Safari mobile 10 so further. The script is also written in ES2015 which works well on modern mobile browsers but would need transpiling for older versions.


_If you create fun stuff with it, let me know!_



**MIT License**
