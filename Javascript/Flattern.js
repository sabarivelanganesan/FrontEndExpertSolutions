function flatten(value) {
    // Write your code here.
    if (typeof value !== 'object' || value === null) {
      return value;
    }
    if (Array.isArray(value)) {
      return value.reduce((acc, curr) => acc.concat(flatten(curr)), []);
    }
    return flatternObject(value);
  }
  
  function flatternObject(object) {
    const flatternedObj = {};
    for (const [key, value] of Object.entries(object)) {
      const flatternedValue = flatten(value);
      
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {   
        Object.assign(flatternedObj, flatternedValue);
      } else {
        flatternedObj[key] = flatternedValue;
      }
    }
    return flatternedObj;
  }
  
  // Do not edit the line below.
  exports.flatten = flatten;
  