import app from "./app";
import mongoose from "mongoose";
import config from "./app/configs";

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log(`database connected`)

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}.`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
