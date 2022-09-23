import { useState } from "react";
import "./styles.css";
import { Switch } from "./Switch";

// Here we can't use both default onClick from hook
// and pass another one to button
/*const useToggle = () => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  return {
    on,
    togglerProps: {
      'aria-pressed': on,
      onClick: toggle
    }
  };
};*/

const callAll = (...fns) => (...args) => fns.forEach((fn) => fn?.(...args));
// Here we can pass additional onclick callback to our toggle
const useToggle = () => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);

  function getTogglerProps({ onClick, ...props } = {}) {
    return {
      "aria-pressed": on,
      onClick: callAll(toggle, onClick),
      ...props
    };
  }

  return {
    on,
    getTogglerProps
  };
};

function App() {
  const { on, getTogglerProps } = useToggle();
  return (
    <div>
      <Switch on={on} {...getTogglerProps({})} />
      <hr />
      <button
        {...getTogglerProps({
          "aria-label": "custom-button",
          onClick: () => console.log("dsaf")
        })}
      >
        {on ? "on" : "off"}
      </button>
    </div>
  );
}

export default App;
