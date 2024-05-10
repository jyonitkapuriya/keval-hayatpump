import ContactForm from "@/component/contact-form"
import Footer from "@/component/footer"
import Navbar from "@/component/navbar"
import { getCardDataFromDB, getPump } from "@/firebase/config"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Image from "next/image";
import { Card, CardBody, Typography } from "@material-tailwind/react"
import TimeLoader from "@/component/loader"

const feature = [{ title: "Silent Features", key: "silent_features" }, { title: "Application", key: "application" }, { title: "Materials of construction", key: "materials_of_construction" }, { title: "Technical Specifications", key: "technical_specifications" }]

const PumpDetails = () => {
    const [pumpData, setPumpData] = useState({})
    const [cardData, setCardData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [selectedFeature, setSelectedFeature] = useState("silent_features")

    const router = useRouter()
    const { id } = router.query

    const getPumpDetails = async () => {
        const pumpDetails = await getPump(id)
        console.log("this is pump data", pumpDetails)
        setPumpData(pumpDetails)
    }
    useEffect(() => {
        if (id) {
            getPumpDetails()
            getCard()
        }

    }, [id])

    const getCard = async () => {
        const getCard = await getCardDataFromDB(id)
        console.log("get card", getCard)
        setCardData(getCard)
        setIsLoaded(true)
    }
    if (!isLoaded) {
        return (
            <div className="flex h-screen items-center justify-center">
                <TimeLoader />
            </div>
        )
    } else {
        return (
            <div className="expert overflow-scroll no-scrollbar h-screen w-full lg:px-0 ">
                <div className="relative">
                    <Navbar />
                    <div className="grid grid-cols-2 gap-5 max-w-7xl  px-8 mx-auto mt-40 mb-20">
                        {pumpData?.productImageURL && <div className="col-span-2 md:col-span-1 rounded-lg shadow-md"><Image src={pumpData?.productImageURL} width={200} height={200} className="w-full  max-h-[500px] h-full" /></div>}
                        {/* {pumpData?.specificationImgURL && <Image src={pumpData?.specificationImgURL} width={200} height={200} className="w-full max-h-[500px] h-full" />} */}
                        <div className="p-4 rounded-lg border border-opacity-50 border-solid border-blue-500 bg-blue-50 shadow-md col-span-2 md:col-span-1">
                            <div className="flex gap-x-1 text-xs flex-wrap text-gray-700 font-sans font-medium ">{feature.map((item) => {
                                return (
                                    <div className={`cursor-pointer hover:text-white hover:bg-blue-400 p-1 rounded-md duration-300 ${selectedFeature === item.key ? "bg-blue-400 text-white" : ""}`}
                                        onClick={() => setSelectedFeature(item.key)} >
                                        {item.title}
                                    </div>
                                )
                            })}</div>
                            <div dangerouslySetInnerHTML={{ __html: pumpData.feature[selectedFeature] }} className="mt-1  border-t border-solid border-gray-500 border-opacity-50 pt-2 md:text-xs text-sm text-gray-500 font-sans font-normal" >
                                {/* {pumpData.feature[selectedFeature]} */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="pt-8 gap-5 flex flex-col bg-white justify-center items-center">
                    {pumpData?.images?.map((url) => {
                        return (
                            <div className="lg:max-w-7xl p-8">
                                <Image src={url} width={200} height={200} className="w-full h-full" />
                            </div>
                        )
                    })}
                </div> */}
                    <div className="grid grid-cols-4 gap-3 px-8 mt-5 max-w-7xl   mx-auto ">
                        {cardData?.map((item, index) => {
                            if (item?.image) {
                                return (
                                    <div key={index} className="border-2 border-solid bg-white lg:col-span-1 md:col-span-2 col-span-4 border-blue-400 p-8 rounded-lg shadow-xl">
                                        <Card color="transparent" shadow={false} style={{ position: 'initial' }}>
                                            <div className="mx-auto mt-0 ">
                                                <Image
                                                    src={item?.image}
                                                    alt={item?.title ? item?.title : "pump image"}
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
                                                        {item?.title}
                                                    </Typography>
                                                </a>

                                                <div className="font-normal text-sm py-2 px-4 rounded-full duration-300 " onClick={() => { router.push(`/product/details?id=${item?.id}`) }} >
                                                    {item?.description}
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </div>
                                )
                            }
                            else {
                                return ""
                            }

                        })}
                    </div>

                    <ContactForm />
                    <Footer />
                </div>
            </div>
        )
    }

}
export default PumpDetails