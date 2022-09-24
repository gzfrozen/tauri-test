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

  const pixels = [pixel, pixel, pixel];

  return (
    <div class="flex">
      <For each={pixels}>
        {(pixel) => (
          <div
            class="h-40 w-40 border-2 border-red-600"
            style={{ "background-color": pixel() ? "black" : "white" }}
            onclick={render}
          ></div>
        )}
      </For>
    </div>
  );
};

export default Canvas;
