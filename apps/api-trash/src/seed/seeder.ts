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

  const trashData: Partial<Trash>[] = Array.from({length: 1000}, () => ({
    reference: faker.lorem.sentence(),
    description: faker.lorem.sentence(),
    posterId: faker.string.uuid(),
    burners: [faker.internet.userName(), faker.internet.userName()],
    isBurned: faker.datatype.boolean(),
    fileImageUrl: faker.image.url(),
    //set the max latitude to paris, and the min latitude to paris too
    longitude: faker.location.longitude({max: 2.4136, min: 2.26}),
    latitude: faker.location.latitude({max: 48.9, min: 48.8162}),
    address: faker.location.streetAddress(),
    //set max date to 13 months ago
    createdAt: faker.date.past({ years: 1 }),
  }));

  for (const trash of trashData) {
    await trashRepository.save(trash);
  }
}

seed()
