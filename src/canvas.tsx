import { invoke } from "@tauri-apps/api";
import { Component, createSignal, For, onCleanup, onMount } from "solid-js";

const Canvas: Component = () => {
  const [pixel, setPixel] = createSignal(true);
  const [pixelSize, setPixelSize] = createSignal("0");

  const getPixelSize = () => {
    const canvasElement = canvas as HTMLDivElement;
    console.log(canvasElement.clientWidth);
    setPixelSize((canvasElement.clientWidth / 3).toString() + "px");
  };

  window.addEventListener("resize", getPixelSize);

  onMount(() => {
    getPixelSize();
  });
  onCleanup(() => window.removeEventListener("resize", getPixelSize));

  const render = () => {
    const data: Promise<boolean> = invoke("step_result");
    data
      .then((res) => {
        setPixel(res);
      })
      .catch((e) => console.error(e));
  };

  const pixels = [
    pixel,
    pixel,
    pixel,
    pixel,
    pixel,
    pixel,
    pixel,
    pixel,
    pixel,
  ];

  const canvas = (
    <div
      class="grid m-10"
      style={{
        "grid-template-columns": "repeat(3, 1fr)",
        "grid-template-rows": "repeat(3, 1fr)",
      }}
    >
      <For each={pixels}>
        {(pixel) => (
          <div
            class="border-2 border-red-600"
            style={{
              "background-color": pixel() ? "black" : "white",
              height: pixelSize(),
              width: pixelSize(),
            }}
            onclick={render}
          ></div>
        )}
      </For>
    </div>
  );

  return (
    <>
      <div class="flex justify-center w-auto m-10 bg-gray-400">something</div>
      {canvas}
    </>
  );
};

export default Canvas;
