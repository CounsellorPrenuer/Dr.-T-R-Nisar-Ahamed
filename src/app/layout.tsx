import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ElevateNext | Dr. T R Nisar Ahamed',
  description: 'Professional Mentoring and Consulting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}

function Navbar() {
  const basePath = '/Dr.-T-R-Nisar-Ahamed';
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <object 
            data={`${basePath}/assets/logo.pdf#toolbar=0&navpanes=0&scrollbar=0`} 
            type="application/pdf" 
            className="h-12 w-48 pointer-events-none"
          >
            <div className="font-bold text-xl text-blue-600">ElevateNext</div>
          </object>
        </a>
        <div className="hidden md:flex space-x-6 text-gray-600 items-center">
          <a href="#home" className="hover:text-blue-600 transition">Home</a>
          <a href="#about" className="hover:text-blue-600 transition">About Founder</a>
          <a href="#services" className="hover:text-blue-600 transition">Services</a>
          <a href="#packages" className="hover:text-blue-600 transition">Mentoria Packages</a>
          <a href="#testimonials" className="hover:text-blue-600 transition">Testimonials</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact Us</a>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-xl text-white mb-4">ElevateNext</h3>
          <p>Empowering your future with professional mentorship.</p>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Navigation</h4>
          <ul className="space-y-2">
            <li><a href="#home" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Contact</h4>
          <p>drahamed4@yahoo.com</p>
          <p>09686522010</p>
        </div>
      </div>
      <div className="container mx-auto px-4 text-center mt-8 pt-8 border-t border-gray-800 text-sm">
        &copy; {new Date().getFullYear()} ElevateNext. All rights reserved.
      </div>
    </footer>
  )
}
