import Image from "next/image";
import { Bungee } from "next/font/google";

const bungee = Bungee({ weight: "400", subsets: ["latin"] });

const discordUrl = "https://discord.gg/RegmAnw5cY";

function HeaderLink() {
  return (
    <a href={discordUrl} target="_blank">
      <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Launching soon, join us on&nbsp;
        <code className="font-mono font-bold">discord</code>
      </p>
    </a>
  );
}

function FiendLabsLogo() {
  return (
    <a
      className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
      href="https://x.com/fiendlabs?utm_source=fiendfx-site"
      target="_blank"
      rel="noopener noreferrer"
    >
      By{" "}
      <Image
        src="/fiendlabs-bw.svg"
        alt="fiendlabs-logo"
        className="dark:invert"
        width={60}
        height={24}
        priority
      />
      Fiendlabs
    </a>
  );
}

type InfoComponentProps = {
  title: string;
  description: string;
  link: string;
};
function InfoComponent ({title, description, link}: InfoComponentProps ) {
  return (
    <a
      href={link}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
      target="_blank"
      rel="noopener noreferrer"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>{title} </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        {description}
      </p>
    </a>
  );
}

export default function LandingContent() {
  return (
    <div className={bungee.className}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          <HeaderLink />
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
            <FiendLabsLogo />
          </div>
        </div>

        <div className="mb-40 mt-40 md:mb-0 md:mt-0 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">

          {/* Should say Fiend Fx */}
          <div className="flex flex-col space-y-5 justify-center items-center text-center">
            <div className="flex">
              <div className="text-6xl md:text-8xl text-black font-semibold bg-gradient-to-r from-purple-500 to-pink-500  hover:from-green-400 hover:to-blue-500 m-2 p-2 rounded-md animate-pulse">
                Fiend
              </div>
              <div className="italic text-2xl m-1 font-semibold">Fx</div>
            </div>
            <div className="text-2xl pb-8">Decentralised forex stablecoins</div>
            <a
              href="/dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white m-2 p-2 rounded-md text-black animate-bounce"
            >
              Try early access
            </a>
          </div>
        </div>

        <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
          <InfoComponent title="About" description="A unique platform for global stable coins." link="https://x.com/realfiendfx?utm_source=fiendfx-site" />
          <InfoComponent title="Community" description="Become a fiend & shape the future of Defi FX" link={discordUrl} />
          <InfoComponent title="Connect" description="Connect with us on Twitter / X" link="https://x.com/realfiendfx?utm_source=fiendfx-site" />
          <InfoComponent title="Collab" description="Send us an email, or join our discord." link="mailto:hello@fiendfx.com?subject=Inquiry from a Fiend" />
        </div>
      </main>
    </div>
  );
}
