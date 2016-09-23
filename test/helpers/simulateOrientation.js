let simulateOrientation = function(alpha, beta, gamma) {
  var event = new window.Event('deviceorientation');

  window.dispatchEvent(Object.assign(event, { alpha, beta, gamma }));
};

export default simulateOrientation;
