let registry: Record<string, unknown> = {};
export const container = {
  get: (name: string) => {
    return registry[name];
  },
  set: (name: string, value: unknown) => {
    registry[name] = value;
  },
};
