import FS from "@application/utils/FS";
import { configDefaultTierList } from "@config/tierList";

export default async (state) => {
  const tiers = await migrateSavedTierList();

  return {
    ...state,
    general: {
      ...state.general,
      coins: 0,
      selectedTier: undefined,
    },
    dashboard: undefined,
    tiers: {
      selectedTier: null,
      saved: tiers,
      deleted: [],
    },
  };
};

export function migrateSavedTierList() {
  return FS.getDirList().then((dirs) => {
    const dirPromise = dirs
      .map((dir, index) => {
        if (dir.name === "persistStore") return null;
        const tierListName = dir.name;

        return FS.getDirImages(tierListName)
          .then((images) => {
            dirs[index]["images"] = images;
          })
          .then(() => {
            return FS.getConfigFile(tierListName)
              .then((properties) => {
                var properties = properties;

                dirs[index].portrait = null;
                dirs[index].description = "";
                dirs[index].labels =
                properties.tiers || configDefaultTierList.tiers;
                dirs[index].labels.map((label) => (label.images = []));
                dirs[index].shape = properties.shape || "circle";

                return dirs[index];
              })
              .catch((err) => {
                dirs[index].portrait = null;
                dirs[index].description = "";
                dirs[index].labels = configDefaultTierList.tiers;
                dirs[index].labels.map((label) => (label.images = []));
                dirs[index].shape = "circle";

                return dirs[index];
              });
          })
          .catch((err) => {
            console.log("Failed to read dir name");
          });
      })
      .filter((dir) => dir !== null);

    return Promise.all(dirPromise);
  });
}
