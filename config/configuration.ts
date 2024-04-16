export default () => ({
  port: parseInt(process.env.APP_PORT, 10) || 8080,
  database: {
    host: process.env.DB_HOST,

    port: parseInt(process.env.DB_PORT, 10) || 5432,
  },
});
