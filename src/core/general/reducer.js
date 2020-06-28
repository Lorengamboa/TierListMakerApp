import { deviceLanguage } from '@utils/language'
import { COMPLETE_TUTORIAL, SELECT_LANGUAGE } from "./actionTypes";

const intialState = {
  coins: 0,
  tutorial: false,
  language: deviceLanguage || 'en'
};

export default function reducer(state = intialState, action) {
  switch (action.type) {
    case COMPLETE_TUTORIAL:
      return { ...state, tutorial: true };
    case SELECT_LANGUAGE:
      return { ...state, language: action.payload };      
    default:
      return state;
  }
}
