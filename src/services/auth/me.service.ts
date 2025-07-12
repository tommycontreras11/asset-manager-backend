import { EmployeeEntity } from "./../../database/entities/entity/employee.entity";
import { UserEntity } from "./../../database/entities/entity/user.entity";
import { UserRoleEnum } from "./../../enums/user-role.enum";
import { statusCode } from "./../../utils/status.util";
import { retrieveIfUserExists } from "./../../utils/user.util";

export async function meService(userUUID: string) {
  const foundUser = await retrieveIfUserExists(null, null, userUUID);

  if (!foundUser)
    return Promise.reject({
      message: "Unauthorized",
      status: statusCode.UNAUTHORIZED,
    });

  const userType =
    foundUser instanceof EmployeeEntity
      ? UserRoleEnum.EMPLOYEE
      : foundUser instanceof UserEntity
      ? UserRoleEnum.USER
      : null;

  return { user: foundUser, userType };
}
