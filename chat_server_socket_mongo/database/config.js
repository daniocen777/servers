const mongoose = require("mongoose");

const dbConecction = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("ERROR en la base de datos");
  }
};

module.exports = { dbConecction };
