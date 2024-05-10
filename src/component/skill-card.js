import { Card, CardBody, Typography } from "@material-tailwind/react";
import Image from "next/image";

export function SkillCard({ icon: Icon, title, children }) {
  return (
    <Card color="transparent" shadow={false} style={{ position: 'initial' }} >
      <CardBody className="grid justify-center text-center">
        <div className="mx-auto mb-6 grid h-12 w-12 place-items-center rounded-full text-white animate-bounce shadow-xl">
          <Image src={Icon} className="w-10 h-10 rounded-full object-cover " width={100} height={100} alt="icon" />
        </div>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="px-8 font-normal text-gray-500">
          {children.map((item, index) => (
            <li key={index} className="text-blue-300">
              <span className="font-normal text-gray-500">{item}</span>
            </li>
          ))}
        </Typography>
      </CardBody>
    </Card>
  );
}

export default SkillCard;
