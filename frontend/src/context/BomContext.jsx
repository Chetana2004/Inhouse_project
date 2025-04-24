// src/context/BomContext.js
import { createContext, useState } from 'react';

export const BomContext = createContext();

export const BomProvider = ({ children }) => {
  const [boms, setBoms] = useState([
    // Sample data for testing
    {
      id: "BOM-1001",
      name: "Main Conveyor Assembly",
      product: "Model X-100",
      version: "1.0",
      status: "Active",
      components: 5,
      createdDate: "2023-05-15",
      items: [
        { itemCode: "BELT001", quantity: 5, unit: "m" },
        { itemCode: "MOT001", quantity: 2, unit: "pcs" }
      ]
    }
  ]);

  const addBom = (newBom) => {
    setBoms(prev => [...prev, newBom]);
  };

  const deleteBom = (bomId) => {
    setBoms(prev => prev.filter(bom => bom.id !== bomId));
    return true; // Return success status
  };

  return (
    <BomContext.Provider value={{ boms, addBom, deleteBom }}>
      {children}
    </BomContext.Provider>
  );
};