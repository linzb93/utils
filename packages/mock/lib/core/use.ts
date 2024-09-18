import type { BasicType } from "../types";

type PluginType = (...args: any[]) => BasicType;
export const database: {
  [key: string]: PluginType;
} = {};

interface MockPlugin {
  name: string;
  serve: PluginType;
}

export default function (plugin: MockPlugin) {
  const { name, serve } = plugin;
  database[name] = serve;
}
