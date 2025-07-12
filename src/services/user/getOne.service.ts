import { statusCode } from "../../utils/status.util";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { FindOneOptions } from "typeorm";

export async function getOneUserService(
  option: FindOneOptions<UserEntity>
) {
  const foundUser = await UserEntity.findOne(option).catch((e) => {
    console.error("getOneUserService -> UserEntity.findOne: ", e);
    return null;
  });

  if (!foundUser) {
    return Promise.reject({
      message: "User not found",
      status: statusCode.NOT_FOUND,
    });
  }

  return foundUser;
}
