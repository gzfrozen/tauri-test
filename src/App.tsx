import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import { data, setData } from "./signal";
import TestComponent from "./testConponent";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");
  const [value, setValue] = createSignal("ghjakfsd");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class="container">
      <div class="app-container">
        <h1>你好 Tauri!</h1>
      </div>
      <div class="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={logo} class="logo solid" alt="Solid logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

      <div class="row">
        <div>
          <input
            id="greet-input"
            onChange={(e) => setName(e.currentTarget.value)}
            placeholder="Enter a name..."
          />
          <button type="button" onClick={() => void greet()}>
            Greet
          </button>
        </div>
      </div>

      <p>{greetMsg}</p>
      <div class="mt-5">
        <h1 class="text-red-800 font-bold text-4xl">Counter {data()}!</h1>
      </div>
      <div>
        <button
          class="mt-5"
          onClick={() => {
            setData(data() + 1);
          }}
        >
          increment
        </button>
      </div>
      <TestComponent value={value()} setValue={setValue} />
    </div>
  );
}

export default App;
