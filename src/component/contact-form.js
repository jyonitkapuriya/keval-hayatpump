"use client";

import {
  Typography,
  Card,
  CardBody,
  Radio,
  Input,
  Textarea,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { EnvelopeIcon, PhoneIcon, TicketIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Novu } from '@novu/node';
import { toast } from "react-toastify";

export function ContactForm() {
  const [formData, setFormData] = useState({})
  const novu = new Novu('1fc5f14ed8b3a4c442eded5cea80e0d1');

  const formChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      await novu.trigger('onboarding-workflow', {
        to: {
          subscriberId: '66306f2283064b959c5854b2',
          email: 'kapuriyajyonit755@gmail.com'
        },
        // payload: {
        //   fName: formData.fName,
        //   lName: formData.lName,
        //   email: formData.email,
        //   number: formData.number,
        //   message: formData.message,
        // }
      });
      toast.success("Mail send successfully!");
    }
    catch (err) {
      console.log("err", err)
    }

  }
  return (
    <section className="py-20 max-w-7xl mx-auto md:px-8 sm:px-6 px-4">
      <div className="container mx-auto py-20 text-center  border-t border-solid border-gray-700 border-opacity-35">
        <div className="mb-8 animate-pulse lg:text-8xl text-5xl  font-sans font-semibold" style={{ color: '#07aadb' }}>
          Contact Us
        </div>

        <Typography
          variant="lead"
          className="mx-auto w-full lg:w-5/12 !text-gray-500"
        >
          Ready to get started? Feel free to reach out through the contact form,
          and let&apos;s embark on a journey of innovation and success.
        </Typography>
      </div>
      <div>
        <Card shadow={true} className="container mx-auto border border-gray/50" style={{ position: 'initial' }}>
          <CardBody className="grid grid-cols-1 lg:grid-cols-7 lg:gap-10 ">
            {/* <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 " style={{ background: 'linear - gradient(90deg, rgba(2, 0, 36, 1) 0 %, rgba(0, 255, 243, 1) 0 %, rgba(9, 98, 121, 1) 98 %)' }}> */}
            <div className="w-full col-span-3 rounded-lg h-full py-8 p-5 md:p-16 shadow-lg" style={{ background: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(0, 255, 243, 1) 0%, rgba(9, 98, 121, 1) 98%)' }}>
              <Typography variant="h4" color="white" className="mb-2">
                Contact Information
              </Typography>

              <Typography variant="h5" className="mb-2 text-white">
                FACTORY ADDRESS
              </Typography>

              <Typography
                variant="lead"
                className="mx-auto mb-8 text-base !text-white"
              >
                SILVER CONSUMER ELECTRICALS PRIVATE LIMITED
                Survey No. 36-47, Village Haripar (Taravada),
                Taluka : Lodhika, District : Rajkot,
                Pin - 360035, Gujarat, India
              </Typography>
              <div className="flex gap-5">
                <PhoneIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  +91 94262 80036
                </Typography>
              </div>
              <div className="flex my-2 gap-5">
                <EnvelopeIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  info@hayatpump.com
                </Typography>
              </div>
              {/* <div className="flex mb-10 gap-5">
                <TicketIcon className="h-6 w-6 text-white" />
                <Typography variant="h6" color="white" className="mb-2">
                  Open Support Ticket
                </Typography>
              </div> */}
              <div className="flex items-center gap-5">
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-facebook text-lg" />
                </IconButton>
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-instagram text-lg" />
                </IconButton>
                <IconButton variant="text" color="white">
                  <i className="fa-brands fa-github text-lg" />
                </IconButton>
              </div>
            </div>
            <div className="w-full mt-8  md:px-10 col-span-4 h-full p-5 lg:pt-0 pt-5">
              <form action="#" onSubmit={submit}>
                <div className="mb-8 grid gap-4 lg:grid-cols-2">
                  {/* @ts-ignore */}
                  <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="w-full md:w-1/2 mb-3 md:mb-0">
                      <label htmlFor="first-name" className="text-gray-600 font-medium">First Name</label>
                      <input
                        id="first-name"
                        type="text"
                        name="fName"
                        value={formData?.fName}
                        placeholder="eg. Lucas"
                        onChange={formChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label htmlFor="last-name" className="text-gray-600 font-medium">Last Name</label>
                      <input
                        id="last-name"
                        type="text"
                        name="lName"
                        value={formData?.lastName}
                        placeholder="eg. Jones"
                        onChange={formChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                      />
                    </div>
                  </div>
                  <div className="w-full mb-8">
                    <label htmlFor="email" className="text-gray-600 font-medium">Email</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData?.email}
                      onChange={formChange}
                      placeholder="eg. lucas@mail.com"
                      className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="w-full mb-8">
                    <label htmlFor="phone" className="text-gray-600 font-medium">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="eg. +9112345678"
                      onChange={formChange}
                      name="number"
                      value={formData?.number}
                      className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="w-full mb-8">
                    <label htmlFor="message" className="text-gray-600 font-medium">Your Message</label>
                    <textarea
                      id="message"
                      placeholder="Enter your message..."
                      name="message"
                      onChange={formChange}
                      value={formData?.message}
                      className="border border-gray-300 rounded-lg px-3 py-2 mt-1 w-full h-32 resize-none focus:outline-none focus:ring focus:border-blue-300"
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <button className=" text-white font-bold py-2 px-4 rounded-full duration-300" style={{ background: 'linear-gradient(90deg, rgba(255,0,254,1) 0%, rgba(0,16,36,1) 0%, rgba(9,30,121,1) 100%)' }}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default ContactForm;
