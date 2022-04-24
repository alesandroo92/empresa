module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  port: 3306,
  database: "sequelize-empresa",
  define: {
      timestamps: false, 
      underscored: true
  }
};
