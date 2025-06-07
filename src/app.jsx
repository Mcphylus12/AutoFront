import { Link, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import { ConfigProvider } from "./components/ConfigProvider";
import Routes from "./components/routes";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <Link rel="stylesheet" href="app.css" />
          <ConfigProvider>
            <>
              <div class="nav">
                <Routes />
              </div>
              <Suspense>{props.children}</Suspense>
            </>
          </ConfigProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
