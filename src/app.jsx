import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { ConfigProvider } from "./components/ConfigProvider";
import Routes from "./components/routes";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <ConfigProvider>
            <>
              <div class="nav">
                <Routes />
              </div>
              <div class="main">
                <Suspense>{props.children}</Suspense>
              </div>
            </>
          </ConfigProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
