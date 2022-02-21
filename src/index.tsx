import ReactDOM from "react-dom";
import { AppRouter } from "./AppRouter";
import { ContextWrapper } from "./data/context/ContextWrapper";

import "./index.css";

ReactDOM.render(
  <ContextWrapper>
    <AppRouter />
  </ContextWrapper>,
  document.getElementById("root")
);
