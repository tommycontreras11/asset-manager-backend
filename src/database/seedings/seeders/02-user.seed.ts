import { DataSource } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { UserEntity } from "../../entities/entity/user.entity";
import { usersData } from "../data/user.data";

const bcrypt = require("bcrypt");

export class UserSeeder implements Seeder {
  async run(_factory: Factory, dataSource: DataSource): Promise<void> {
    const userRepo = dataSource.getRepository(UserEntity);

    try {
      await Promise.all(
        usersData.map(async (user) => {
          const exists = await userRepo.findOne({
            where: [
              { email: user.email },
              { identification: user.identification },
            ],
          });

          if (exists) return;

          await userRepo.save({
            identification: user.identification,
            name: user.name,
            email: user.email,
            password: await bcrypt.hash(user.password, 10),
          });
        })
      );
    } catch (error) {
      console.error("UserSeeder -> run: ", error);
    }
  }
}
