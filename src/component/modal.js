import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ChevronDown, X } from 'lucide-react'

export default function Modal({ open, setOpen, products }) {
    const cancelButtonRef = useRef(null)
    const [openProduct, setOpenProduct] = useState(false)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                    <div className="fixed inset-0  transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex  items-end justify-center  text-center w-[calc(100%-17px)] sm:items-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  w-full ">
                                <X className='text-black absolute ml-auto right-4 top-4' onClick={() => setOpen(false)} />
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div id="collapseMenu" className="lg:!flex lg:items-center w-full  max-lg:py-4">
                                        <ul className='lg:space-x-8 max-lg:space-y-2'>
                                            <li className='max-lg:border-b max-lg:py-2'>
                                                <Link href={'/'}
                                                    className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                                                    Home
                                                </Link>
                                            </li>
                                            <li className='max-lg:border-b flex justify-between max-lg:py-2'>
                                                <div className="flex justify-between w-full cursor-pointer" onClick={() => setOpenProduct(!openProduct)}>
                                                    <div
                                                        className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]' >
                                                        Products
                                                    </div>
                                                    <span className={`${openProduct ? "rotate-180" : "rotate-0"} duration-300`} >
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

                                                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                            <div className="flex  items-end justify-center  text-center w-[calc(100%-17px)] sm:items-center ">
                                                                <Transition.Child
                                                                    as={Fragment}
                                                                    enter="ease-out duration-300"
                                                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                                    leave="ease-in duration-200"
                                                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                                >
                                                                    <Dialog.Panel className="relative transform overflow-hidden mt-[127px] rounded-lg bg-white text-left shadow-xl transition-all  w-full ">
                                                                        {/* <X className='text-black absolute ml-auto right-4 top-4' onClick={() => setOpenProduct(false)} /> */}
                                                                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                            <ul className='lg:space-x-8 max-lg:space-y-2'>
                                                                                {products.map((item) =>
                                                                                    <li className='max-lg:border-b max-lg:py-2'>
                                                                                        <Link href={`/product/details?id=${item.id}`}
                                                                                            className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
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
                                                <Link href={'/'}
                                                    className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                                                    Certification
                                                </Link>
                                            </li>
                                        </ul>
                                        {/* <Image src={Logo} className='m-auto object-cover absolute lg:left-2/4 lg:-translate-x-1/2 max-lg:hidden w-28' /> */}
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
                                                <Link href='/'
                                                    className='hover:text-[#007bff] font-semibold text-[#333] block text-[15px]'>
                                                    Gallery
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}