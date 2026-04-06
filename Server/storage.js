const store = {};

// Save with expiry (10 min)
function save(code, data) {
  store[code] = data;

  setTimeout(() => {
    delete store[code];
  }, 10 * 60 * 1000);
}

function get(code) {
  const data = store[code];
  delete store[code]; // one-time access
  return data;
}

module.exports = { save, get };