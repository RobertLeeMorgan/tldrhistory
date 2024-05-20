import { createContext, useContext, useState } from 'react';

const InteractionContext = createContext();

export const useInteractionContext = () => useContext(InteractionContext);

export const InteractionProvider = ({ children }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [likeId, setLikeId] = useState(null);

  return (
    <InteractionContext.Provider value={{ deleteId, likeId, setDeleteId, setLikeId }}>
      {children}
    </InteractionContext.Provider>
  );
};