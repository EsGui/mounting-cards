import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/Header";
import Body from "./components/Body";

export default function Home() {
  return (
    <main>
      <Header />
      <Body />
    </main>
  );
}
