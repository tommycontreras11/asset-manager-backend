import { Request, Response } from "express";
import { getOneUserService } from "../../services/user/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneUserController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneUserService({
    where: {
      uuid,
    },
  })
    .then((data) => {
      const user = {
        uuid: data.uuid,
        identification: data.identification,
        email: data.email,
        name: data.name,
        password: data.password,
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: user });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
