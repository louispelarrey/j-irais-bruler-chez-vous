import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";
import Manifestation from "./src/manifestation/manifestation.entity";

config();

const configService = new ConfigService();

export default new DataSource({
    type: "postgres",
    host: configService.get<string>("DB_HOST"),
    port: configService.get<number>("DB_PORT"),
    username: configService.get<string>("DB_USER"),
    password: configService.get<string>("DB_PASSWORD"),
    database: configService.get<string>("DB_NAME"),
    entities: [Manifestation],
});
