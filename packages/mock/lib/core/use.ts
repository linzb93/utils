type PluginType = (value: string, length: number) => string;
export const database: {
  [key: string]: PluginType;
} = {};
export default function (name: string, plugin: PluginType) {
  database[name] = plugin;
}
