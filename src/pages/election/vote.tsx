import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "~/components/footer";

import users from "../../constants/users.json";

import User from "../../components/voting/user";
import Question from "./question";
import questions from "../../constants/questions.json";
import Button from "~/components/button";
import type { User as IUser } from "~/types/user";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<IUser>(users[0]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const promptFinish = () => {
    alert("Listooo");
  };

  const clearQuestions = () => {
    alert("cleared!");
  };

  const onNextUser = () => {
    const newIndex = currentIndex + 1;
    if (newIndex >= users.length) {
      setCurrentIndex(null);
      promptFinish();
    }

    clearQuestions();
    setCurrentIndex(newIndex);
    setCurrentUser(users[newIndex]);
  };

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
                  <div className="flex w-[900px] flex-row justify-between border-2 border-solid border-white">
                    <div className="border-2 border-solid border-white">
                      {users.map((user, k) => (
                        <User
                          data={user}
                          key={k}
                          selected={currentUser.pub === user.pub}
                        />
                      ))}
                    </div>
                    <div className="border-2 border-solid border-white">
                      <h2>Votación</h2>
                      <div>
                        <div>
                          {questions.map((question) => (
                            <Question
                              key={question.key}
                              label={question.label}
                              onChange={() => {
                                alert("yellaaa");
                              }}
                            />
                          ))}
                        </div>
                        <div>
                          <Button onClick={() => onNextUser()}>
                            Votar finalmente
                          </Button>
                        </div>
                      </div>
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
