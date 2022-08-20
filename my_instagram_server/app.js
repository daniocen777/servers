import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import storyRoutes from "./routes/stories.js";

/* Instancias */
const app = express();
/* Configuraciones */
app.use(bodyParser.json({ limit: "32 mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "32 mb", extended: true }));
app.use(cors());
/* Rutas */
app.use("/stories", storyRoutes);

/* Conexión a BD */
const MONGO_URI =
  "mongodb+srv://danicode:Ylqntryssre777@cluster0.ojynd.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5001;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Servidor corriendo en puerto: ${PORT}`)
    );
  } catch (error) {
    console.error("Error de conexión", err);
  }
};

connectDB();
mongoose.connection.on("open", () => console.log("Conexión establecida"));
mongoose.connection.on("error", (err) => console.log(err));
