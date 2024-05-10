"use client";

import Image from "next/image";
import { Typography } from "@material-tailwind/react";
import { Expertise } from './ExpertisedData/Expertise'
// const CLIENTS = [
//   "coinbase",
//   "spotify",
//   "pinterest",
//   "google",
//   "amazon",
//   "netflix",
// ];

export function Clients() {
  return (
    <div className="px-8 ">
      <div className="container mx-auto py-20 text-center border-t border-solid border-gray-700 border-opacity-35">
        <div className="mb-4 animate-pulse lg:text-8xl text-5xl  font-sans font-semibold" style={{ color: '#07aadb' }}>
          Expertise
        </div>
        <p
          className="mb-6 text-gray-600 text-lg md:pr-16 mt-10  xl:pr-28"
        >
          We are into the manufacturing of all types of water pumps and consumer electrical products.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-20 mt-10 gap-y-10">
          {Expertise.map((item, key) => (
            <div className="flex flex-col gap-4 items-center justify-center " key={key}>
              <Image
                key={key}
                alt={item.name}
                width={768}
                height={768}
                className="w-28 h-28 rounded-full object-cover border-4 p-2 shadow-2xl  borders-solid border-blue-500 bg-white"
                src={item.icon}
              />
              <div className=" antialiased tracking-normal font-sans  font-semibold leading-snug text-gray-900 mb-2 mt-3 w-[120px] flex justify-center flex-wrap ">
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Clients;
