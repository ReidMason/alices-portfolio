import Image from "next/image";
import { getProjectSlug } from "~/utils/projectUtils";
import getProjects from "~/content/projects";

const projects = getProjects();

const Home = () => {
  return (
    <main className="flex flex-col w-full items-center">
      <ul className="grid md:grid-cols-2 gap-24 w-full">
        {
          projects.map(x => (
            <li key={x.name}>
              <a className="group" href={`/project/${getProjectSlug(x.name)}`} >
                <div className="relative pb-[75%] w-full overflow-hidden">
                  <div className="absolute h-full w-full group-hover:opacity-90 transition-opacity duration-200">
                    <Image className="object-cover h-full" src={x.imageData.mainImage.src} fill alt={x.imageData.mainImage.alt} />
                  </div>
                </div>
                <p className="mt-3 text-xl">{x.name}</p>
              </a>
            </li>
          ))
        }
      </ul>
    </main>
  );
};

export default Home;
