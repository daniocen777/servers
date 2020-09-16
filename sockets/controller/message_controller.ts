import { Request, Response } from "express";
import Server from "../classes/server";
import { usuariosConectados } from "../sockets/sockets";

export default class MessagesController {
  testGet(req: Request, res: Response) {
    res.json({
      ok: true,
      mensaje: "Todo OK",
    });
  }

  testPost(req: Request, res: Response) {
    const message = req.body.message;

    res.json({
      ok: true,
      message,
    });
  }

  enviarMensajePrivado(req: Request, res: Response) {
    const message = req.body.message;
    const id = req.params.id;

    const server = Server.instance;
    const payload = {
      de: message.de,
      cuerpo: message.cuerpo,
    };
    // Mandando mensaje a cliente en un canal particular (in)
    server.io.in(id).emit("mensaje-privado", payload);

    res.json({
      ok: true,
      id,
      message,
    });
  }

  enviarMensajeATodos(req: Request, res: Response) {
    const message = req.body.message;

    const server = Server.instance;
    const payload = {
      de: message.de,
      cuerpo: message.cuerpo,
    };
    // Mandando mensaje a cliente en un canal particular (in)
    server.io.emit("nuevo-mensaje", payload);

    res.json({
      ok: true,
      message,
    });
  }

  getIDs(req: Request, res: Response) {
    const server = Server.instance;
    server.io.clients((err: any, clientes: string[]) => {
      if (err) {
        return res.json({ ok: false, err });
      }
      res.json({ ok: true, clientes });
    });
  }

  getUsuarios(req: Request, res: Response) {
    // usuariosConectados => De la clase Sockets
    res.json({ ok: true, clientes: usuariosConectados.getLista() });
  }
}
