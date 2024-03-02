function throttle(callback, delay) {
    let lastCalledTime = 0;
    let timerId;
    const throttledFunction = function(...args) {
      const currentTime = Date.now();
      const timeSinceLastCall = currentTime - lastCalledTime;
      const delayRemaining = delay - timeSinceLastCall;
      if (delayRemaining <= 0) {
        lastCalledTime = currentTime;
        callback.apply(this, args);
      } else {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
          lastCalledTime = Date.now();
          callback.apply(this, args);
        }, delayRemaining);
      }
    };
  
    throttledFunction.cancel = function () {
      clearTimeout(timerId);
    }
    return throttledFunction;
  }
  
  // Do not edit the line below.
  exports.throttle = throttle;
  