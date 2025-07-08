import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { PostSubmit } from './components/PostSubmit';
import { PostList } from './components/PostList';
import { trpc } from './config/trpc-config';
import { vanillaTRPC } from './config/trpc-vanilla-client';

function App() {
  // -----------------------CONSTS, HOOKS, STATES
  const manualTrigger = trpc.useUtils().greeting.hello.fetch
  
  // always contains the data
  const data = trpc.greeting.hello.useQuery({ name: 'Read' });

  // -----------------------MAIN METHODS
  function hookRead() {
    console.log({ data: data.data });
  }

  async function callQuery() {
    const response = await manualTrigger({ name: 'Manual' });
    console.log({ response });
  }

  async function callVanilla() {
    // Can be call from anywhere, is not a react hook
    const response = await vanillaTRPC.greeting.hello.query({ name: 'Vanilla' });
    console.log({ response });
  }

  // -----------------------RENDER
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={hookRead}>Log tRCP "greeting.hello" data</button>
        <button onClick={callQuery}>Manual call tRCP "greeting.hello"</button>
        <button onClick={callVanilla}>Vanilla call tRCP "greeting.hello"</button>
        <PostSubmit />
        <PostList />
      </div>
    </>
  );
}

export default App;

