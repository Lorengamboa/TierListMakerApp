import v1 from "./migrations/v1";

export const migrations = {
  0: async (state) => {
    // migration clear out device state
    return {
      ...state,
      tiers: undefined,
    };
  },
  1: v1,
};
