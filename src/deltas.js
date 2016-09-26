(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(function() {
      return factory();
    });
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.deltas = factory();
  }
})(this, function() {
  'use strict';

  const orientations = [ 'alpha', 'beta', 'gamma' ];

  /**
   * Reference to empty function
   * @method noop
   */
  const noop = function() {};

  /**
   * Instance which listens motion on one or many and triggers actions
   * @class Listener
   * @param {Object} config
   */
  class Listener {
    constructor(config = {}) {
      this._alphaLast = 0;
      this._betaLast = 0;
      this._gammaLast = 0;

      this._delta = config.delta || 0;

      // config for alpha (z axis)
      this._alphaDelta =
        config.alpha &&
        config.alpha.delta ||
        this._delta;

      this._alphaAction =
        config.alpha &&
        config.alpha.action ||
        config.action ||
        noop;

      // config for beta (x axis)
      this._betaDelta =
        config.beta &&
        config.beta.delta ||
        this._delta;

      this._betaAction =
        config.beta &&
        config.beta.action ||
        config.action ||
        noop;

      // config for gamma (y axis)
      this._gammaDelta =
        config.gamma &&
        config.gamma.delta ||
        this._delta;

      this._gammaAction =
        config.gamma &&
        config.gamma.action ||
        config.action ||
        noop;

      // error when delta is not natural
      if (
        this._alphaDelta < 0 ||
        this._betaDelta < 0 ||
        this._gammaDelta < 0) {
        throw new RangeError('Deltas passed must be positive integers', config);
      }

      // generate bound event to later remove listener
      this._onOrientationChange = this._onOrientationChange.bind(this);

      // start listen to orientation changes
      window.addEventListener('deviceorientation', this._onOrientationChange);
    }
    _reachedDelta(instance, value) {
      const delta = this[ `_${instance}Delta` ];

      // return amount of delta reached
      return Math.trunc(value/delta);
    }
    _onOrientationChange(e) {
      orientations.map(o => {
        const delta = this._reachedDelta(o, e[o]);

        if (delta !== this[ `_${o}Last` ]) {
          this[ `_${o}Last` ] = delta;
          // when delta is reached pass strengh and value string
          this[ `_${o}Action` ].call(null, delta, o);
        }
      });
    }
    stop() {
      // stop listen to orientation changes
      window.removeEventListener('deviceorientation', this._onOrientationChange);
    }
  }

  return { Listener };
});
