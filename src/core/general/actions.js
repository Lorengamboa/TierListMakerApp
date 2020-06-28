import { SELECT_LANGUAGE } from './actionTypes'

  export function selectLanguage(language) {
    return {
      type: SELECT_LANGUAGE,
      payload: language
    }
  }