import { Title } from "@solidjs/meta";
import Counter from "~/components/Counter";

export default function Home() {
  return (
    <main>
      <Title>Hello World</Title>
      <h1>Hello world!</h1>
      <Counter />
      <p>
        Visit{" "}
        <a href="https://start.solidjs.com" target="_blank">
          start.solidjs.com
        </a>{" "}
        to learn how to build SolidStart apps.
        <ul>
          <li>Action handling</li>
          <li>Action styling</li>
          <li>Styling</li>
          <li>config driven root pages</li>
        </ul>
      </p>
    </main>
  );
}
