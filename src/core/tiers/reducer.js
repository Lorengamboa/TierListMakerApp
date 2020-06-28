import {
  DELETE_TIER,
  CREATE_TIER,
  MOVE_IMAGE,
  SELECT_TIER,
  UPDATE_LABEL_COLOR,
  UPDATE_LABEL_KEY,
  ADD_PICTURE,
  DELETE_LABEL,
  ADD_LABEL,
  RESET_TIER,
  DELETE_IMAGE,
  UPDATE_TIER_NAME,
  UPDATE_TIER_PORTRAIT,
  UPDATE_TIER_DESCRIPTION,
  UPDATE_TIER_CATEGORY
} from "./actionTypes";

const intialState = {
  selectedTier: null,
  saved: [],
  deleted: [],
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case DELETE_TIER:
      var tier = action.payload;
      var cloneArray = state.saved.slice();

      cloneArray.splice(tier, 1);

      return {
        ...state,
        saved: cloneArray,
      };
    case SELECT_TIER:
      var selectedTier = action.payload;

      let selectedTierIndex = state.saved.findIndex((tier) => {
        return tier.name === selectedTier;
      });
      return { ...state, selectedTier: selectedTierIndex };

    case CREATE_TIER:
      return {
        ...state,
        saved: state.saved.concat(action.payload),
      };

    case MOVE_IMAGE:
      var { image, origin, destiny } = action.payload;
      var cloneArray = state.saved.slice();

      // image is from image slider
      if (origin === null) {
        // remove image from stack images
        let movedImage = cloneArray[state.selectedTier].images[image];

        cloneArray[state.selectedTier].images.splice(image, 1);
        cloneArray[state.selectedTier].labels[destiny].images.push(movedImage);
        return {
          ...state,
          saved: cloneArray,
        };
      }
      // image is from tier row
      else if (Number.isInteger(origin)) {
        var movedImage =
          cloneArray[state.selectedTier].labels[origin].images[image];

        // remove image from stack images
        cloneArray[state.selectedTier].labels[origin].images.splice(image, 1);

        if (destiny === null) {
          cloneArray[state.selectedTier].images.push(movedImage);
        }
        if (Number.isInteger(destiny))
          cloneArray[state.selectedTier].labels[destiny].images.push(
            movedImage
          );

        return {
          ...state,
          saved: cloneArray,
        };
      }
      return state;

    case DELETE_IMAGE:
      var { image, origin } = action.payload;
      var cloneArray = state.saved.slice();
      // image is from image slider
      if (origin === null) {
        cloneArray[state.selectedTier].images.splice(image, 1);
      } else if (Number.isInteger(origin)) {
        // remove image from stack images
        cloneArray[state.selectedTier].labels[origin].images.splice(image, 1);
      }

      return {
        ...state,
        saved: cloneArray,
      };

    case UPDATE_LABEL_COLOR:
      var { label, color } = action.payload;
      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].labels[label].color = color;

      return {
        ...state,
        saved: cloneArray,
      };

    case DELETE_LABEL:
      var label = action.payload;
      var cloneArray = state.saved.slice();

      let images = cloneArray[state.selectedTier].labels[label].images;

      cloneArray[state.selectedTier].images = cloneArray[
        state.selectedTier
      ].images.concat(images);
      cloneArray[state.selectedTier].labels.splice(label, 1);

      return {
        ...state,
        saved: cloneArray,
      };
    case UPDATE_LABEL_KEY:
      var { label, key } = action.payload;

      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].labels[label].key = key;

      return {
        ...state,
        saved: cloneArray,
      };

    case ADD_LABEL:
      var { label, direction } = action.payload;
      var cloneArray = state.saved.slice();

      const newLabel = {
        key: "",
        color: "white",
        images: [],
      };

      if (direction === "below") {
        cloneArray[state.selectedTier].labels = [
          ...cloneArray[state.selectedTier].labels.slice(0, label + 1),
          newLabel,
          ...cloneArray[state.selectedTier].labels.slice(label + 1),
        ];
      }

      if (direction === "above") {
        cloneArray[state.selectedTier].labels = [
          ...cloneArray[state.selectedTier].labels.slice(0, label),
          newLabel,
          ...cloneArray[state.selectedTier].labels.slice(label),
        ];
      }

      return {
        ...state,
        saved: cloneArray,
      };

    case UPDATE_TIER_NAME:
      var name = action.payload;

      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].name = name;

      return {
        ...state,
        saved: cloneArray,
      };

    case UPDATE_TIER_PORTRAIT:
      var picture = action.payload;

      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].portrait = picture;

      return {
        ...state,
        saved: cloneArray,
      };

    case UPDATE_TIER_DESCRIPTION:
      var description = action.payload;

      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].description = description;

      return {
        ...state,
        saved: cloneArray,
      };

    case UPDATE_TIER_CATEGORY:
      var category = action.payload;

      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].category = category;

      return {
        ...state,
        saved: cloneArray,
      };

    case ADD_PICTURE:
      var picture = action.payload;

      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].images.push(picture);

      return {
        ...state,
        saved: cloneArray,
      };

    case RESET_TIER:
      var cloneArray = state.saved.slice();

      cloneArray[state.selectedTier].labels.map((label, index) => {
        if (label.images.length) {
          cloneArray[state.selectedTier].images = cloneArray[
            state.selectedTier
          ].images.concat(label.images);
          cloneArray[state.selectedTier].labels[index].images = [];
        } else cloneArray[state.selectedTier].labels[index].images = [];
      });

      return {
        ...state,
        saved: cloneArray,
      };
    default:
      return state;
  }
}
