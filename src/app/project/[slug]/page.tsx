import React from 'react'
import Image from 'next/image';
import getProjects from '~/projects';
import { getProjectSlug } from '~/utils/projectUtils';
import { notFound, redirect } from 'next/navigation';
import { MainHeading } from '~/components/typography/H1';

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug: rawSlug } = params;
  const slug = getProjectSlug(rawSlug);
  const projects = getProjects();
  const projectIndex = projects.findIndex(x => getProjectSlug(x.name) === slug);

  // No project found so check alternate names and redirect
  if (projectIndex == -1) {
    projects.findIndex(x => {
      if (!x.metadata.altNames) return false;

      for (let i = 0; i < x.metadata.altNames.length; i++) {
        const altName = x.metadata.altNames[i];
        if (altName && getProjectSlug(altName) === slug) redirect(`/project/${getProjectSlug(x.name)}`);
      }
    })
  }

  const project = projects[projectIndex];

  // Project not found to redirect to not found page
  if (!project) return notFound();

  // Find the next and previous pages
  const next = projects[projectIndex + 1];
  const prev = projects[projectIndex - 1];

  return (
    <main className="flex flex-col md:px-20">
      <MainHeading>
        {project.name}
      </MainHeading>
      {
        project.metadata.description && (
          <h2 className="text-lg max-w-4xl mb-12 md:mb-20">
            {project.metadata.description}
          </h2>
        )
      }

      <div className="grid md:grid-cols-2 gap-4 md:gap-8">
        <div className="flex md:hidden flex-col gap-4 md:gap-8">
          {project.imageData.images.map((x) => (
            <Image src={x.src} key={x.alt} alt={x.alt} />
          ))}
        </div>

        <div className="hidden md:flex flex-col gap-4 md:gap-8">
          {
            project.imageData.images.map((x, i) => {
              if (i % 2 == 0) return (
                <Image src={x.src} key={x.alt} alt={x.alt} />
              );
            })
          }
        </div>
        <div className="hidden md:flex flex-col gap-4 md:gap-8">
          {
            project.imageData.images.map((x, i) => {
              if (i % 2 != 0) return (
                <Image src={x.src} key={x.alt} alt={x.alt} />
              );
            })
          }
        </div>
      </div>

      <div className="flex mt-12">
        {
          prev && (
            <a
              className="text-2xl flex items-center gap-1"
              href={`/project/${getProjectSlug(prev.name)}`}
            > <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              {prev.name}
            </a>
          )
        }
        {
          next && (
            <a
              className="ml-auto text-2xl flex items-center gap-1"
              href={`/project/${getProjectSlug(next.name)}`}
            >
              {next.name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </a>
          )
        }
      </div>
    </main>
  )
}

export default Page;
