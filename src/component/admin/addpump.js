"use client"
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Button, Input } from '@material-tailwind/react';
import { useEffect, useRef, useState } from 'react';
import { addPums, deletePump, getPums, updatePump, uploadPumpImage } from '../../firebase/config';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import { Card, Typography } from "@material-tailwind/react";
const TABLE_HEAD = ["Image", "Name", "Type", "Action"];
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase/firebase';

const AddPump = () => {
    const ref = useRef();
    const [image, setImage] = useState(null);
    const [pumpData, setPumpData] = useState({ name: "" });
    const [allPumps, setAllPumps] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const router = useRouter()

    const { admin, loading } = useFirebase()

    useEffect(() => {
        getDoc()
    }, [isLoading])

    useEffect(() => {
        if (!admin && !loading) {
            router.push('/')
        }
    }, [admin])

    const getDoc = async () => {
        const res = await getPums()
        console.log("pumpData.name, pumpData.type, res", res)
        setAllPumps(res)
    }

    const imageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = async () => {

        setIsLoading(true)
        if (!image || pumpData.name === "") {
            toast.error("Please fill details")
            setIsLoading(false)
            return;
        }
        if (isEdit) {
            const res = await uploadPumpImage(image, image?.name);
            const updateData = await updatePump(pumpData.id, { ...pumpData, imageUrl: image?.url ? image?.url : res })
            setIsLoading(false)
            setImage(null)
            setPumpData({ name: "" })
        } else {
            const res = await uploadPumpImage(image, image?.name);
            const addData = await addPums(pumpData.name, pumpData.type, res)
            setIsLoading(false)
            setImage(null)
            setPumpData({ name: "" })
        }
    };

    return (
        <div className="col-span-full p-8 pb-16 pt-24 h-screen bg-white overflow-scroll no-scrollbar ">
            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Pump image
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                {image === null ? (
                    <div className="text-center">
                        <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" ref={ref} onChange={imageChange} />
                            </label>
                            <p className="pl-1 text-sm">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </div>
                ) : (
                    <Image src={image?.url ? image?.url : URL.createObjectURL(image)} alt="Selected Image" width={200} height={200} className='h-40 w-40' />
                )}
                {image &&
                    <button className=" bg-black aboslute ml-auto md:w-fit mt-5 h-12 w-fit px-4 text-sm rounded-lg text-white" onClick={() => setImage(null)}>
                        Delate selected image
                    </button>
                }
            </div>
            <input
                type="text"
                placeholder="eg. Lucas"
                className="border border-gray-300 rounded-lg px-3 py-2 mt-10 w-full text-gray-700"
                value={pumpData.name}
                onChange={(e) => setPumpData({ ...pumpData, name: e.target.value })}
            />
            <select id="countries" className="bg-gray-50 mt-5 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setPumpData({ ...pumpData, type: e.target.value })}>
                <option selected value={"submersible_pump"}>Submersible Pump</option>
                <option value="submersible_motor">Submersible Motor</option>
                <option value="solar_motor">Solar Motor</option>
                <option value="horizonatal_openwell_pumps">Horizonatal Openwell Pumps</option>
                <option value="upvc_pumps">UPVC Pumps</option>
                <option value="cable">Cable</option>
            </select>
            <button
                className="w-full md:w-auto mt-5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm"
                onClick={handleUpload}
            >
                Submit
            </button>

            <div className='mt-5'>
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
                        {allPumps.map(({ name, imageUrl, id, type }, index) => {
                            const isLast = index === allPumps.length - 1;
                            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <Image
                                            className="w-10 h-10 rounded-full object-cover"
                                            src={imageUrl}
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
                                            {name}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal text-gray-800"
                                        >
                                            {type}
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
                                                    setImage({ url: imageUrl })
                                                    setPumpData({ name: name, id: id })
                                                }}
                                            >
                                                Edit
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium cursor-pointer text-gray-800"
                                                onClick={() => { router.push(`/admin/addpump/addDetails?id=${id}`) }}
                                            >
                                                Add details
                                            </Typography>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-medium cursor-pointer text-gray-800"
                                                onClick={async () => {
                                                    setIsLoading(true)
                                                    await deletePump(id)
                                                    setIsLoading(false)
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
    );
};

export default AddPump;
