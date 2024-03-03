Promise.myRace = function (promises) {
    // Write your code here.
    return new Promise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve).catch(reject);
      });
    });
  };
  
  Promise.myAny = function (promises) {
    return new Promise((resolve, reject) => {
      let rejectedCount = 0;
      promises.forEach(promise => {
        promise.then(resolve).catch(_ => {
           rejectedCount++;
          if (rejectedCount === promises.length) {
            reject('all promises rejected');
          }
        });
      });
    })
  };
  
  Promise.myAll = function (promises) {
    return new Promise((resolve, reject) => {
      let results = [];
      let resolvedCount = 0;
      
      promises.forEach((promise, index) => {
        promise.then(val => {
            results[index] = val;
            resolvedCount++;
            if (resolvedCount === promises.length) {
              resolve(results);
            }
        }).catch(reject);
      });
    });
  };
  
  Promise.myAllSettled = function (promises) {
    return new Promise((resolve, reject) => {
      const results = [];
      let settledCount = 0;
      promises.forEach((promise, index) => {
        promise.then(value => {
          results[index] = {status: 'fulfilled', value};
        }). catch(error => {
          results[index] = {status: 'rejected', error};
        }).finally(() => {
          settledCount++;
          if (settledCount === promises.length) {
            resolve(results);
          }
        });
      });
    });
  };
  