import { combineReducers } from "redux";

import generalReducer from "./general/reducer";
import tiersReducer from "./tiers/reducer";

export default combineReducers({
  general: generalReducer,
  tiers: tiersReducer
});
