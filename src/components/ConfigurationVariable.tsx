import React from "react";

export type VariableProps = {
  init: Promise<{key: string, value: string; time: number}>
};

const ConfigurationVariable = async ({ init }: Readonly<VariableProps>) => {
  const {key, value, time} = await init;
  return (
    <div className="flex flex-col justify-between">
      <div className="name"><span>name: </span><span>{key}</span></div>
      <div className="value"><span>value: </span><span>{value}</span></div>
      <div className="time"><span>time: </span><span>{time}ms</span></div>
    </div>
  );
};

export default ConfigurationVariable;
