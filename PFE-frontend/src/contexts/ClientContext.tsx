import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../utils/config";
import { Tour } from "../models/tour";
import { Client } from "../models/Client";

interface ClientContextProps {
    getClients: (id: number) => Promise<Client[]>;
}

const ClientContext = createContext<ClientContextProps>({
    getClients: (id: number) => Promise.resolve([]),
});

const ClientContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [clients, setClients] = useState<Client[]>([]);

    const getClients = async (id: number): Promise<Client[]> => {
        try {
            const path = API_URL + `/tours/getTours/${id}/getAllClient`;
    
            const response = await axios.get(path);
            const newClients = response.data;
                if (newClients.length > 0) {
                setClients(newClients);
            }
    
            console.log(newClients);
            return newClients;
        } catch (error) {
            console.error("Error fetching clients:", error);
            return [];
        }
    };
    

    const exposedValue: ClientContextProps = {
        getClients,
    };

    return (
        <ClientContext.Provider value={exposedValue}>
            {children}
        </ClientContext.Provider>
    );
};

export { ClientContext, ClientContextProvider };
