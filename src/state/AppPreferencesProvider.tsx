import React, { createContext, useContext } from "react";

import { useAppPreferencesLogic } from "../logics/appPreferences.logic";

type AppPreferencesContextValue = ReturnType<typeof useAppPreferencesLogic>;

const AppPreferencesContext = createContext<AppPreferencesContextValue | null>(
  null,
);

export function AppPreferencesProvider({
  children,
}: React.PropsWithChildren) {
  const value = useAppPreferencesLogic();

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

export const useAppPreferences = () => {
  const context = useContext(AppPreferencesContext);

  if (!context) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider.");
  }

  return context;
};
