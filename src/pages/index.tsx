import { type NextPage } from "next";
import Head from "next/head";
import Image, { type StaticImageData } from "next/image";

interface Project {
  name: string,
  mainImage: StaticImageData,
}

interface HomeProps {
  projects: Project[]
}

const Home: NextPage<HomeProps> = ({ projects }: HomeProps) => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Alice&apos;s portfolio</title>
        <meta name="description" content="Alice's portfolio" />
      </Head>
      <main className="flex flex-col w-full items-center p-20">
        <ul className="grid md:grid-cols-2 gap-24 w-full">
          {
            projects.map(x => (
              <li key={x.name}>
                <a className="group" href={`/project/${x.name}`} >
                  <div className="relative pb-[75%] w-full overflow-hidden">
                    {/* <div className="overflow-hidden absolute h-full group-hover:opacity-90 transition-opacity duration-200"> */}
                    <Image className="absolute position-center" src={x.mainImage} alt="idk" />
                    {/* </div> */}
                  </div>
                  <p className="mt-3 text-xl">{x.name}</p>
                </a>
              </li>
            ))
          }
        </ul>
      </main>
    </>
  );
};

export default Home;

import tiotMainImage from "../assets/images/the-importance-of-touch/main-image.jpeg";
// This function gets called at build time
export function getStaticProps() {

  const projects: Project[] = [{
    name: "The importance of touch",
    mainImage: tiotMainImage,
  },
  {
    name: "The importance of touch",
    mainImage: tiotMainImage,
  }
  ];

  return {
    props: {
      projects
    },
  }
}

