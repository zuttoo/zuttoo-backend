// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');
import { join } from 'path';
import * as fs from 'fs';
import { DataSource } from 'typeorm';
const { host, port, username, password, database, caFilePath } = config.get('awsRdsConfig');

export const typeOrmConfig = new DataSource({
  type: 'postgres',
  host: host,
  port: parseInt(port),
  username: username,
  password: password,
  database: database,
  entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
  migrations: [],
  ssl: true,
  extra: {
    ssl: {
      // remove before prod
      rejectUnauthorized: true,
      ca: fs.readFileSync(caFilePath),
    },
  },
  //   remove before deploying,
  synchronize: true,
  logging: false,
});
