import { DataSource } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('config');
import { join } from 'path';

const dbUrl = config.get('postgresUrl');

export const dataSource = new DataSource({
  type: 'postgres',
  url: dbUrl,
  entities: [join(process.cwd(), 'dist/**/*.entity.js')],
  migrations: [],
  ssl: true,
  //   remove before deploying
  synchronize: true,
  logging: false,
});
