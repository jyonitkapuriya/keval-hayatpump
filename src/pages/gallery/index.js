import ContactForm from "@/component/contact-form"
import Footer from "@/component/footer"
import Navbar from "@/component/navbar"

const Gallery = () => {
    return (
        <div className="expert overflow-scroll no-scrollbar h-screen w-full lg:px-0 ">
            <div className="relative">
                <Navbar />
            </div>
            <div className="text-lg text-gray-700 font-semibold mt-32 px-8 flex justify-center">
                Hayat-pump / Gallery
            </div>
            <ContactForm />
            <Footer />
        </div>

    )
}
export default Gallery