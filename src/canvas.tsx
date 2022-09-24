import { invoke } from "@tauri-apps/api";
import { Component, createSignal, For } from "solid-js";

const Canvas: Component = () => {
  const [pixel, setPixel] = createSignal(true);

  const render = () => {
    const data: Promise<boolean> = invoke("step_result");
    data
      .then((res) => {
        setPixel(res);
      })
      .catch((e) => console.error(e));
  };

  const pixels = [pixel, pixel];

  return (
    <For each={pixels}>
      {(pixel) => (
        <div
          class="h-10 w-10 inline"
          style={{ "background-color": pixel() ? "black" : "white" }}
          onclick={render}
        ></div>
      )}
    </For>
  );
};

export default Canvas;
