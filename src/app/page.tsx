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
                    <Image className="object-cover h-full" src={x.imageData.mainImage.src} fill alt={x.imageData.mainImage.alt} placeholder="blur" blurDataURL="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http%3A//www.w3.org/2000/svg' viewBox='0 0 8 5'%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='1'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='discrete' tableValues='1 1'/%3E%3C/feComponentTransfer%3E%%3C/filter%3E%3Cimage preserveAspectRatio='none' filter='url(%23b)' x='0' y='0' height='100%25' width='100%25' href='data:image/jpeg;base64,/9j/2wBDAAoHBwgHBgoICAgLCgoLDhgQDg0NDh0VFhEYIx8lJCIfIiEmKzcvJik0KSEiMEExNDk7Pj4+JS5ESUM8SDc9Pjv/2wBDAQoLCw4NDhwQEBw7KCIoOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozv/wAARCAAFAAgDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAbEAACAwADAAAAAAAAAAAAAAABAgADBQZRkf/EABUBAQEAAAAAAAAAAAAAAAAAAAME/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAS/9oADAMBAAIRAxEAPwCcz+TpSgWzLosToOQfYiIqtJkv/9k='/%3E%3C/svg%3E" />
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
