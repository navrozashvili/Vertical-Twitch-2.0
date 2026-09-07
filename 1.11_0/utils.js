function isFirefox() {
  return !chrome.storage;
}

function saveToStorage(key, value) {
  if (isFirefox()) {
    return new Promise((resolve) => {
      console.log("promissesd");
      browser.storage.sync.set({
        [key]: value
      })
      resolve()
    })
  } else {
    return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, function() {
        resolve()
      });
    })
  }
}
  
function getFromStorage(key, defaultValue) {
  if (isFirefox()) {
    return new Promise((resolve) => {
      browser.storage.sync.get(key).then(function(results) {
        if (results[key] === undefined) {
          return resolve(defaultValue);
        }
        return resolve(results[key]);
      })
    })
  } else {
    return new Promise((resolve) => {
      chrome.storage.sync.get(key, function(results) {
        if (results[key] === undefined) {
          return resolve(defaultValue);
        }
        return resolve(results[key]);
      });
    })
  }
}


