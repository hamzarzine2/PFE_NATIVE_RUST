import React, { createContext, useState, useEffect, useContext } from "react";

import { Boxe } from "../models/boxe";
import { getBoxForTours } from "../services/boxeService";

interface BoxeContextProps {
  getBoxeDeliverer: (id: number) => Promise<Boxe[]>;
}

const BoxeContext = createContext<BoxeContextProps>({
  getBoxeDeliverer: (id: number) => Promise.resolve([]),
});

const BoxeContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  const getBoxeDeliverer = async (id: number): Promise<Boxe[]> => {
    console.log(id);
    const test =  await getBoxForTours(id);
    console.log(test);
    
    return test;
  };

  
  const exposedValue: BoxeContextProps = {
    getBoxeDeliverer,
  };

  return (
    <BoxeContext.Provider value={exposedValue}>{children}</BoxeContext.Provider>
  );
};

export { BoxeContext, BoxeContextProvider };
