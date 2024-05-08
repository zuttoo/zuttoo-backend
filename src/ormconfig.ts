import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');
import { join } from 'path';
import * as fs from 'fs';

const dbUrl = config.get('postgresUrl');
const {host, port, username, password, database, caFilePath}=config.get('awsRdsConfig');

export const dataSource = new DataSource({
  type: 'postgres',
  // url: dbUrl,
  host:host,
  port: parseInt(port),
  username: username,
  password: password,
  database: database,
  entities: [join(process.cwd(), 'dist/**/*.entity.js')],
  migrations: [],
  ssl: true,
  extra: {
    ssl: {
      // remove before prod
      rejectUnauthorized:false,
      ca: fs.readFileSync(caFilePath)
    },
  },
  //   remove before deploying
  synchronize: true,
  logging: false,
});
