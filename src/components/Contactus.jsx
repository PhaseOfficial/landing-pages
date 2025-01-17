import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdPin } from "react-icons/io";
export default function Widget() {
    return (
        
        
        <div className="bg-background text-primary-foreground py-12 px-4 sm:px-6 lg:px-8" id="contact">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 mt-10 text-gray-600">Get in Touch</h2>
                <p className="text-lg mb-4 0 text-gray-600 ">Feel free to reach out to us for any inquiries or collaborations.</p>
                <ul className="mb-6">
                  <li className="flex items-center mb-2 text-gray-600">
                  <FaPhone className="mr-2"/>
                    <span>+263 788 1472 89</span>
                  </li>
                  <li className="flex items-center mb-2 text-gray-600">
                  <MdEmail className="mr-2"/>
                    <span>redcupseriespvtltd@gmail.com</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                  <IoMdPin className="mr-2"/>
                    <span>No. 6791 New Ceney Park Harare
</span>
                  </li>
                </ul>
              </div>
        
              <div>
                <h2 className="text-3xl font-bold mb-4 text-gray-600">Let us get in Touch with you</h2>
                <p className="text-lg mb-4 text-gray-600">Stay updated with our latest products and services.</p>
                <form className="flex items-center">
                  <input
                    type="email"
                    placeholder="Phone Number or Your Email Address"
                    className="w-full bg-input text-primary-foreground placeholder-primary-foreground border border-primary rounded-l-md px-4 py-2 focus:outline-none"
                  />
                  <button type="submit" className="bg-primary text-primary-foreground rounded-r-md px-4 py-2 ml-2">
                    Connect
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        
        
    )
}