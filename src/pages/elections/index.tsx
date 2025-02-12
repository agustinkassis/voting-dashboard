import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "~/components/button";
import Footer from "~/components/footer";

import elections from "~/constants/elections.json";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>Election page - La Crypta</title>
        <meta name="description" content="Created by La Crypta" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#15162c] to-[#2e026d] text-2xl text-white">
        <div className="container flex w-fit flex-col items-center justify-center gap-12 px-4 py-16">
          <div className="space-y-4 text-center">
            <div className="flex flex-col content-center justify-center">
              {isLoading ? (
                "Cargando"
              ) : (
                <>
                  <div className="flex w-[900px] flex-row flex-col border-2 border-solid border-white">
                    <div>Votaciones</div>
                    <div>
                      {elections.map((election, k) => (
                        <Button
                          key={k}
                          onClick={() =>
                            void router.push(`/elections/${election.id}`)
                          }
                        >
                          Votación #{k + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Home;
