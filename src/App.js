import React from 'react';
import './App.css';
import Header from '../src/components/header/Header';
import ShipmentList from './components/shipments/ShipmentList';

const App = () => {
  return (
    <div className="App">
      <Header />
      <ShipmentList />
    </div>
  );
};

export default App;
