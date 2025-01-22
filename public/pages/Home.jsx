import HeroSection from '../../src/components/HeroSection';
import Navbar from '../../src/components/Navbar';
import Explore from '../../src/components/Exploreprod';
import '../App.css';
import Contactus from '../../src/components/Contactus';
import Footer from '../../src/components/footer';
import Companies from '../../src/components/companies';
//import Testimonials from '../components/Testimonials';

export default function Home() {
    return (
        <div>
            <Navbar />
            
            <HeroSection className="mt-20"/>
            <Explore className="mt-20"/>
            <Companies className="mt-20"/>
            <Contactus className="mt-20" id="contact"/>
            <Footer className="mt-20"/>

        </div>

           
    );
}
