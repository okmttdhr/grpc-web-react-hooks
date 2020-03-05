import React from 'react';
import './App.css';
import { GreeterClient } from './HelloworldServiceClientPb';
import { HelloRequest } from './helloworld_pb';

const client = new GreeterClient(`http://localhost:8080`);

function App() {
  const req = new HelloRequest()
  req.setName('message from client')
  client.sayHello(req, {}, (a, b) => {
    console.log(a);
    console.log(b);
  })
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
