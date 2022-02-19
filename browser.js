import { FunctionComponent, startTransition, useLayoutEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { app } from './app.jsx';

const el = document.getElementById("root");
ReactDOM.hydrateRoot(el, app);

console.log(1);