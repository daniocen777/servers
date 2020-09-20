const { io } = require("../index");
const Band = require("../models/band");
const Bands = require("../models/bands");

const bands = new Bands();
// Añadiendo algunas bandas
bands.addBand(new Band("Queen"));
bands.addBand(new Band("Radiohead"));
bands.addBand(new Band("Ariana Grande"));
bands.addBand(new Band("Oasis"));
/* console.log(bands["bands"][0].name); */

io.on("connection", (client) => {
  console.log("Cliente conectado");
  // Emitir al cliente que se conecta las bandas registradas
  client.emit("active-bands", bands.getBands());
  client.on("disconnect", () => {
    console.log("Cliente desconectado");
  });
  // Escuchando mensaje emitido desde index.html (script)
  client.on("mensaje", (payload) => {
    console.log("Mensaje recibido", payload);
    // Emitir a todos el mensaje
    io.emit("nuevo-mensaje", { admin: "Nuevo mensaje" });
  });

  client.on("emitir-mensaje", (payload) => {
    console.log(payload);
    /* io.emit("nuevo-mensaje", payload); => Emite a todos */
    client.broadcast.emit("nuevo-mensaje", payload); // Todos, menos al que lo emite
  });

  /* Escuchar cuando cliente emita evento para votar */
  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    // Notificar del cambio
    io.emit("active-bands", bands.getBands());
  });

  /* Escuchar cuando cliente emita evento para agregar nueva banda */
  client.on("add-band", (payload) => {
    bands.addBand(new Band(payload.name));
    // Notificar del cambio
    io.emit("active-bands", bands.getBands());
  });

  /* Escuchar cuando cliente emita evento para eliminar banda */
  client.on("delete-band", (payload) => {
    bands.deleteBand(payload.id);
    // Notificar del cambio
    io.emit("active-bands", bands.getBands());
  });
});
