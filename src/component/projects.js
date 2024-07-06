"use client";

import { ProjectCard } from "./project-card";
import { Typography } from "@material-tailwind/react";
import Pupm1 from '../images/pums/newPump.jpeg';
import Pupm2 from '../images/pums/newMotors.jpeg'
import Pupm3 from '../images/pums/solar-pump.jpeg'
import Pupm4 from '../images/pums/HorizontalPump.jpeg'
import Pupm5 from '../images/pums/UPVC.jpeg'
import Pupm6 from '../images/pums/cable.jpeg'
import banner from '../images/pums/bgtest.jpg'
import bgImage from '../images/water.gif'
import Image from "next/image";

const PROJECTS = [
  {
    img: Pupm1,
    title: "Submersible Motors",
    type: "submersible_motor",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: Pupm2,
    title: "Submersible Pump",
    type: "submersible_pump",
    desc: "Promotional landing page for a  fitness website Summer Campaign. Form development included.",
  },
  {
    img: Pupm3,
    title: "Solar Motor",
    type: "solar_motor",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: Pupm4,
    title: "Horizonatal Openwell Pumps",
    type: "horizonatal_openwell_pumps",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: Pupm5,
    title: "Upvc Pumps",
    type: "upvc_pumps",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },
  {
    img: Pupm6,
    title: "Cable",
    type: "cable",
    desc: "Mobile app designed to help users discover and explore local restaurants and cuisines.",
  },

];

export function Projects() {
  return (
    <>
      <section className="py-28 px-8 " style={{ backgroundImage: "url('/images/water.gif')" }}>
        <div className="container mx-auto py-20 text-center   border-t border-solid border-gray-700 border-opacity-35">
          <div className="mb-8 animate-pulse lg:text-8xl text-5xl  font-sans font-semibold" style={{ color: '#07aadb' }}>
            Product Range
          </div>
          <Typography
            variant="lead"
            className="mx-auto w-full px-4 font-normal !text-gray-500 lg:w-6/12"
          >
            Whether you have a mobile app idea that needs to come to life or a
            website that requires a facelift, I&apos;m here to turn your digital
            dreams into reality.
          </Typography>
        </div>
        <div className="container mx-auto grid grid-cols-1 w-full max-w-7xl gap-x-10 gap-y-20 md:grid-cols-2 xl:grid-cols-3">
          {PROJECTS.map((props, idx) => (
            <div key={idx} className="border-2 border-solid border-blue-400 hover:scale-105 duration-300 hover:shadow-lg p-8 rounded-lg shadow-xl ">
              <ProjectCard key={idx} {...props} />
            </div>
          ))}
        </div>
      </section>
      <div className=" w-full">
        <Image src={banner} className="h-full w-full" />
      </div>
    </>
  );
}

export default Projects;
