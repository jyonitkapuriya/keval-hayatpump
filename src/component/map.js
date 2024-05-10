import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { Typography } from '@material-tailwind/react';

const LeafletMap = () => {
    return (
        <>

            <div className='px-8 max-w-7xl mx-auto gap-8 flex flex-col overflow-hidden  border-t border-solid border-gray-700 border-opacity-35 py-20'>
                <div className="mb-8 animate-pulse lg:text-8xl text-5xl  font-sans font-semibold flex item-center justify-center" style={{ color: '#07aadb' }}>
                    Location
                </div>
                <Typography
                    variant="lead"
                    className="mx-auto w-full lg:w-5/12 !text-gray-500"
                >
                    Our office is located at 123 Street, City, Country. Feel free to drop by during our business hours.
                </Typography>
            </div>

            <div className='px-8'>
                <div style={{ height: '300px', position: 'sticky' }} className=' mb-20 mx-auto  shadow-xl rounded-lg overflow-hidden mt-10 max-w-7xl  relative '>
                    <MapContainer center={[22.3039, 70.8022]} zoom={13} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[51.505, -0.09]}>
                            <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
            </div>
        </>
    );
};

export default LeafletMap;
