import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import Button from "~/components/button";
import Footer from "~/components/footer";
import Connected from "~/components/main/connected";
import NotConnected from "~/components/main/notConnected";
import Title from "~/components/title";
import useNOSTR from "~/hooks/useNOSTR";
import useWebLN from "~/hooks/useWebLN";

const Home: NextPage = () => {
  const { pubKey } = useNOSTR();
  const { isEnabled } = useWebLN();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Votación Discord - La Crypta</title>
        <meta name="description" content="Created by La Crypta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#15162c] to-[#2e026d] text-2xl text-white">
        <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
          <Title />
          <Button onClick={() => void router.push("election/vote")}>
            Votar
          </Button>
          <Button
            onClick={() => {
              alert("");
            }}
          >
            Ver Resultados
          </Button>
          {isEnabled && pubKey ? <Connected /> : <NotConnected />}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
