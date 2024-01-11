import Redis from "ioredis";

const redisClient = new Redis(process.env.REDIS_URL);

redisClient.on("connect", () => {
  console.log("Redis Connected!");
});

redisClient.on("error", (error) => {
  console.log(error);
});

export default redisClient;
