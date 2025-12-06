import Header from '@/app/components/Header';
import Hero from '@/app/components/Hero';
import About from '@/app/components/About';
import Stats from '@/app/components/Stats';
import Services from '@/app/components/Services';
import Appointment from '@/app/components/Appointment';
import Doctors from '@/app/components/Doctors';
import Faq from '@/app/components/Faq';
import Testimonials from '@/app/components/Testimonials';
import Gallery from '@/app/components/Gallery';
import Contact from '@/app/components/Contact';
import Footer from '@/app/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        <About />
        {/* <Stats /> */}
        <Services />
        <Appointment />
        <Doctors />
        <Faq />
        <Testimonials />
        {/* <Gallery /> */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}