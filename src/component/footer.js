// import { Typography, Button } from "@material-tailwind/react";

// const LINKS = ["Home", "About Us", "Blog", "Service"];
// const CURRENT_YEAR = new Date().getFullYear();
export function Footer() {
  return (
    <footer className="w-full bottom-0 left-0 fixed p-4 bg-gradient-to-r from-blue-900 to-blue-500 text-white text-sm text-center">
      <div className="max-w-screen-xl mx-auto">
        © {new Date().getFullYear()} <a href="https://flowbite.com/" className="hover:underline">HayatPump</a>. All Rights Reserved.
      </div>
    </footer>
  );
}


export default Footer;
