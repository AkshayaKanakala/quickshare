const store = {};

// Save data with 10-minute expiry
function save(code, data) {
    store[code] = data;

    setTimeout(() => {
        delete store[code];
    }, 10 * 60 * 1000);
}

// Get data without deleting it
function peek(code) {
    return store[code];
}

// Get data and delete it
function get(code) {
    const data = store[code];

    if (data) {
        delete store[code];
    }

    return data;
}

module.exports = {
    save,
    peek,
    get
};