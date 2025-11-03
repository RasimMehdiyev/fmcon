import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <h1 class="text-4xl font-bold text-center my-[20px] text-[#51676D]">RoundTable</h1>
          <Nav />
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
