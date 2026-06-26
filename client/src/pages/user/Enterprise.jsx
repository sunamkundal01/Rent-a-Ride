import { Link } from "react-router-dom"
import styles from "../.."
import Footers from "../../components/Footer"



function Enterprise() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className={`${styles.heading2}`}>List your vehicle with us</h1>
        <p>
          To list your vehicle login as a vendor first{" "}
          <span className="text-blue-600 cursor-pointer">
            <Link to={"/vendorSignin"}>login as vendor</Link>
          </span>
        </p>
      </div>
      <Footers />
    </div>
  )
}

export default Enterprise