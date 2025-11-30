// contexts/ConnectionContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Connection {
  id: string;
  studentId: string;
  partnerId: string;
  status: 'connected' | 'pending' | 'saved';
  connectedAt?: Date;
}

interface ConnectionContextType {
  connections: Connection[];
  savedConnections: Connection[];
  addConnection: (partnerId: string) => void;
  saveForLater: (partnerId: string) => void;
  removeConnection: (partnerId: string) => void;
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export const ConnectionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [savedConnections, setSavedConnections] = useState<Connection[]>([]);

  const addConnection = (partnerId: string) => {
    const newConnection: Connection = {
      id: `conn-${Date.now()}`,
      studentId: 'current-user', // This should come from your auth context
      partnerId,
      status: 'connected',
      connectedAt: new Date()
    };
    setConnections(prev => [...prev, newConnection]);
  };

  const saveForLater = (partnerId: string) => {
    const savedConnection: Connection = {
      id: `saved-${Date.now()}`,
      studentId: 'current-user',
      partnerId,
      status: 'saved'
    };
    setSavedConnections(prev => [...prev, savedConnection]);
  };

  const removeConnection = (partnerId: string) => {
    setConnections(prev => prev.filter(conn => conn.partnerId !== partnerId));
    setSavedConnections(prev => prev.filter(conn => conn.partnerId !== partnerId));
  };

  return (
    <ConnectionContext.Provider value={{
      connections,
      savedConnections,
      addConnection,
      saveForLater,
      removeConnection
    }}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnections = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnections must be used within a ConnectionProvider');
  }
  return context;
};