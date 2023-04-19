import { type NextPage } from "next";
import Head from "next/head";

interface Project {
  name: string,
  image: string,
}

interface HomeProps {
  projects: Project[]
}

const Home: NextPage<HomeProps> = ({ projects }: HomeProps) => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Alice's portfolio</title>
        <meta name="description" content="Alice's portfolio" />
      </Head>
      <main>
        {
          projects.map(x => (
            <div>{x.name}</div>
          ))
        }
      </main>
    </>
  );
};

export default Home;

// This function gets called at build time
export async function getStaticProps() {
  const projects: Project[] = [{
    name: "The importance of touch",
    image: "idk"
  }];

  return {
    props: {
      projects
    },
  }
}

