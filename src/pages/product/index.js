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

    if (!isLoaded) {
        return (
            <div className="h-screen expert overflow-scroll no-scrollbar ">
                <Navbar />
                <div className="pt-24 px-8 lg:max-w-7xl mx-auto w-fit sm:px-8 grid grid-cols-4 gap-8">
                    {product.map((item, index) => {
                        return (
                            <div key={index} className="border-2 cardBox border-solid lg:col-span-1 md:col-span-2 col-span-4 border-blue-400 p-8 rounded-lg shadow-xl">
                                <div className="card">
                                    <Card color="transparent" shadow={false} style={{ position: 'initial' }}>
                                        <div className="mx-auto mt-0 ">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                width={768}
                                                height={768}
                                                className="w-32 h-32 lg:w-40 lg:h-40"
                                            />
                                        </div>
                                        <CardBody className="p-0 flex flex-col items-center justify-center">
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