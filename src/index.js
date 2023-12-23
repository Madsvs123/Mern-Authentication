import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { persistReducer, persistStore } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux'
import storage from 'redux-persist/lib/storage';
import authReducer from './redux/auth.js'
import { PersistGate } from 'redux-persist/integration/react';
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

if (process.env.NODE_ENV === 'production') disableReactDevTools()

const persistConfig = {
  key : "root",
  storage : storage
}

const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer : persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

const persistor = persistStore(store)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
