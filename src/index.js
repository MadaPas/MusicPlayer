import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const innerWidth=window.innerWidth;
let device=true;
if(innerWidth<=768){
device=false;
}

ReactDOM.render(
  <React.StrictMode>
    <App device={device} />
  </React.StrictMode>,
  document.getElementById("root")
);
