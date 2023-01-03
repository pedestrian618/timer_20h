import React from 'react';
import { AuthProvider } from './providers/AuthProvider'
import { FocusProvider } from './providers/FocusProvider'
import './App.css';
import './service/firebase';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Timer from './components/Timer'

function App() {
  const time = new Date();
  time.setSeconds(time.getSeconds()+0); 
  return (
    <AuthProvider>
      <Header />
      <FocusProvider>
        <Timer  expiryTimestamp={time}/>
        <Dashboard />
      </FocusProvider>
      <Footer />
    </AuthProvider>
  );
}

export default App;
