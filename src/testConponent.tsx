import { Component } from "solid-js";
import { data, setData } from "./signal";
import "./App.css";

const TestComponent: Component<{
  value: string;
  setValue: (arg0: string) => void;
}> = (props) => {
  return (
    <>
      <div>Counter {data()}</div>
      <button
        onClick={() => {
          setData(data() + 1);
          props.setValue(props.value === "修改后" ? "修改前" : "修改后");
        }}
      >
        increment{" "}
      </button>
      <div>{props.value}</div>
    </>
  );
};

export default TestComponent;
