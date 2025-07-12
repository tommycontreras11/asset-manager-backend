import { statusCode } from "./../../utils/status.util";
import { UserEntity } from "../../database/entities/entity/user.entity";
import { CreateUserDTO } from "../../dto/user.dto";
import { hashPassword } from "../../utils/common.util";
import { retrieveIfUserExists, validateProperty } from "../../utils/user.util";

export async function createUserService({
  userUUID,
  identification,
  email,
  password,
  ...payload
}: CreateUserDTO & { userUUID: string }) {
  const validateUser = await retrieveIfUserExists(null, null, userUUID);

  if (!(validateUser instanceof UserEntity))
    return Promise.reject({
      message: "Unauthorized",
      status: statusCode.UNAUTHORIZED,
    });

  await validateProperty<UserEntity>(
    UserEntity,
    identification,
    "Identification"
  );

  await validateProperty<UserEntity>(UserEntity, email, "Email");

  await UserEntity.create({
    identification,
    password: hashPassword(password),
    email,
    ...payload,
  })
    .save()
    .catch((e) => {
      console.error("createUserService -> UserEntity.create: ", e);
      return null;
    });

  return "User created successfully";
}
