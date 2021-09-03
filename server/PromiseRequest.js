const request = require("request");
const util = require("util");

const promiseRequest = util.promisify(request);
promiseRequest.get = util.promisify(promiseRequest.get);
promiseRequest.post = util.promisify(promiseRequest.post);

// extent other methods if required

module.exports = promiseRequest;
