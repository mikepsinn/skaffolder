// Import Sequelize
import Sequelize from "sequelize";
import InitSchema from "../models/schema_php81apachebusterxdebugopcachecomposerpgsql_db";
import UserModel from "../models/Php81apachebusterxdebugopcachecomposerpgsql_db/UserModel";

// Logging
import Logger from "./Logger";
// Properties
import properties from "../properties.js";

class Database {
  constructor() {}

  /**
   * Init database
   */
  async init() {
    await this.authenticate();
    Logger.info(
      "Database connected at: " +
        properties.php81apachebusterxdebugopcachecomposerpgsql_db.host +
        ":" +
        properties.php81apachebusterxdebugopcachecomposerpgsql_db.port +
        "//" +
        properties.php81apachebusterxdebugopcachecomposerpgsql_db.user +
        "@" +
        properties.php81apachebusterxdebugopcachecomposerpgsql_db.name
    );

    // Import schema
    InitSchema();

    await UserModel.createAdminUser();

  }

  /**
   * Start database connection
   */
  async authenticate() {
    Logger.info("Authenticating to the databases...");

    const sequelize = new Sequelize(
      properties.php81apachebusterxdebugopcachecomposerpgsql_db.name,
      properties.php81apachebusterxdebugopcachecomposerpgsql_db.user,
      properties.php81apachebusterxdebugopcachecomposerpgsql_db.password,
      {
        host: properties.php81apachebusterxdebugopcachecomposerpgsql_db.host,
        dialect: properties.php81apachebusterxdebugopcachecomposerpgsql_db.dialect,
        port: properties.php81apachebusterxdebugopcachecomposerpgsql_db.port,
        logging: false
      }
    );
    this.dbConnection_php81apachebusterxdebugopcachecomposerpgsql_db = sequelize;

    try {
      await sequelize.sync();
    } catch (err) {
      // Catch error here
      Logger.error(`Failed connection to the DB`);
      Logger.error(err);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await this.authenticate();
    }
  }

  /**
   * Get connection db
   */
  getConnection() {
    return this.dbConnection_php81apachebusterxdebugopcachecomposerpgsql_db;
  }
}

export default new Database();
