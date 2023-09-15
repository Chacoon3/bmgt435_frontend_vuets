// this file is to dynamically generate .env file for the project
// as the project is to be integrated with a YAML file, which pass the backend server URL as an environment variable to the container
// here we first get all the environment variables starting with "VITE_" from the process.env
// then we write them into the .env file, which is to be read by vite.config.ts

import process from "process";
import fs from "fs";

export default function createProjectEnvVars() {
  const env = process.env;
  const envVars = new Map<string, string>();

  let counter = 0
  for (const key in env) {
    if (key.startsWith("VITE_")) {
      envVars.set(key, env[key] ?? "");
      console.log(`env var ${key} = ${env[key]} added`);
      counter++;
    }
  }

  fs.writeFileSync(
    "./.env",
    Array.from(envVars)
      .map(([key, value]) => `${key}=${value}`)
      .join("\n")
  );

  console.log(`${counter} project env vars generated successfully!`);
}
