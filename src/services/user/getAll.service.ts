import { statusCode } from "../../utils/status.util";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { FindManyOptions } from "typeorm";

export async function getAllUserService(
  options?: FindManyOptions<UserEntity>
) {
  const users = await UserEntity.find(options).catch((e) => {
    console.error("getAllUserService -> UserEntity.find: ", e);
    return null;
  });

  if (!users)
    return Promise.reject({
      message: "No users found",
      status: statusCode.NOT_FOUND,
    });

  return users;
}
