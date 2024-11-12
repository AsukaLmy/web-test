export function resolvePromise(prms, promiseState) {
    // check if prms is null
    if (!prms) {
        promiseState.promise = null;
        promiseState.data = null;
        promiseState.error = null;
        return Promise.resolve();
    }
    
    // check if prms is a Promise
    if (!(prms instanceof Promise)) {
      throw new Error('prms must be a Promise');
    }
  
    // save Promise in promiseState
    promiseState.promise = prms;
    // reset data and error
    promiseState.data = null;
    promiseState.error = null;
  
    prms
      .then(data => {
        // only when promiseState.promise equal to prms, then update data
        if (promiseState.promise === prms) {
          promiseState.data = data;
        }
      })
      .catch(error => {
        // .........same
        if (promiseState.promise === prms) {
          promiseState.error = error;
        }
      });
}
  