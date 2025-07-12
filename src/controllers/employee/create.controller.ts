import { Request, Response } from "express";
import { createEmployeeService } from "../../services/employee/create.service";
import { statusCode } from "../../utils/status.util";

export const createEmployeeController = async (req: Request, res: Response) => {
  const userUUID = req.user?.uuid;

  createEmployeeService({ ...req.body, userUUID })
    .then((data) => res.status(statusCode.CREATED).json({ message: data }))
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
