import { Router, Route } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import FailureModes from "~/routes/FailureModes";
import FailureDetails from "~/routes/FailureDetails";
import Finale from "~/routes/Finale";
import PanelistProfile from "~/routes/PanelistProfile";
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
      <Route path="/failure-details" component={FailureDetails}/>
      <Route path="/finale" component={Finale}/>
      <Route path="/profile" component={PanelistProfile}/>
      <FileRoutes />
    </Router>
  );
}
