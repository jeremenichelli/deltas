import sinon from 'sinon';
import test from 'ava';
import { Listener } from '../src/deltas.js';
import simulateOrientation from './helpers/simulateOrientation.js';

// listener used across tests
let testListener;

test('Listener calls default action when necessary', t => {
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction
  });

  simulateOrientation(11, 11, 11);

  t.true(defaultAction.callCount === 3);
});

test('Listener does not call default action when not necessary', t => {
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction
  });

  simulateOrientation(9, 9, 9);
  simulateOrientation(9.87, 9.87, 9.87);
  simulateOrientation(8.76, 8.76, 8.76);

  t.false(defaultAction.called);
});

test('Listener calls default action with correct arguments', t => {
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction
  });

  simulateOrientation(10, 20, 30);

  t.is(defaultAction.getCall(0).args[0], 1);
  t.is(defaultAction.getCall(0).args[1], 'alpha');

  t.is(defaultAction.getCall(1).args[0], 2);
  t.is(defaultAction.getCall(1).args[1], 'beta');

  t.is(defaultAction.getCall(2).args[0], 3);
  t.is(defaultAction.getCall(2).args[1], 'gamma');
});

test('Action is not called if angle changes but not delta', t => {
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 20,
    action: defaultAction
  });

  simulateOrientation(20, 0, 0);
  simulateOrientation(24, 0, 0);
  simulateOrientation(28, 0, 0);

  t.true(defaultAction.calledOnce);
});

test('Action is called with proportional delta value', t => {
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction
  });

  simulateOrientation(12, 0, 0);
  simulateOrientation(34, 0, 0);
  simulateOrientation(0, 0, 0);

  t.is(defaultAction.getCall(0).args[0], 1);
  t.is(defaultAction.getCall(1).args[0], 3);
  t.is(defaultAction.getCall(2).args[0], 0);
});

test('Custom action is called for alpha angle', t => {
  let alphaAction = sinon.spy();
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction,
    alpha: {
      action: alphaAction
    }
  });

  simulateOrientation(11, 9, 9);

  t.true(alphaAction.called);
  t.false(defaultAction.called);
});

test('Custom action is called for beta angle', t => {
  let betaAction = sinon.spy();
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction,
    beta: {
      action: betaAction
    }
  });

  simulateOrientation(9, 11, 9);

  t.true(betaAction.called);
  t.false(defaultAction.called);
});

test('Custom action is called for gamma angle', t => {
  let gammaAction = sinon.spy();
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction,
    gamma: {
      action: gammaAction
    }
  });

  simulateOrientation(9, 9, 11);

  t.true(gammaAction.called);
  t.false(defaultAction.called);
});

test('Custom delta can be set', t => {
  let defaultAction = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: defaultAction,
    gamma: {
      delta: 50
    }
  });

  simulateOrientation(0, 0, 30);
  simulateOrientation(0, 0, 40);
  simulateOrientation(0, 0, 50);

  t.true(defaultAction.calledOnce);
});

test('Does not throws error when action is not provided', t => {
  testListener = new Listener({
    delta: 10
  });

  simulateOrientation(30, 30, 30);

  t.true(true);
});

test('Throws error when general delta is negative', t => {
  var error = null;

  try {
    testListener = new Listener({
      delta: -10
    });
  } catch(e) {
    error = e;
  }

  t.true(error instanceof RangeError);
});

test('Throws error when custom delta is negative', t => {
  var error = null;

  try {
    testListener = new Listener({
      delta: 10,
      alpha: {
        delta: -20
      }
    });
  } catch(e) {
    error = e;
  }

  t.true(error instanceof RangeError);
});

test.afterEach(_ => {
  if (testListener !== null) {
    testListener.stop();
    testListener = null;
  }
});
