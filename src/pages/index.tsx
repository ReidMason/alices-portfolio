import { type NextPage } from "next";
import Image, { type StaticImageData } from "next/image";
import { MainLayout } from "~/components/layouts/MainLayout";
import tiotMainImage from "../assets/images/the-importance-of-touch/main-image.jpeg";
import { getProjectSlug } from "~/utils/projectUtils";

interface Project {
  name: string,
  mainImage: StaticImageData,
  mainImage2: string
}

interface HomeProps {
  projects: Project[]
}

const Home: NextPage<HomeProps> = ({ projects }: HomeProps) => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <MainLayout>
      <main className="flex flex-col w-full items-center">
        <ul className="grid md:grid-cols-2 gap-24 w-full">
          {
            projects.map(x => (
              <li key={x.name}>
                <a className="group" href={`/project/${getProjectSlug(x.name)}`} >
                  <div className="relative pb-[75%] w-full overflow-hidden">
                    <div className="absolute h-full w-full group-hover:opacity-90 transition-opacity duration-200">
                      {/* <Image className="object-cover h-full" src={x.mainImage} alt="" /> */}
                      <Image className="object-cover h-full" src={x.mainImage2} fill alt="" />
                    </div>
                  </div>
                  <p className="mt-3 text-xl">{x.name}</p>
                </a>
              </li>
            ))
          }
        </ul>
      </main>
    </MainLayout>
  );
};

export default Home;

// This function gets called at build time
export function getStaticProps() {

  const projects: Project[] = [{
    name: "The Importance of Touch",
    mainImage: tiotMainImage,
    mainImage2: "/main-image.jpeg"
  },
  {
    name: "The Importance of Touch",
    mainImage: tiotMainImage,
    mainImage2: "/main-image.jpeg"
  }
  ];

  return {
    props: {
      projects
    },
  }
}

