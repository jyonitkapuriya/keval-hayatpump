import Navbar from "@/component/navbar"
import { getFirebaseProduct } from "@/firebase/config"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image";
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import ContactForm from "@/component/contact-form";
import TimeLoader from "@/component/loader";
import Footer from "@/component/footer";

const Product = () => {
    const [product, setProduct] = useState([])
    const [isLoaded, setIsLoaded] = useState(true)
    const router = useRouter()
    const { type } = router.query
    const getProduct = async () => {
        const doc = await getFirebaseProduct(type)
        console.log("doc---->", doc)
        setIsLoaded(false)
        setProduct(doc)
    }
    useEffect(() => {
        if (type) {
            getProduct()
        }
    }, [type])

    const convertName = (str) => {
        return str.replace(/\b\w/g, function (char) {
            return char.toUpperCase();
        });
    }
    if (!isLoaded) {
        return (
            <>
                <div className="  expert overflow-scroll no-scrollbar">
                    <div className="h-screen relative  overflow-scroll no-scrollbar ">
                        <Navbar />
                        <div className="pt-32 px-8 flex justify-center mb-8 animate-pulse lg:text-8xl text-5xl  font-sans font-semibold" style={{ color: '#07aadb' }}>
                            {convertName(type.replace(/_/g, ' '))}
                        </div>
                        {/* <div className="flex flex-wrap justify-center text-gray-400 font-normal text-sm">
                            <span onClick={() => router.push("/")} className="mr-3">Product</span> / <span className="ml-3">{convertName(type.replace(/_/g, ''))}</span>
                        </div> */}
                        <div className="  mt-16 lg:max-w-7xl mx-auto w-fit sm:px-8 grid grid-cols-6 gap-8">
                            {product.map((item, index) => {
                                return (
                                    <div key={index} className="border-2  border-solid lg:col-span-2 md:col-span-3 col-span-6 border-blue-400 p-8 rounded-lg shadow-xl">
                                        <div className="">
                                            <Card color="transparent" shadow={false} style={{ position: 'initial' }}>
                                                <div className="mx-auto mt-0 ">
                                                    <Image
                                                        src={item.imageUrl}
                                                        alt={item.name}
                                                        width={768}
                                                        height={768}
                                                        className="w-auto h-auto max-w-44 max-h-44 "
                                                    />
                                                </div>
                                                <CardBody className="p-0 flex flex-col items-center mt-3 justify-center">
                                                    <a
                                                        href="#"
                                                        className="text-blue-gray-900 transition-colors hover:text-gray-800"
                                                    >
                                                        <Typography variant="h5" className="mb-2">
                                                            {item.name}
                                                        </Typography>
                                                    </a>

                                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-300 " onClick={() => { router.push(`/product/details?id=${item?.id}`) }} >
                                                        View
                                                    </button>
                                                </CardBody>
                                            </Card>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <ContactForm />
                    </div>
                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <div className="w-full h-screen bg-white flex items-center justify-center">
                <TimeLoader />
            </div>
        )
    }
}

export default Product