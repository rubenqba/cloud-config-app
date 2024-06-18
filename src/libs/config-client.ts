import "server-only";
import config from "cloud-config-client";
import { env } from "./environment";

export class Configuration {
  constructor(private readonly source: config.Config) {}

  private lookup = async (key: string) => {
    const start = performance.now();
    let value: string = this.source.get(key);
    if (value != null && value) {
      const matches = value.matchAll(/\${(.*?)}/g);
      for (const match of matches) {
        const replacement = await this.lookup(match[1]);
        if (replacement != null && replacement) {
          value = value.replace(match[0], replacement);
        }
      }
    }
    return value;
  }
  public resolve = async (key: string) => {
    const start = performance.now();
    let value = await this.lookup(key);
    return {
      key,
      value,
      time: performance.now() - start,
    };
  };
}

export const createConfiguration = async () => {
  console.time("create-config");
  const cnf = new Configuration(
    await config.load({
      name: "corporate-app",
      endpoint: env.CLOUD_CONFIG_URL,
      auth: {
        user: env.CLOUD_CONFIG_USERNAME,
        pass: env.CLOUD_CONFIG_PASSWORD,
      },
    })
  );
  console.timeEnd("create-config");
  console.log("created new configuration instance");
  return cnf;
};
