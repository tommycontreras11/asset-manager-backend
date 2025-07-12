import {
  IQueryDates,
  IQueryPagination,
} from "@interfaces/common/express.interface";
import { FindOptionsWhere } from "typeorm";
import { EmployeeEntity } from "./../database/entities/entity/employee.entity";
import { UserEntity } from "./../database/entities/entity/user.entity";

declare global {
  namespace Express {
    interface Request {
      session: ObjectI;
      pagination?: IQueryPagination;
      dates?: IQueryDates;
      order: "ASC" | "DESC";
      filter: FindOptionsWhere | ObjectI;
      user: EmployeeEntity | UserEntity;
      cookies: {
        [key: string]: string;
      };
    }
  }
}

export {};
