const isLocalHost = false;

class APIHandler {
    constructor() {
        this.user = undefined;
        this.request = this.request.bind(this);
        this.login = this.login.bind(this);
        // this.searchBooks = this.searchBooks.bind(this);
    }

    request(path, isPost = false, data = {}) {
        if (path[0] === '/')
            path = path.substring(1);
        var h = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
        var options = {
            headers: h,
            method: isPost ? 'POST' : 'GET',
        };
        if (isPost)
            options.body = JSON.stringify(data);
        return makeCancelable(new Promise((resolve, reject) => {
            var url = ('http://192.168.1.114:8080/nazin/shop/') + path;
            console.log(url);
            fetch(url, options).then((response) => {
                setTimeout(() => {
                    resolve(response);
                }, 500);
            }).catch((err) => {
                setTimeout(() => {
                    reject(err.toString());
                }, 500);
            });
        }));
    }
    login({ someID, password }) {
        return makeCancelable(new Promise(async (resolve, reject) => {
            try {
                var data = {
                    username: someID,
                    password: password
                };
                var response = await this.request('users/login', true, data).promise;
                console.log(response);
                resolve(response);
            }
            catch (err) {
                reject(err);
            }
        }));
    }
}
const makeCancelable = (promise) => {
    let hasCanceled_ = false;

    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then(
            val => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val),
            error => hasCanceled_ ? reject({ isCanceled: true }) : reject(error)
        );
    });

    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        },
    };
};
const API = new APIHandler();
export default API;