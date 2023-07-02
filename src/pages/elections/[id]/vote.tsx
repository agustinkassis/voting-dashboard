import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Footer from "~/components/footer";
import users from "../../../constants/users.json";
import questionsJson from "../../../constants/questions.json";
import type { User as IUser } from "~/types/user";
import Ballot from "../ballot";
import SidebarUsers from "~/components/voting/sidebarUsers";
import { type IQuestion } from "~/types/question";
import { type IResponseSet } from "~/types/response";
import { useBallot } from "contexts/Ballot";

const questions = questionsJson as IQuestion[];

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [currentUser, setCurrentUser] = useState<IUser>(users[0]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);

  const router = useRouter();
  const ballot = useBallot();
  const { id: electionId } = router.query;

  const initialResponses = {
    honestidad: null,
    humildad: null,
    innovacion: null,
    libertad: null,
    merito: null,
    racionalidad: null,
    sinergia: null,
  };

  useEffect(() => {
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [electionId]);

  const promptFinish = () => {
    alert("Listooo");
  };

  const onNextUser = (responses: IResponseSet) => {
    console.dir("responses:");
    console.dir(responses);

    const updatedUser = {
      ...currentUser,
      responses,
    };

    ballot.saveResponses(currentUser.pub, responses);

    setCurrentUser(updatedUser);
    const newIndex = currentIndex + 1;
    if (newIndex >= users.length) {
      setCurrentIndex(null);
      promptFinish();
    }

    window.scrollTo(0, 0);
    setCurrentIndex(newIndex);
    setCurrentUser(users[newIndex]);
  };

  useEffect(() => {
    if (currentIndex === null) {
      setCurrentUser(null);
      return;
    }
    setCurrentUser(users[currentIndex]);
  }, [currentIndex]);

  useEffect(() => {
    ballot.setElection(electionId as string);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                  <div className="flex w-[900px] flex-row border-2 border-solid border-white">
                    <SidebarUsers
                      currentUser={currentUser}
                      users={users}
                      setCurrentIndex={setCurrentIndex}
                    />
                    {currentUser ? (
                      <Ballot
                        currentUser={currentUser}
                        initialResponses={initialResponses}
                        lastUser={currentIndex + 1 >= users.length}
                        questions={questions}
                        onNextUser={onNextUser}
                      />
                    ) : (
                      "Seleccioná un usuario"
                    )}
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
