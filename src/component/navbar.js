"use client"
import Logo from '../images/logo.png'
import {
  RectangleStackIcon,
  UserCircleIcon,
  CommandLineIcon,
  Squares2X2Icon,
  XMarkIcon,
  Bars3Icon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
// import { getPums } from "@/firebase/config";
import { ChevronDown } from "lucide-react";
// import { useFirebase } from "@/firebase/firebase";
import { Fragment, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Modal from './modal';
import { getPums } from '@/firebase/config';
import { useFirebase } from '@/firebase/firebase';
import { Dialog, Transition } from '@headlessui/react'


const NAV_MENU = [
  {
    name: "Home",
    icon: RectangleStackIcon,
    href: "/",
  },
  {
    name: "Products",
    icon: UserCircleIcon,
  },
  {
    name: "Certification",
    icon: UserCircleIcon,
    href: "/",

  },
  {
    name: "Gallery",
    icon: CommandLineIcon,
    href: "/",
  },
  {
    name: "Contact",
    icon: CommandLineIcon,
    href: "/contect",
  },
  {
    name: "About",
    icon: CommandLineIcon,
    href: "/",
  },
];


export function Navbar() {
  const [open, setOpen] = useState(false);
  const [openProduct, setOpenProduct] = useState(false)
  const cancelButtonRef = useRef(null)
  const [products, setProducts] = useState([])
  const { admin, loading } = useFirebase()
  const router = useRouter()
  const handleOpen = () => setOpen((cur) => !cur);

  // useEffect(() => {
  //   window.addEventListener(
  //     "resize",
  //     () => window.innerWidth >= 960 && setOpen(false)
  //   );
  // }, []);

  const getProduct = async () => {
    const res = await getPums()
    setProducts(res)
  }

  useEffect(() => {
    getProduct()
  }, [admin, loading])



  return (
    <header className='border-b fixed w-full font-[sans-serif] z-10  backdrop-blur-lg  bg-white bg-opacity-50 top-0'>
      <div className={`  items-center px-10 py-4 relative  min-h-[60px] ${open ? "hidden" : "flex flex-wrap"}`}>
        <Link href='/' className='hidden max-lg:block'><Image src={Logo}
          alt="logo" className='w-28' /></Link>
        <div className='flex ml-auto lg:order-1 lg:hidden'>
          <button id="toggle" className='ml-7' onClick={() => handleOpen()}>
            <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <div id="collapseMenu" className="lg:!flex lg:items-center w-full max-lg:hidden max-lg:py-4">
          <ul className='lg:flex lg:space-x-8 max-lg:space-y-2'>
            <li className='max-lg:border-b max-lg:py-2'>
              <Link href={'/'}
                className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                Home
              </Link>
            </li>
            <li className='max-lg:border-b max-lg:py-2'>
              <div
                className='hover:text-[#007bff] flex gap-3 font-semibold text-[#333]  text-[15px]'
                onClick={() => setOpenProduct(!openProduct)}
              >
                Products
                <span className={`${openProduct ? "rotate-180" : "rotate-0"} duration-300`} onClick={() => setOpenProduct(!openProduct)}>
                  <ChevronDown className='text-gray-800 cursor-pointer' />
                </span>
              </div>
              <Transition.Root show={openProduct} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenProduct}>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <div className="absolute " />
                  </Transition.Child>

                  <div className="fixed inset-0 z-10 overflow-y-auto    ">
                    <div className="flex  items-end justify-center  text-center w-fit ml-[calc(13%-105px)]  sm:items-center ">
                      <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      >
                        <Dialog.Panel className="relative transform overflow-hidden mt-[40px] rounded-lg bg-white text-left shadow-xl transition-all  w-full ">
                          {/* <X className='text-black absolute ml-auto right-4 top-4' onClick={() => setOpenProduct(false)} /> */}
                          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <ul className='space-y-4'>
                              {products.map((item) =>
                                <li className='text-start'>
                                  <Link href={`/product/details?id=${item.id}`}
                                    onClick={() => setOpenProduct(!openProduct)}
                                    className='hover:text-[#007bff] font-semibold  whitespace-nowrap  text-[#333] block text-[15px]'>
                                    {item.name}
                                  </Link>
                                </li>)}
                            </ul>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
            </li>
            <li className='max-lg:border-b max-lg:py-2'>
              <Link href={'/certification'}
                className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                Certification
              </Link>
            </li>
          </ul>
          <Link href="/" className='mb-10'>
            <Image src={Logo} className='m-auto object-cover absolute lg:left-2/4 lg:-translate-x-1/2 max-lg:hidden w-28' />
          </Link>
          <ul className='lg:flex lg:space-x-8 max-lg:space-y-2 ml-auto'>
            <li className='max-lg:border-b max-lg:py-2'>
              <Link href='/about'
                className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                About
              </Link>
            </li>
            <li className='max-lg:border-b max-lg:py-2'>
              <Link href='/contect'
                className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                Contact
              </Link>
            </li>
            <li className='max-lg:border-b max-lg:py-2'>
              <Link href='/gallery'
                className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                Gallery
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} products={products} setOpenProduct={setOpenProduct} />
    </header>
  );
}

export default Navbar;
