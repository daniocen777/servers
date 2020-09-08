import { Request, Response } from "express";

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

  testPostId(req: Request, res: Response) {
    const message = req.body.message;
    const id = req.params.id;

    res.json({
      ok: true,
      id,
      message,
    });
  }
}
