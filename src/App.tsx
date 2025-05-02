import React from "react";
import { Router } from "./core";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "./components/ui/sonner";

interface Props {}

export const App: React.FC<Props> = ({}) => {
  return (
    <Provider store={store}>
      <Router />
      <Toaster />
    </Provider>
  );
};
