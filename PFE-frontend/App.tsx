import React from "react";

// index.tsx is the entry point for the navigation folder 
import Navigation from "./src/navigation"; 
import { UserContextProvider } from "./src/contexts/UserContext";
import { TourContextProvider } from "./src/contexts/TourContext";
import { ClientContextProvider } from "./src/contexts/ClientContext";
import { BoxeContextProvider } from "./src/contexts/BoxeContext";
import { ArticleContextProvider } from "./src/contexts/ArticleContext";
import { TourDayDelivererProvider } from "./src/contexts/TourDayDelivererContext";
const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ClientContextProvider>
      <ArticleContextProvider>
        <BoxeContextProvider>
            <TourContextProvider>
            <TourDayDelivererProvider>
              <Navigation />
            </TourDayDelivererProvider>
            </TourContextProvider>
        </BoxeContextProvider>
        </ArticleContextProvider>
      </ClientContextProvider>
    </UserContextProvider>
  );
};

export default App;
