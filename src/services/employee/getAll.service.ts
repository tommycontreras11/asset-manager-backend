import { statusCode } from "../../utils/status.util";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { FindManyOptions } from "typeorm";

export async function getAllEmployeeService(
  options?: FindManyOptions<EmployeeEntity>
) {
  const employees = await EmployeeEntity.find(options).catch((e) => {
    console.error("getAllEmployeeService -> EmployeeEntity.find: ", e);
    return null;
  });

  if (!employees)
    return Promise.reject({
      message: "No employees found",
      status: statusCode.NOT_FOUND,
    });

  return employees;
}
