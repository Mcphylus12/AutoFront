import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import { ConfigProvider } from "./components/ConfigProvider";

export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>SolidStart - Basic</Title>
          <a href="/">Index</a>
          <a href="/about">About</a>
          <a href="/table/test">Test Table</a>
          <a href="/table/secondmodel">Test Table</a>
          <ConfigProvider>
            <Suspense>{props.children}</Suspense>
          </ConfigProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
