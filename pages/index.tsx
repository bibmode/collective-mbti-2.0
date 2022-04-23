import Head from "next/head";
import { Icon } from "@iconify/react";
import Image from "next/image";
import headerIllustration from "../public/index-images/girl-boy.svg";
import lightBulb from "../public/index-images/light-bulb.svg";
import greenCube from "../public/index-images/green-cube.svg";
import purpleShape from "../public/index-images/purple-dodecahedron.svg";
import screenshot from "../public/index-images/screenshot-desktop.png";
import avatar from "../public/avatars/casual-life-3d-avatar-with-person-in-glasses-and-orange-shirt.png";
import TypologyExample from "../components/TypologyExample";
import Traits from "../components/Traits";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSession, signIn, useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import ProfileButton from "../components/ProfileButton";
import ProfileMenu from "../components/ProfileMenu";
import { LayoutContext } from "../components/context/LayoutContext";
import { prisma } from "../lib/prisma";
import { GetServerSideProps } from "next";
import { User } from "../utils/User";

const sampleResult = [
  {
    cognitiveFunc: "Ne",
    level: 85,
    color: "#ef4444",
  },
  {
    cognitiveFunc: "Ti",
    level: 70,
    color: "#f97316",
  },
  {
    cognitiveFunc: "Fe",
    level: 50,
    color: "#facc15",
  },
  {
    cognitiveFunc: "Si",
    level: 30,
    color: "#10b981",
  },
  {
    cognitiveFunc: "Ne",
    level: 25,
    color: "#3b82f6",
  },
  {
    cognitiveFunc: "Ti",
    level: 25,
    color: "#6366f1",
  },
  {
    cognitiveFunc: "Fe",
    level: 10,
    color: "#a855f7",
  },
  {
    cognitiveFunc: "Si",
    level: 5,
    color: "#f472b6",
  },
];

const sampleTraits = [
  {
    trait: "Bold",
    description:
      " One of the ENTP’s greatest strengths and keys to success is his or her boldness in the face of challenge.",
  },
  {
    trait: "Adaptable",
    description:
      "ENTPs are generally go-with-the-flow people. They deal well with fast-paced and frequent change and enjoy the corresponding challenges.",
  },
  {
    trait: "Innovative",
    description:
      "In all things—products, procedures and systems—ENTPs know there is always a better way and with the right kind of thinking, they will get there.",
  },
  {
    trait: "Confident",
    description:
      "Generally speaking, criticism and ostracism have very little effect on ENTPs. ",
  },
];

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {
        userId: "",
      },
    };
  }

  // find user
  const userRes = await prisma.user.findFirst({
    where: { email: session.user?.email },
  });

  const userDetails = await JSON.parse(JSON.stringify(userRes));

  return {
    props: {
      userId: await userDetails.id,
    },
  };
};

type HomeProps = {
  userId: string;
};

const Home = ({ userId }: HomeProps) => {
  const { profileMenu, setProfileId, setUserLoggedIn } =
    useContext(LayoutContext);
  const { data: session, status } = useSession();

  const signInWithGoogle = () => {
    // Perform sign in
    signIn("google");
  };

  useEffect(() => {
    if (userId) setProfileId(userId);
  }, []);

  useEffect(() => {
    if (session && session.user) {
      const user = new User(session.user?.name, session.user?.image);
      setUserLoggedIn(user);
    }
  }, [session]);

  return (
    <div className="overflow-x-hidden">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container relative min-h-screen max-w-screen-xl w-screen text-gray-900">
        {/* blobs */}
        <div className="absolute w-[500px] h-[400px] -top-52 -left-64 bg-cyan-200/40 rounded-full blur-3xl" />

        <div className="absolute hidden lg:block -top-8 -right-36 -z-10 opacity-70">
          <div className="absolute -right-12 bg-fuchsia-200 rounded-full w-[600px] h-[600px] blur-3xl " />
          <div className="absolute top-8 right-24 bg-red-200 rounded-full w-[400px] h-[500px] blur-3xl " />
          <div className="absolute top-56 -right-4 -rotate-45 bg-orange-200/50 rounded-full w-[400px] h-[300px] blur-3xl " />
          <div className="absolute top-56 right-56 -rotate-45 bg-yellow-200/70 rounded-full w-[500px] h-[400px] blur-3xl " />
          <div className="absolute top-96 -right-6  bg-green-200/80 rounded-full w-[600px] h-[450px] blur-3xl " />
        </div>

        <nav className="py-9 flex relative justify-between items-center">
          {profileMenu && <ProfileMenu />}

          <Image src="/logo.svg" alt="logo" width="60" height="60" />
          {session ? (
            <ProfileButton />
          ) : (
            <button
              onClick={signInWithGoogle}
              className="flex items-center bg-gray-900 rounded-full py-3 px-4 hover:scale-105 transition-all duration-300"
            >
              <span className="pr-2 text-white text-sm relative z-10">
                Continue with
              </span>
              <Icon className="text-xl" icon="flat-color-icons:google" />
            </button>
          )}
        </nav>

        <header className="relative lg:mt-14 lg:min-h-[800px]">
          {/* title */}
          <div>
            <div className="flex items-center pt-4 pb-2">
              <Icon
                className="text-lg mr-1 text-green-600"
                icon="akar-icons:circle-check-fill"
              />
              <h2 className="font-medium">GET OBJECTIVE MBTI RESULTS</h2>
            </div>

            <h1 className="font-semibold text-title md:text-7xl max-w-sm lg:text-[81px]">
              COLLECTIVE MBTI
            </h1>
          </div>

          {/* illustration */}
          <div
            className="relative sm:absolute w-[468px] h-[266px] -ml-6 mt-12 sm:ml-auto sm:z-0 sm:top-4 sm:-right-24
          md:w-[599px] md:h-[340px] md:-right-48 lg:w-[901px] lg:h-[512px]
          "
          >
            <Image
              src={headerIllustration}
              alt="girl and boy"
              layout="fill"
              objectFit="cover"
            />

            <div
              className="absolute -top-8 sm:-top-16 left-14 sm:left-44 
            md:left-56 h-[86px] w-[79px] 
            lg:w-[115px] lg:h-[106px] lg:left-24 lg:-top-8"
            >
              <Image
                src={lightBulb}
                alt="light bulb"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </div>

          <p className="text-gray-400 mt-14 mb-8 sm:max-w-xs sm:absolute sm:mt-4 sm:z-50 md:max-w-md lg:max-w-lg">
            You can take the test yourself or ask your friends to take the test
            for you. See how people view you and get the accumulated data to get
            your most objective MBTI result.
          </p>

          {/* test buttons */}
          <div className="mb-24 sm:mt-48 w-full sm:flex sm:justify-between md:w-[445px] md:mt-36 md:absolute lg:w-[460px] lg:mt-32">
            <Link href="/mbti-test" passHref>
              <button className="flex sm:flex-col w-full backdrop-blur-2xl border-[1px] border-green-100/20 sm:w-[48%] sm:py-8 text-left bg-green-300/20 rounded-2xl p-6 md:mr-3 md:py-7 hover:bg-green-300/40 transition-all duration-300">
                <div className="relative w-[51px] h-[50px] -mt-1">
                  <Image
                    src={greenCube}
                    alt="green cube"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>

                <div className="ml-3 md:ml-0 md:mt-1">
                  <h3 className="font-semibold text-lg mb-1">
                    Take the test yourself
                  </h3>
                  <p className="text-[15px] text-gray-400">
                    Don’t have friends? Try typing yourself objectively.
                  </p>
                </div>
              </button>
            </Link>

            <button className="flex sm:flex-col w-full backdrop-blur-2xl border-[1px] border-pink-100/20 sm:w-[48%] sm:py-8 text-left bg-pink-300/20 rounded-2xl p-6 mt-4 sm:mt-0 md:ml-3 md:py-7 hover:bg-pink-300/40 transition-all duration-300">
              <div className="relative w-[51px] h-[50px] -mt-1">
                <Image
                  src={purpleShape}
                  alt="dodecahedron"
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              <div className="ml-3 md:ml-0 md:mt-1">
                <h3 className="font-semibold text-lg mb-1">
                  Get friends to type you
                </h3>
                <p className="text-[15px] text-gray-400">
                  What is your MBTI type according to friends?
                </p>
              </div>
            </button>
          </div>
        </header>

        <section className="relative hidden lg:block overflow-y-clip">
          <div className="relative w-full h-[600px] border-2 border-b-0 border-gray-800 rounded-t-[66px] overflow-hidden">
            <Image
              src={screenshot}
              alt="screenshot sample"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
          </div>

          {/* friend sample */}
          <div className="absolute -right-[31%] top-28">
            <TypologyExample results={sampleResult} avatar={avatar} />
          </div>

          {/* traits sample */}
          <div className="absolute w-[400px] -bottom-40 -left-44">
            <Traits traits={sampleTraits} type={true} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
