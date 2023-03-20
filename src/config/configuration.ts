export default () => ({
  PORT: parseInt(process.env.PORT, 10) || 5000,
  JWT_SECRET: parseInt(process.env.JWT_SECRET, 10),
  MONGO_URI: parseInt(process.env.MONGO_URI, 10),
});
