import { Router, Route } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import FailureDetails from "~/routes/FailureDetails";
import Finale from "~/routes/Finale";
import PanelistProfile from "~/routes/profile.jsx";
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
      <Route path="/failure-details" component={FailureDetails}/>
      <Route path="/finale" component={Finale}/>
      <Route path="/profile" component={PanelistProfile}/>
      <FileRoutes />
    </Router>
  );
}
