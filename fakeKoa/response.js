module.exports = {
    get body() {
        return this._body;
    },

    set body(data) {
        this._body = data;
    },

    get status() {
        return this.res.statusCode;
    },

    set status(code) {
        if (typeof code !== 'number') {
            throw new Error('something wrong!');
        }
        this.res.statusCode = code;
    }
};
