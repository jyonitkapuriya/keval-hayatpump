import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useRouter } from "next/router";


export function ProjectCard({ img, title, desc, type }) {
  console.log("key", type)
  const router = useRouter()
  return (
    <div className="">
      <Card color="transparent" shadow={false} style={{ position: 'initial' }}>
        <div className="mx-auto mt-0 ">
          <Image
            src={img}
            alt={title}
            width={768}
            height={768}
            className="w-auto md:h-40 sm:h-36 h-32 lg:w-auto lg:h-44"
          />
        </div>
        <CardBody className="p-0 flex flex-col items-center justify-center mt-3">
          <a
            href="#"
            className="text-blue-gray-900 transition-colors hover:text-gray-800"
          >
            <Typography variant="h5" className="mb-2">
              {title}
            </Typography>
          </a>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-300 " onClick={() => { router.push(`/product?type=${type}`) }} >
            View
          </button>
        </CardBody>
      </Card>
    </div>
  );
}

export default ProjectCard;
