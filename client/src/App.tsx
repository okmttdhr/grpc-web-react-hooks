import React, { useState, useEffect } from 'react';
import './App.css';
import { GreeterClient } from './HelloworldServiceClientPb';
import { HelloRequest } from './helloworld_pb';

const client = new GreeterClient(`http://localhost:8080`);

function App() {
  const [arr, setArr] = useState(['start'])

  useEffect(() => {
    const req = new HelloRequest()
    req.setName('message from client')
    const emitter$ = client.sayHello(req)
    emitter$.on('data', (a) => {
      setArr((state) => state.concat([a.getMessage() + '@' + new Date().getTime() / 1000]))
    })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {arr.map((a) => (<div key={a}>{a}</div>))}
      </header>
    </div>
  );
}

export default App;
