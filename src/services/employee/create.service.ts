import { DepartmentEntity } from "../../database/entities/entity/department.entity";
import { EmployeeEntity } from "../../database/entities/entity/employee.entity";
import { CreateEmployeeDTO } from "../../dto/employee.dto";
import { hashPassword } from "../../utils/common.util";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists, validateProperty } from "../../utils/user.util";
import { UserEntity } from "./../../database/entities/entity/user.entity";

export async function createEmployeeService({
  userUUID,
  identification,
  email,
  password,
  departmentUUID,
  personType,
  ...payload
}: CreateEmployeeDTO & { userUUID: string }) {
  const validateUser = await retrieveIfUserExists(null, null, userUUID);

  if (!(validateUser instanceof UserEntity))
    return Promise.reject({
      message: "Unauthorized",
      status: statusCode.UNAUTHORIZED,
    });

  await validateProperty<EmployeeEntity>(
    EmployeeEntity,
    identification,
    "Identification"
  );

  await validateProperty<EmployeeEntity>(EmployeeEntity, email, "Email");

  let foundDepartment = await DepartmentEntity.findOneBy({
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
  

  await EmployeeEntity.create({
    identification,
    password: hashPassword(password),
    email,
    department: foundDepartment,
    person_type: personType,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createEmployeeService -> EmployeeEntity.create: ", e);
      return null;
    });

  return "Employee created successfully";
}
