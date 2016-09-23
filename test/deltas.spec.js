import sinon from 'sinon';
import test from 'ava';
import { Listener } from '../src/deltas.js';
import simulateOrientation from './helpers/simulateOrientation.js';

// listener used across tests
let testListener;

test('Listener calls default action when necessary', t => {
  let spy = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: spy
  });

  simulateOrientation(11, 11, 11);

  t.true(spy.callCount === 3);

});

test('Listener does not call default action when not necessary', t => {
  let spy = sinon.spy();

  testListener = new Listener({
    delta: 10,
    action: spy
  });

  simulateOrientation(9, 9, 9);

  t.true(!spy.called);
});

test.afterEach(_ => {
  testListener.stop();
  testListener = null;
});
