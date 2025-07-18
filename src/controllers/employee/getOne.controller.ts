import { Request, Response } from "express";
import { getOneEmployeeService } from "../../services/employee/getOne.service";
import { statusCode } from "../../utils/status.util";

export const getOneEmployeeController = async (req: Request, res: Response) => {
  const { uuid } = req.params;

  getOneEmployeeService({
    where: {
      uuid,
    },
    relations: {
      department: true,
    },
  })
    .then((data) => {
      const employee = {
        uuid: data.uuid,
        identification: data.identification,
        email: data.email,
        name: data.name,
        password: data.password,
        personType: data.person_type,
        department: {
          uuid: data.department.uuid,
          name: data.department.name,
        },
        status: data.status,
      };

      res.status(statusCode.OK).json({ data: employee });
    })
    .catch((e) =>
      res
        .status(e.status ?? statusCode.INTERNAL_SERVER_ERROR)
        .json({ error: { message: e.message } })
    );
};
