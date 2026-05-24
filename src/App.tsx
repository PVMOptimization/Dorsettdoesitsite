import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Contact from './pages/Contact'
import BookNow from './pages/BookNow'
import Reviews from './pages/Reviews'
import Gallery from './pages/Gallery'
import ThankYou from './pages/ThankYou'
import Footer from './components/Footer'

export default function App() {
  return (
    <BrowserRouter>
      <div className="grain-overlay" aria-hidden="true" />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/book-now" element={<BookNow />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
