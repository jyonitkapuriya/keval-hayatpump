import Navbar from "@/component/navbar"
import { addProductSpecification, deleteCard, getCardDataFromDB, getPump, saveCard, updateCard, uploadPumpImage } from "@/firebase/config"
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Delete, Trash } from "lucide-react"
import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import RootLayout from "../../layout"
import Image from "next/image";
import { toast } from "react-toastify";
import { Typography } from "@material-tailwind/react";
import TimeLoader from "@/component/loader";
import TextEditor from "@/component/quill";

const TABLE_HEAD = ["Name", "Title", "Action"]
const feature = [{ title: "Silent Features", key: "silent_features" }, { title: "Application", key: "application" }, { title: "Materials of construction", key: "materials_of_construction" }, { title: "Technical Specifications", key: "technical_specifications" }]


const AddDetails = () => {
    const [allDetails, setAllDetails] = useState([""])
    const [pumpData, setPumpData] = useState({})
    const [productImg, setProductImg] = useState("")
    const [specificationImg, setSpecificationImg] = useState({})
    const [cardData, setCardData] = useState({})
    const [cardImage, setCardImage] = useState("")
    const [cardsData, setCardsData] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [Features, setFeatures] = useState({ silent_features: "", application: "", materials_of_construction: "", technical_specifications: "" })

    const ref = useRef();
    const router = useRouter()
    const { id } = router.query

    const mainId = id
    const imageChange = (e, index) => {
        const data = [...allDetails]
        data[index] = { ...data[index], image: e.target.files[0] }
        setAllDetails(data)
    }

    const productImageChnage = (e) => {
        const file = e.target.files[0]
        setProductImg(file)
    }

    const specificationImgChnage = (e) => {
        const file = e.target.files[0]
        setSpecificationImg(file)
    }

    const getPumpDetails = async () => {
        const pumpDetails = await getPump(id)
        setPumpData(pumpDetails)
        if (pumpDetails.images) {
            setAllDetails(pumpDetails.images)
            setProductImg(pumpDetails.productImageURL)
            console.log("pumpDetails--->", pumpDetails)
            setSpecificationImg(pumpDetails.specificationImgURL)
        }
        if (pumpDetails.feature) { setFeatures(pumpDetails.feature) }
    }

    useEffect(() => {
        if (!id) return
        getPumpDetails()
        getCardData()
    }, [id])

    console.log("specificationImg", specificationImg)

    const addSpecification = async () => {
        // const urls = await Promise.all(allDetails.map(async (item, index) => {
        //     if (item.image) {
        //         const uploadImage = await uploadPumpImage(item.image, item.image?.name);
        //         return uploadImage;
        //     } else if (item) {
        //         return item
        //     } else {
        //         return ""
        //     }
        // }));
        // if (urls.length) {
        //     await addProductSpecification(id, { images: urls })
        // }
        if (productImg !== "" && productImg?.name) {
            let productImgURL = await uploadPumpImage(productImg, productImg?.name)
            await addProductSpecification(id, { productImageURL: productImgURL })
        }
        // if (specificationImg !== "" && specificationImg?.name) {
        //     let specificationImgURL = await uploadPumpImage(specificationImg)
        //     await addProductSpecification(id, { specificationImgURL: specificationImgURL ? specificationImgURL : specificationImg })
        // }
        if (productImg === "") {
            await addProductSpecification(id, { productImageURL: "" })
        }
        // if (specificationImg === "") {
        //     await addProductSpecification(id, { specificationImgURL: "" })
        // }
        console.log("Features", Features)
        await addProductSpecification(id, { feature: Features })
        getPumpDetails()
        toast.success("Product updated successfully")

    }

    const cardInputChange = (e) => {
        console.log(e)
        const { name, value } = e.target
        setCardData({ ...cardData, [name]: value })
    }

    const saveCardData = async () => {
        try {
            if (!isEdit) {
                const imageUrl = await uploadPumpImage(cardImage, cardImage?.name)
                await saveCard(id, { ...cardData, image: imageUrl })
                setCardData({})
                setCardImage("")
                toast.success("card saved successfully")
            } else {
                if (cardImage.name) {
                    const imageUrl = await uploadPumpImage(cardImage, cardImage?.name)
                    await updateCard(id, editId, { ...cardData, image: imageUrl })
                } else {
                    await updateCard(id, editId, { ...cardData })
                }
                setCardData({})
                setCardImage("")
                setEditId("")
                setIsEdit(false)
                console.log("card saved successfully")
            }
            getCardData()
            toast.success("card saved successfully")
        } catch (err) {
            console.log("error------>", err)
            toast.success(err.message)
        }
    }
    const changeFeatueres = (event, name) => {
        console.log("changeFeatueres", event, name)
        setFeatures({ ...Features, [name]: event })
    }
    const getCardData = async () => {
        const getCard = await getCardDataFromDB(id)
        console.log("getCard------------->", getCard)
        setCardsData(getCard)
        setIsLoading(false)
        // setCardImage(getCard?.image)
    }
    console.log(cardImage)
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <TimeLoader />
            </div>
        )
    }
    else {
        return (
            <RootLayout >
                <div className="h-screen w-full bg-white overflow-scroll no-scrollbar">
                    <Navbar />
                    <div className="pt-20 px-8 bg-white">
                        <div onClick={() => router.push('/admin/addpump')} className="mb-20 text-lg">
                            {'<'} Back
                        </div>
                        <div className="flex">
                            <div className="w-1/2">Product Image</div>
                            <Delete className="ml-5 text-white" />
                        </div>
                        {/* {allDetails?.map((item, index) => <div className="flex mt-3">
                            <div className="w-full flex gap-4 ">
                                <input className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={item?.key}
                                    onChange={(e) => handleChange(e, index, "key")}
                                />
                                <input className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    value={item?.value}
                                    onChange={(e) => handleChange(e, index, "value")}
                                />
    
                            </div>
                            <Delete className="ml-5 mt-2" onClick={() => {
                                const data = [...allDetails]
                                data.splice(index, 1)
                                setAllDetails(data)
                            }} />
                        </div>)} */}
                        {productImg === "" ? <div className="text-center w-full">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={ref} onChange={(e) => productImageChnage(e)} />
                                </label>
                                <p className="pl-1 text-sm">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div> :
                            <div className="">
                                <Image src={!productImg?.name ? productImg : URL.createObjectURL(productImg)} alt="Selected Image" width={200} height={200} className='h-40 w-40' />
                                <Trash onClick={() => setProductImg("")} />
                            </div>
                        }
                        <div className="flex">
                            <div className="w-1/2">Specification Image</div>
                            <Delete className="ml-5 text-white" />
                        </div>
                        {feature.map((item, index) => {
                            return (
                                <>
                                    <div className="flex my-4">
                                        <div className="w-1/2">{item.title}</div>
                                        {/* <Delete className="ml-5 text-white" /> */}
                                    </div>
                                    {/* {specificationImg === "" ? <div className="text-center w-full">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={ref} onChange={(e) => specificationImgChnage(e)} />
                                </label>
                                <p className="pl-1 text-sm">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div> : <div className="">
                            <Image src={!specificationImg?.name ? specificationImg : URL.createObjectURL(specificationImg)} alt="Selected Image" width={200} height={200} className='h-40 w-40' />
                            <Trash onClick={() => setSpecificationImg("")} />
                        </div>} */}
                                    <TextEditor onChange={changeFeatueres} value={Features[item.key]} name={item.key} />
                                </>
                            )
                        })}
                        {/* {allDetails?.map((item, index) => <div className="flex mt-3">
                            {item === "" ? (
                                <div className="text-center w-full">
                                    <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={ref} onChange={(e) => imageChange(e, index)} />
                                        </label>
                                        <p className="pl-1 text-sm">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            ) : (
                                <Image src={!item?.image ? item : URL.createObjectURL(item?.image)} alt="Selected Image" width={200} height={200} className='h-40 w-40' />
                            )}
                            <Delete className="ml-5 ml-auto mt-2" onClick={() => {
                                const data = [...allDetails]
                                data.splice(index, 1)
                                setAllDetails(data)
                            }} />
                        </div>)} */}

                        {/* <button className="bg-black p-4 rounded-md text-white mt-10 " onClick={() => {
                            const data = [...allDetails]
                            data.push("")
                            setAllDetails(data)
                        }}>Add more Image</button> */}
                        <button className="bg-black p-4 rounded-md text-white mt-10 ml-4" onClick={() => addSpecification()}>Save</button>
                    </div>
                    <div className="mb-20 px-8">
                        {!cardImage ? <div className="text-center w-full">
                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={ref} onChange={(e) => setCardImage(e.target.files[0])} />
                                </label>
                                <p className="pl-1 text-sm">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                        </div> :
                            <div className="flex justify-between">
                                <Image src={!cardImage?.name ? cardImage : URL.createObjectURL(cardImage)} alt="Selected Image" width={200} height={200} className='h-40 w-40' />
                                <Trash className="text-gray-800 cursor-pointer" onClick={() => setCardImage("")} />
                            </div>
                        }

                        <div className="flex flex-col gap-3">
                            <input name="title" type="text" onChange={cardInputChange} value={cardData?.title} className="border w-full h-12 p-4 border-solid border-gray-600 rounded-lg" placeholder="Enter title text" />
                            <textarea name="description" type="text" onChange={cardInputChange} value={cardData?.description} className="border p-4 w-full border-solid border-gray-600 rounded-lg" placeholder="Enter description" />
                        </div>
                        <button className="bg-black p-4 rounded-md text-white mt-10 ml-4" onClick={() => saveCardData()}>Save</button>
                    </div>

                    <div className='mt-5 mb-20'>
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    {TABLE_HEAD.map((head) => (
                                        <th
                                            key={head}
                                            className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                                        >
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal leading-none opacity-70 text-gray-900"
                                            >
                                                {head}
                                            </Typography>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {cardsData.map(({ title, image, id, description }, index) => {
                                    const isLast = index === cardsData?.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={name}>
                                            <td className={classes}>
                                                <Image
                                                    className="w-10 h-10 rounded-full object-cover"
                                                    src={image ? image : ""}
                                                    alt='image'
                                                    width={40}
                                                    height={40}
                                                />
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal text-gray-800"
                                                >
                                                    {title}
                                                </Typography>
                                            </td>

                                            <td className={classes}>
                                                <div className='flex gap-4'>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium cursor-pointer text-gray-800"
                                                        onClick={() => {
                                                            setIsEdit(true)
                                                            setCardImage(image)
                                                            setEditId(id)
                                                            setCardData({ title: title, description: description })
                                                        }}
                                                    >
                                                        Edit
                                                    </Typography>
                                                    {/* <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium cursor-pointer text-gray-800"
                                                        onClick={() => { router.push(`/admin/addpump/addDetails?id=${id}`) }}
                                                    >
                                                        Add details
                                                    </Typography> */}
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-medium cursor-pointer text-gray-800"
                                                        onClick={async () => {
                                                            await deleteCard(mainId, id)
                                                            getCardData()
                                                        }}
                                                    >
                                                        Delate
                                                    </Typography>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </RootLayout >
        )
    }

}
export default AddDetails