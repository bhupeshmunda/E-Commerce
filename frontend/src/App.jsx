import {Outlet} from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function App() {

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="dark"
        style={{ zIndex: 99999 }}
      />
      <Navigation/>
      <main className="py-3">
        <Outlet/>
      </main>
    </>
  )
}

export default App
