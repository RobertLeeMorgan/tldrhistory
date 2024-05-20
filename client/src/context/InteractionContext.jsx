import { createContext, useContext, useState } from 'react';

const InteractionContext = createContext();

export const useInteractionContext = () => useContext(InteractionContext);

export const InteractionProvider = ({ children }) => {
  const [postId, setPostId] = useState(null);
  const [actionType, setActionType] = useState(null);

  const setInteractionData = (id, type) => {
    setPostId(id);
    setActionType(type);
  };

  return (
    <InteractionContext.Provider value={{ postId, actionType, setInteractionData }}>
      {children}
    </InteractionContext.Provider>
  );
};