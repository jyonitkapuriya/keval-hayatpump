import React from 'react';
import { Typography } from '@material-tailwind/react';
import Owner from "@/images/owner.jpg"
import Image from 'next/image';
import { useFirebase } from '@/firebase/firebase';

const AboutPage = () => {

    return (
        <div className="container mx-auto py-8 w-full h-[calc(100vh-20px)] max-w-7xl p-8 pt-20">
            <Typography variant="body" color="blue-gray" className="text-4xl font-bold mb-6">
                About Us
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="md:col-span-1">
                    <Typography variant="body" className="text-lg text-gray-700">
                        <Image
                            width={400}
                            height={400}
                            alt="team work"
                            src={Owner}
                            className=" mx-auto rounded-xl w-full object-cover"
                        />
                    </Typography>
                </div>
                <div className="md:col-span-1">
                    <Typography
                        variant="body"
                        color="blue-gray"
                        className="mb-4 font-semibold lg:text-5xl text-3xl text-gray-800"
                    >
                        Setting a tradition of excellence since 1981.
                    </Typography>
                    <Typography variant="body" className="text-lg text-gray-700">
                        Hayat Pumps & Motors has established itself as a distinguished manufacturer of <span className="font-bold text-gray-900">Premium quality, efficient, reliable, and long-lasting pumps and motors</span> for more than <span className="font-bold text-gray-900">40 years</span>. Our factory is equipped with state-of-the-art technology and skilled workforce, allowing us to produce pumps and motors that meet the highest standards of quality and performance. We are committed to innovation and continuous improvement, ensuring that our products remain at the forefront of the industry.
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
