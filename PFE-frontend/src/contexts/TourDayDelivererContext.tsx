import React, { createContext, useState } from "react";

interface TourDayDelivererContextProps {
  idTour: number;
  date: string;
  delivered: number;
  onDelivered: () => void;
  setIdTour: (idTour: number) => void;
  setDate: (date: string) => void;
}

const TourDayDelivererContext = createContext<TourDayDelivererContextProps>({
  idTour: 0,
  date: "",
  delivered: 0,
  onDelivered: () => {},
  setIdTour: () => {},
  setDate: () => {},
});

const TourDayDelivererProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [idTour, setIdTour] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  // to reload the component when the deliverer deliver a creche
  const [delivered, setDelivered] = useState<number>(1);

  const  onDelivered = () => {
    setDelivered(delivered + 1);
  };

  

  const exposedValue = {
    idTour,
    date,
    delivered,
    onDelivered,
    setIdTour,
    setDate,
  };

  return (
    <TourDayDelivererContext.Provider value={exposedValue}>
      {children}
    </TourDayDelivererContext.Provider>
  );
};

export { TourDayDelivererContext, TourDayDelivererProvider };
