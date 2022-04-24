const express = require("express");
const app = express();
const morgan = require("morgan");
const { sequelize } = require("./models/index");


// Peticion a las rutas
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const roleRouter = require("./routes/role");
const postRouter = require("./routes/post");

require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(morgan("tiny"));


// Rutas
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/role", roleRouter);
app.use("/post", postRouter);


app.listen(process.env.PORT, () => {
    console.log("Servidor iniciado en el puerto: "+process.env.PORT);

    sequelize.authenticate().then(() => {
        console.log("Conectado exitosamente a la base de datos");
    });
});
