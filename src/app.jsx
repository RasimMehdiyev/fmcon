import { Router, Route } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import FailureModes from "~/routes/FailureModes";
import "./app.css";

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Nav />
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <Route path="/hri" component={FailureModes}/>
      <Route path="/pour" component={FailureModes}/>
      <Route path="/mobile" component={FailureModes}/>
      <FileRoutes />
    </Router>
  );
}
