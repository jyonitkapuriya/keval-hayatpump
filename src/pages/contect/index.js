import ContactForm from "@/component/contact-form"
import Footer from "@/component/footer"
import Navbar from "@/component/navbar"


const Contect = () => {
    return (
        <div className="expert h-screen overflow-scroll no-scrollbar">
            <div className="relative">
                <Navbar />
                <ContactForm />
                <Footer />
            </div>
        </div>
    )
}
export default Contect