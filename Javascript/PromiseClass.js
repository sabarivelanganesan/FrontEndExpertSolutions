const State = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
  };
  class MyPromise {
    #state = State.PENDING;
    #value = null;
    #rejectedCallbacks = [];
    #fulfilledCallbacks = [];
  
    constructor(executorFunc) {
      try {
          executorFunc(
            value => this.#resolve(value),
            value => this.#reject(value)
          );
      } catch(error) {
        this.#reject(error);
      };
    }
  
    #resolve(value) {
        this.#state = State.FULFILLED;
        this.#value = value;
        this.#fulfilledCallbacks.forEach(callback => callback());
    };
    #reject(value) {
        this.#state = State.REJECTED;
        this.#value = value;
        this.#rejectedCallbacks.forEach(callback => callback());
    }; 
  
    then(onFulfilled, onRejected) {
      return new MyPromise((resolve, reject) => {
  
        const fullfilledCallback = () => {
          if (!onFulfilled) return resolve(this.#value);
  
          queueMicrotask(() => {
            try {
              const value = onFulfilled(this.#value);
              resolve(value);
            } catch(error) {
              reject(error)
            }          
          });
        };
  
        const rejectedCallback = () => {
          if (!onRejected) return reject(this.#value);
  
          queueMicrotask(() => {
            try {
              const value = onRejected(this.#value);
              resolve(value);
            } catch (error) {
              reject(error);
            }
          })
        };
        
        switch(this.#state) {
          case State.PENDING:
            this.#fulfilledCallbacks.push(fullfilledCallback);
            this.#rejectedCallbacks.push(rejectedCallback);
            break;
          case State.FULFILLED:
            fullfilledCallback();
            break;
          case State.REJECTED:
            rejectedCallback();
            break;
          default:
            throw new Error('Unexpected promise state');
        }
      });
    }
  
    catch(onRejected) {
      return this.then(null, onRejected);
    }
  
    get state() {
      return this.#state;
    }
  
    get value() {
      return this.#value;
    }
  }
  
  // Do not edit the line below.
  exports.MyPromise = MyPromise;
  