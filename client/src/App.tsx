import React, { useState, useEffect } from 'react';
import './App.css';
import { MessengerClient } from './messenger/MessengerServiceClientPb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { MessageRequest } from './messenger/messenger_pb';

const client = new MessengerClient(`http://localhost:8080`);

function App() {
  const [arr, setArr] = useState(['start'])

  useEffect(() => {
    const emitter$ = client.getMessages(new Empty())
    emitter$.on('data', (a) => {
      setArr((state) => state.concat([a.getMessage() + '@' + new Date().getTime() / 1000]))
    })

    const req = new MessageRequest()
    req.setMessage('message from client')
    client.createMessage(req, null, (a) => {
      console.log(a);
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
