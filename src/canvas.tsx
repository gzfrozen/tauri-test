import { invoke } from "@tauri-apps/api";
import {
  Accessor,
  Component,
  createSignal,
  For,
  onCleanup,
  onMount,
} from "solid-js";
import "./canvas.css";

const resolution = { x: 80, y: 40 };

const Canvas: Component = () => {
  const [pixel, setPixel] = createSignal(true);
  const [pixelSize, setPixelSize] = createSignal("0");
  const pixels = Array<Accessor<boolean>>(resolution.x * resolution.y).fill(
    pixel
  );

  const getPixelSize = () => {
    const canvasElement = canvas as HTMLDivElement;
    console.log(canvasElement.clientWidth);
    setPixelSize((canvasElement.clientWidth / resolution.x).toString() + "px");
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

  const canvas = (
    <div
      class="grid m-10"
      style={{
        "grid-template-columns": `repeat(${resolution.x}, ${pixelSize()})`,
        "grid-template-rows": `repeat(${resolution.y}, ${pixelSize()})`,
      }}
    >
      <For each={pixels}>
        {(pixel) => (
          <div
            class="pixel border-red-600"
            style={{
              "background-color": pixel() ? "black" : "white",
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
