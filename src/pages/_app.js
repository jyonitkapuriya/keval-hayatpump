import { FirebaseProvider } from "@/firebase/firebase";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <FirebaseProvider>
        <Component {...pageProps} />;
        <ToastContainer />
      </FirebaseProvider>
    </>
  )
}
