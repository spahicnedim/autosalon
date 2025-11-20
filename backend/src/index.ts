import app from "./app";
import dotenv from "dotenv";
import logger from "./utils/logger";

dotenv.config();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});
