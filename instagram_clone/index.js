const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    /* Configuraciones mongoose */
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true,
  },
  (err, _) => {
    if (err) {
      console.error("Erroo de conexión", err);
    } else {
      console.log("Conexión correcta");
    }
  }
);
