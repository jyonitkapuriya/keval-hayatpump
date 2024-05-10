import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/component/navbar";
import Hero from "@/component/hero";
import Clients from "@/component/clients";
import Skills from "@/component/skills";
import Projects from "@/component/projects";
import ContactForm from "@/component/contact-form";
import dynamic from "next/dynamic";
import Footer from "@/component/footer";
// import LeafletMap from "@/component/map";
const LeafletMap = dynamic(() => import('@/component/map'), { ssr: false })
// import SimpleMap from "@/component/map";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* <div class="container w-full no-scrollbar">
        <div class="intro w-full ">
          <h2>Welcome</h2>
        </div>
      </div> */}
      <main className="no-scrollbar expert overflow-scroll ">
        <div class=" h-screen w-full relative no-scrollbar overflow-scroll ">
          {/* <ScrollAnimation animateIn="fadeIn"> */}
          <Navbar />
          <Hero />
          <Clients />
          <Skills />
          <Projects />
          <LeafletMap />
          <ContactForm />
          <Footer />
          {/* </ScrollAnimation> */}
        </div>
      </main >


    </>
  );
}
