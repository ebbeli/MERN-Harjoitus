//node local + port
var theIp = require("ip");
export const ip = "http://" + theIp.address() + ":5000";
