import {DataSource} from "typeorm";
import { Trash } from "../trash/trash.entity";
import { faker } from '@faker-js/faker';
import { TrashDto } from "../trash/dto/trash.dto";
import * as dotenv from 'dotenv';
dotenv.config();


const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "db_trash",
  synchronize: true,
  entities: [Trash],
})

export async function seed() {
  await AppDataSource.initialize();

  const trashRepository = AppDataSource.getRepository(Trash);

  const trashData: Partial<Trash>[] = Array.from({length: 100}, () => ({
    reference: faker.string.uuid(),
    description: faker.lorem.sentence(),
    address: faker.location.streetAddress(),
    posterId: faker.string.uuid(),
    burners: [faker.internet.userName(), faker.internet.userName()],
    isBurned: faker.datatype.boolean(),
    fileImageUrl: faker.image.url(),
    longitude: faker.location.longitude(),
    latitude: faker.location.latitude(),
  }));

  for (const trash of trashData) {
    await trashRepository.save(trash);
  }
}

seed()
