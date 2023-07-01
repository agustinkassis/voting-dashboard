import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { nip19 } from "nostr-tools";
import React, { useEffect, useState } from "react";
import Footer from "~/components/footer";
import Posts from "~/components/posts";
import Profile from "~/components/profile";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [profilePubKey, setProfilePubKey] = useState<string>();

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) {
      return;
    }

    const { type, data } = nip19.decode(slug as string);
    if (type !== "npub") {
      void router.push("/");
      return;
    }

    setProfilePubKey(data as string);
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);
  return (
    <>
      <Head>
        <title>Discord Poll - La Crypta</title>
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
                  <Profile pubKey={profilePubKey} />
                  <Posts pubKey={profilePubKey} />
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
