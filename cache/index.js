import { createClient } from "redis";

const redisClient = createClient(process.env.REDIS_URL);

redisClient.on("error", (error) => {
  console.log(error);
});

await redisClient.connect();

export default redisClient;
