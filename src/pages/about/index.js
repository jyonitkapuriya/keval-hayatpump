import AboutPage from "@/component/about/about"
import Footer from "@/component/footer"
import Navbar from "@/component/navbar"
import dynamic from "next/dynamic"
const LeafletMap = dynamic(() => import('@/component/map'), { ssr: false })

const AboutUs = () => {
    return (
        <div className="expert h-screen overflow-scroll no-scrollbar">
            <Navbar />
            <AboutPage />
            <LeafletMap />
            <Footer />
        </div>
    )
}
export default AboutUs