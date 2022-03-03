import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";

const redux_config = {
  key: 'root',
  storage
}

const perststedReducer = persistReducer(redux_config, reducers);

export let store = createStore(perststedReducer, composeWithDevTools());
export let persistor = persistStore(store);