"use client";

import { Typography } from "@material-tailwind/react";
import {
  RectangleGroupIcon,
  FingerPrintIcon,
  SwatchIcon,
  HashtagIcon,
  EyeIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/solid";
import { SkillCard } from "./skill-card";
import why1 from '../images/why/why1.png'
import why2 from '../images/why/why2.jpg'
import why3 from '../images/why/why3.jpg'
import why4 from '../images/why/why4.jpg'
import why5 from '../images/why/why5.jpg'
import why6 from '../images/why/why6.webp'

const SKILLS = [
  {
    icon: why1,
    title: "EXCELLENT QUALITY",
    children: ["Strong Feedback Mechanism", "Modern Testing Infrastructure", "Best R & D Setup"]
  },
  {
    icon: why2,
    title: "WIDEST RANGE",
    children: ["2200+ models of pumps", "ever-expanding product range", "pump for agriculture, domestic and industrial use"]
  },
  {
    icon: why3,
    title: "INFRASTRUCTURE",
    children:
      ["10,00,000 units per year - production capacity", "ultra-modern production set up", "automatic winding machines"],

  },
  {
    icon: why4,
    title: " INNOVATIVE PRODUCTS",
    children:
      ["Working on Next Generation Pumps", "Use of Advance Simulation Software", "Culture of Innovation"],

  },
  {
    icon: why5,
    title: "BEST SERVICE",
    children: ["24X7 Customer Care", "Integrated Service Centres", "Pan India Dealer Network"],

  },
  {
    icon: why6,
    title: "STRICT QUALITY CONTROL AND QUALITY ASSURANCE",
    children: ["100 % of products are tested as per international standard", "100 % inhouse production", "100 % of raw materials pass through quality control"],

  },

];

export function Skills() {
  return (
    <section className="px-8">
      <div className="container mx-auto py-20 text-center  border-t border-solid border-gray-700 border-opacity-35">
        {/* <Typography color="blue-gray" className="mb-2 font-bold uppercase">
          my skills
        </Typography> */}
        <Typography variant="h1" color="blue-gray" className="mb-4 animate-pulse font-semibold" style={{ color: '#07aadb' }}>
          Why Hayat Pumps
        </Typography>
        {/* <Typography
          variant="lead"
          className="mx-auto w-full !text-gray-500 lg:w-10/12"
        >
          I&apos;m not just a developer; I&apos;m a digital dreamweaver.
          Crafting immersive online experiences is not just a job but my
          calling. Discover below how I can help you.
        </Typography> */}
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((props, idx) => (
          <SkillCard key={idx} {...props} />
        ))}
      </div>
    </section>
  );
}

export default Skills;
