import { Request, Response } from "express";
import { getAllUserService } from "../../services/user/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllUserController = async (_req: Request, res: Response) => {
  getAllUserService({})
    .then((data) => {
      const users = data.map((user) => ({
        uuid: user.uuid,
        identification: user.identification,
        email: user.email,
        name: user.name,
        password: user.password,
        status: user.status,
      }));

      res.status(statusCode.OK).json({ data: users });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
