import { EmployeeEntity } from "./../database/entities/entity/employee.entity";
import { UserEntity } from "./../database/entities/entity/user.entity";
import { statusCode } from "./status.util";

export async function retrieveIfUserExists(
  identification?: string | null,
  email?: string | null,
  uuid?: string | null
) {
  const entities = await Promise.all([
    UserEntity.findOne({
      where: {
        ...(identification && { identification }),
        ...(email && { email }),
        ...(uuid && { uuid }),
      },
    }),
    EmployeeEntity.findOne({
      where: {
        ...(identification && { identification }),
        ...(email && { email }),
        ...(uuid && { uuid }),
      },
    }),
  ]);

  return entities.find((entity) => entity) || null;
}

export async function validateProperty<T>(
  entityClass: { new (): T },
  property: string,
  columnName: "Identification" | "Email"
) {
  const propertyToValidate = columnName === "Identification" ? true : false;
  const foundUser = await retrieveIfUserExists(
    propertyToValidate ? property : null,
    property
  );

  const isEntityClassType = foundUser instanceof entityClass;

  if (foundUser && (!isEntityClassType || isEntityClassType)) {
    return Promise.reject({
      message: `${columnName} already exists`,
      status: statusCode.BAD_REQUEST,
    });
  }
}
