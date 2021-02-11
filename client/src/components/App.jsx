import React from 'react';
import axios from 'axios';

const port = env.PORT;

export default function App() {
  return (
    <div className="app">
      <h1>Hello world.</h1>
      <h2>{port}</h2>
    </div>
  );
}
