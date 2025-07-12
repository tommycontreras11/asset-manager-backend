import { Request, Response } from "express";
import { getAllEmployeeService } from "../../services/employee/getAll.service";
import { statusCode } from "../../utils/status.util";

export const getAllEmployeeController = async (_req: Request, res: Response) => {
  getAllEmployeeService({})
    .then((data) => {
      const employees = data.map((employee) => ({
        uuid: employee.uuid,
        identification: employee.identification,
        email: employee.email,
        name: employee.name,
        password: employee.password,
        personType: employee.person_type,
        status: employee.status,
      }));

      res.status(statusCode.OK).json({ data: employees });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
