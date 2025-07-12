import { Not } from "typeorm";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { UpdateUserDTO } from "../../dto/user.dto";
import { hashPassword } from "../../utils/common.util";
import { statusCode } from "../../utils/status.util";
import { retrieveIfUserExists } from "../../utils/user.util";

export async function updateUserService(
  uuid: string,
  {
    userUUID,
    identification,
    name,
    email,
    password,
    status,
  }: UpdateUserDTO & { userUUID: string }
) {
  const validateUser = await retrieveIfUserExists(null, null, userUUID);

  if (!(validateUser instanceof UserEntity))
    return Promise.reject({
      message: "Unauthorized",
      status: statusCode.UNAUTHORIZED,
    });

  const foundUser = await UserEntity.findOne({
    where: { uuid },
  }).catch((e) => {
    console.error("updateUserService -> UserEntity.findOneBy: ", e);
    return null;
  });

  if (!foundUser) {
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });
  }

  if (identification) {
    const existingUser = await UserEntity.findOne({
      where: { identification, uuid: Not(uuid) },
    }).catch((e) => {
      console.error("updateUserService -> UserEntity.findOneBy: ", e);
      return null;
    });

    if (existingUser) {
      return Promise.reject({
        message: "User's identification already exists",
        status: statusCode.BAD_REQUEST,
      });
    }
  }

  foundUser.identification = identification ?? foundUser.identification;
  foundUser.name = name ?? foundUser.name;
  foundUser.email = email ?? foundUser.email;
  foundUser.password = password ? hashPassword(password) : foundUser.password;
  foundUser.status = status ?? foundUser.status;

  await foundUser.save().catch((e) => {
    console.error("updateUserService -> UserEntity.update: ", e);
    return null;
  });

  return "User updated successfully";
}
