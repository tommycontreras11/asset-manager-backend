import { Request, Response } from "express";
import { deleteUserService } from "../../services/user/delete.service";
import { statusCode } from "../../utils/status.util";

export const deleteUserController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  deleteUserService(uuid)
    .then((data) => res.status(statusCode.OK).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
