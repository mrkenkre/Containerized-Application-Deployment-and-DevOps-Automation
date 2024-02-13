const promClient = require("prom-client");

// if (promClient) {
//   console.log("Prometheus client is available in app.");
// } else {
//   console.log("Prometheus client is NOT available in app.");
// }

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });

module.exports = { promClient, register };
