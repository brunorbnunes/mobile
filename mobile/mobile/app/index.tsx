import React from 'react';
import { AuthProvider } from '../AuthContext';
import MainNavigator from './contexts/MainNavigator';

export default function App() {
  return (
    <AuthProvider>
      <MainNavigator />
    </AuthProvider>
  );
}
