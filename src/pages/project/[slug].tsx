import { useRouter } from 'next/router'
import React from 'react'
import { MainLayout } from '~/components/layouts/MainLayout'
import { getProjectSlug } from '~/utils/projectUtils'
import projects from '~/content/projects';
import Image from "next/image";

const Project = () => {
  const router = useRouter()

  const { slug: querySlug } = router.query
  if (!querySlug || querySlug == undefined || querySlug.length == 0 || typeof querySlug !== "string") return <div>Error</div>;
  router.push("/");

  // Get perfectly matching project
  const convertedQuerySlug = getProjectSlug(querySlug);
  let project = projects.find(x => getProjectSlug(x.name) === convertedQuerySlug);

  // No project found so check alternate names
  if (!project) {
    project = projects.find(x => {
      if (!x.altNames) return false;

      for (let i = 0; i < x.altNames.length; i++) {
        const altName = x.altNames[i];
        if (altName && getProjectSlug(altName) === convertedQuerySlug) return true;
      }
    })
  }

  // Still no project found
  if (!project) return <div>Project not found</div>

  // Rewrite url to the correct name 
  const slug = getProjectSlug(project.name);
  if (querySlug != slug) void router.replace(`/project/${slug}`);

  return (
    <MainLayout>
      <main className="flex flex-col md:px-20">
        <h1 className="text-5xl mb-8 md:mb-12 leading-tight">
          {project.name}
        </h1>
        {
          project.description && (
            <h2 className="text-lg max-w-4xl mb-12 md:mb-20">
              {project.description}
            </h2>
          )
        }

        <div className="grid md:grid-cols-2 gap-4 md:gap-8">
          <div className="flex md:hidden flex-col gap-4 md:gap-8">
            {project.images.map((x) => <Image src={x} key={x} alt="" width="750" height="750" />)}
          </div>

          <div className="hidden md:flex flex-col gap-4 md:gap-8">
            {
              project.images.map((x, i) => {
                if (i % 2 == 0) return <Image src={x} key={x} alt="" width="750" height="750" />;
              })
            }
          </div>
          <div className="hidden md:flex flex-col gap-4 md:gap-8">
            {
              project.images.map((x, i) => {
                if (i % 2 != 0) return <Image src={x} key={x} alt="" width="750" height="750" />;
              })
            }
          </div>
        </div>

        {/* <div className="flex mt-12"> */}
        {/*   { */}
        {/*     prev && ( */}
        {/*       <a */}
        {/*         className="text-2xl flex items-center gap-1" */}
        {/*         href={`/project/${prev.slug}`} */}
        {/*       > */}
        {/*         <svg */}
        {/*           xmlns="http://www.w3.org/2000/svg" */}
        {/*           fill="none" */}
        {/*           viewBox="0 0 24 24" */}
        {/*           stroke-width="1.5" */}
        {/*           stroke="currentColor" */}
        {/*           className="w-6 h-6" */}
        {/*         > */}
        {/*           <path */}
        {/*             stroke-linecap="round" */}
        {/*             stroke-linejoin="round" */}
        {/*             d="M15.75 19.5L8.25 12l7.5-7.5" */}
        {/*           /> */}
        {/*         </svg> */}
        {/*         {prev.data.title} */}
        {/*       </a> */}
        {/*     ) */}
        {/*   } */}
        {/*   { */}
        {/*     next && ( */}
        {/*       <a */}
        {/*         className="ml-auto text-2xl flex items-center gap-1" */}
        {/*         href={`/project/${next.slug}`} */}
        {/*       > */}
        {/*         {next.data.title} */}
        {/*         <svg */}
        {/*           xmlns="http://www.w3.org/2000/svg" */}
        {/*           fill="none" */}
        {/*           viewBox="0 0 24 24" */}
        {/*           stroke-width="1.5" */}
        {/*           stroke="currentColor" */}
        {/*           className="w-5 h-5" */}
        {/*         > */}
        {/*           <path */}
        {/*             stroke-linecap="round" */}
        {/*             stroke-linejoin="round" */}
        {/*             d="M8.25 4.5l7.5 7.5-7.5 7.5" */}
        {/*           /> */}
        {/*         </svg> */}
        {/*       </a> */}
        {/*     ) */}
        {/*   } */}
        {/* </div> */}
      </main>
    </MainLayout>
  )
}

export default Project;
