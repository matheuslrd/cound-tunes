import React from 'react';
import Switcher from './Components/Switcher';
import './app.css';

class App extends React.Component {
  render() {
    return (
      <main className="main-content">
        <Switcher />
      </main>
    );
  }
}

export default App;
