import server from './config/server';
require("./config/database");
require("./config/routes")(server);

