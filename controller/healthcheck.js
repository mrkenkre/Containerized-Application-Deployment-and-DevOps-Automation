const sequelize = require("../config/sequelize");
const {
  standardOutputLogger,
  standardErrorLogger,
} = require("../utils/logger");
const client = require("../utils/statsdutil");
const { register, promClient } = require("../utils/promclient");

// const promClient = require("prom-client");
let healthzHits = null;
if (promClient) {
  //console.log("Prometheus client is available.");
  healthzHits = new promClient.Counter({
    name: "api_healthz_hits_total",
    help: "Total number of hits to the /healthz endpoint",
    labelNames: ["method"],
    registers: [register],
  });
} else {
  console.log("Prometheus client is NOT available.");
}

async function healthz(req, res) {
  client.increment("API.healthz.GET");
  healthzHits.inc({ method: req.method });

  try {
    res.set("Cache-Control", "no-cache");
    if (req.method !== "GET") {
      standardErrorLogger.error("Method Not Allowed");
      console.log("Method not allowed.");
      res.status(405).send();
    } else if (JSON.stringify(req.body).length > 2) {
      standardErrorLogger.error("Request payload not allowed.");
      console.log("Request payload not allowed.");
      res.status(400).send();
    } else {
      await sequelize.authenticate();
      res.status(200).send();
      standardOutputLogger.info("MySQL connected successfully.");
      console.log("MySQL connected successfully.");
    }
  } catch (error) {
    console.log("Unable to connect to the database: " + error);
    standardErrorLogger.error("Unable to connect to the database: " + error);
    res.status(503).send();
  }
}

module.exports = { healthz };
