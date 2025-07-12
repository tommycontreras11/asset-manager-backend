import { Not } from "typeorm";
import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateEmployeeDTO } from "../../dto/employee.dto";
import { hashPassword } from "../../utils/common.util";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";
import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";

export async function updateEmployeeService(
  uuid: string,
  {
    userUUID,
    identification,
    name,
    email,
    password,
    departmentUUID,
    personType,
    status,
  }: UpdateEmployeeDTO & { userUUID: string }
) {
  const validateUser = await retrieveIfUserExists(null, null, userUUID);

  if (!(validateUser instanceof UserEntity))
    return Promise.reject({
      message: "Unauthorized",
      status: statusCode.UNAUTHORIZED,
    });

  const foundEmployee = await EmployeeEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("updateEmployeeService -> EmployeeEntity.findOneBy: ", e);
    return null;
  });

  if (!foundEmployee) {
    return Promise.reject({
      message: "Employee not found",
      status: statusCode.NOT_FOUND,
    });
  }

  let foundDepartment: DepartmentEntity | null = null;
  if (departmentUUID) {
    foundDepartment = await DepartmentEntity.findOneBy({
      uuid: departmentUUID,
    }).catch((e) => {
      console.error(
        "updateDepartmentService -> DepartmentEntity.findOneBy: ",
        e
      );
      return null;
    });

    if (!foundDepartment) {
      return Promise.reject({
        message: "Department not found",
        status: statusCode.NOT_FOUND,
      });
    }
  }

  if (identification) {
    const existingEmployee = await EmployeeEntity.findOne({
      where: { identification, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateEmployeeService -> EmployeeEntity.findOneBy: ", e);
      return null;
    });

    if (existingEmployee) {
      return Promise.reject({
        message: "Employee's identification already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  foundEmployee.identification = identification ?? foundEmployee.identification;
  foundEmployee.name = name ?? foundEmployee.name;
  foundEmployee.email = email ?? foundEmployee.email;
  foundEmployee.password = password
    ? hashPassword(password)
    : foundEmployee.password;
  foundEmployee.person_type = personType ?? foundEmployee.person_type;
  foundEmployee.department = foundDepartment ?? foundEmployee.department;
  foundEmployee.status = status ?? foundEmployee.status;

  await foundEmployee.save().catch((e) => {
    console.error("updateEmployeeService -> EmployeeEntity.update: ", e);
    return null;
  });

  return "Employee updated successfully";
}
