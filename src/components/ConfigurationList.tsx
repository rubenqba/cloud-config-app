import React from "react";
import ConfigurationVariable from "./ConfigurationVariable";
import { createConfiguration } from "@lib/config-client";

const ConfigurationList = async () => {
  const keys = [
    "logging.level.root",
    "security.corporate.issuer",
    "security.corporate.clients.corporate-administrator.issuer",
    "dardeus.inventory.base-url",
  ];
  const config = await createConfiguration();
  return (
    <section className="border-2 border-black">
      <div className="border-2 border-black">Configuration List</div>
      <ul>
        {keys.map((k) => (
          <li key={k} className="border-2 border-black">
            <ConfigurationVariable init={config.resolve(k)}/>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ConfigurationList;
