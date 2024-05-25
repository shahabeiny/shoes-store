import { ToastContainer } from "react-toastify";
import { RouterElement } from "./Route/routes";
// import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthContextProvider from "./context/ContextAuth"
import { useEffect } from "react";



const App = (): JSX.Element => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  // throw new Error("خودمان خطا ایجاد کردیم");
  
  return (

    <AuthContextProvider>
      {/* <ScrollToTop /> */}

      <RouterElement />
      
      <ToastContainer/>
    </AuthContextProvider>
 
  );
};

export default App;
