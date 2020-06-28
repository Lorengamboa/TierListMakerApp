import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import FilesystemStorage from 'redux-persist-filesystem-storage'

//import AsyncStorage from "@react-native-community/async-storage";

import { migrations } from "@core/migrations";

import reducers from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  version: 1,
  storage: FilesystemStorage,
  timeout: null,
  blacklist: ["dashboard"],
  migrate: createMigrate(migrations, { debug: true, asyncMigrations: true }),
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const persistor = persistStore(store);

export { persistor, store };
