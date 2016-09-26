let simulateOrientation = function(alpha = 0, beta = 0, gamma = 0) {
  var event = new window.Event('deviceorientation');

  const angles = {
    alpha,
    beta,
    gamma
  };

  window.dispatchEvent(Object.assign(event, angles));
};

export default simulateOrientation;
