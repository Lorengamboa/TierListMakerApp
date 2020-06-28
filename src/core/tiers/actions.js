import { configDefaultTierList } from "@config/tierList";

import {
  SELECT_TIER,
  CREATE_TIER,
  DELETE_TIER,
  MOVE_IMAGE,
  UPDATE_LABEL_COLOR,
  UPDATE_LABEL_KEY,
  ADD_PICTURE,
  DELETE_LABEL,
  ADD_LABEL,
  RESET_TIER,
  DELETE_IMAGE,
  UPDATE_TIER_PORTRAIT,
  UPDATE_TIER_CATEGORY,
  UPDATE_TIER_DESCRIPTION,
  UPDATE_TIER_NAME
} from "./actionTypes";

/**
 * @description selects a presaved tier list 
 * @param {*} tier 
 */
export function selectTier(tier) {
  return {
    type: SELECT_TIER,
    payload: tier
  }
}

/**
 * @description creates a new tier list
 * @param {*} tier
 */
export function createTier(tier, images = []) {
  let newTier = tier;

  newTier.labels = configDefaultTierList.tiers;
  newTier.labels.map((label) => (label.images = []));

  newTier.shape = "circle";
  newTier.images = images;
  
  return {
    type: CREATE_TIER,
    payload: newTier,
  };
}

/**
 * @description deletes a tier
 * @param {*} tier
 */
export function deleteTier(tier) {
  return {
    type: DELETE_TIER,
    payload: tier,
  };
}

export function resetTier() {
  return {
    type: RESET_TIER
  };
}

/**
 * @description moves a tier image among the tier labels
 * @param {*} image
 * @param {*} origin
 * @param {*} destiny
 */
export function moveImage(image, origin, destiny) {
  return {
    type: MOVE_IMAGE,
    payload: {
      image,
      origin,
      destiny,
    },
  };
}

export function deleteImage(image, origin) {
  return {
    type: DELETE_IMAGE,
    payload: {
      image,
      origin,
    },
  };
}

export function removeLabel(label) {
  return {
    type: DELETE_LABEL,
    payload: label,
  };
}

export function updateLabelColor(label, color) {
  return {
    type: UPDATE_LABEL_COLOR,
    payload: {
      label,
      color
    },
  };
}

export function updateLabelKey(label, key) {
  return {
    type: UPDATE_LABEL_KEY,
    payload: {
      label,
      key
    },
  };
}

export function addLabel(label, direction) {
  return {
    type: ADD_LABEL,
    payload: {
      label,
      direction
    },
  };
}

export function addPicture(picture) {
  return {
    type: ADD_PICTURE,
    payload: picture,
  };
}

export function updateName(name) {
  return {
    type: UPDATE_TIER_NAME,
    payload: name
  }
}

export function updatePortrait(picture) {
  return {
    type: UPDATE_TIER_PORTRAIT,
    payload: picture
  }
}

export function updateCategory(category) {
  return {
    type: UPDATE_TIER_CATEGORY,
    payload: category
  }
}

export function updateDescription(description) {
  return {
    type: UPDATE_TIER_DESCRIPTION,
    payload: description
  }
}