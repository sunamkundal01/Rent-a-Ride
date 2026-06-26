import Footers from "../../components/Footer"


function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-gray-600 max-w-md mb-6">
          Have a question about a booking, a vehicle, or listing as a vendor?
          We&apos;d love to help.
        </p>
        <a
          href="mailto:sunamkundal366@gmail.com"
          className="text-blue-600 underline font-medium"
        >
          sunamkundal366@gmail.com
        </a>
      </div>
      <Footers />
    </div>
  )
}

export default Contact
// this is our contact page
