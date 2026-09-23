"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/lib/sanity";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("8-9 STUDENTS");

  useEffect(() => {
    async function getData() {
      try {
        const result = await client.fetch(`{
          "siteSettings": *[_type == "siteSettings"][0],
          "homePage": *[_type == "homePage"][0],
          "founder": *[_type == "founder"][0],
          "services": *[_type == "service"] | order(order asc),
          "packages": *[_type == "package"] | order(order asc),
          "testimonials": *[_type == "testimonial"] | order(order asc)
        }`);
        setData(result);
      } catch (error) {
        console.error("Sanity fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const basePath = '/Dr.-T-R-Nisar-Ahamed';

  const packages = data?.packages?.length ? data.packages : [
    { name: "Package 1", image: `${basePath}/assets/Mentoria1.png` },
    { name: "Package 2", image: `${basePath}/assets/Mentoria2.png` },
    { name: "Package 3", image: `${basePath}/assets/Mentoria3.png` },
    { name: "Package 4", image: `${basePath}/assets/Mentoria4.png` },
    { name: "Package 5", image: `${basePath}/assets/Mentoria5.png` },
    { name: "Package 6", image: `${basePath}/assets/Mentoria6.png` },
  ];

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section id="home" className="w-full bg-blue-50 py-24 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {data?.homePage?.heroHeading || "Elevate Your Future"}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {data?.homePage?.heroDescription || "Professional mentoring and guidance to unlock your full potential."}
          </p>
          <a href="#contact" className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition">
            {data?.homePage?.ctaText || "Get Started"}
          </a>
        </div>
      </section>

      {/* About Founder */}
      <section id="about" className="w-full py-24 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="w-64 h-64 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 overflow-hidden shadow-xl">
              {data?.founder?.photo ? (
                <img src={data.founder.photo} alt="Dr. T R Nisar Ahamed" className="w-full h-full object-cover" />
              ) : (
                <span className="text-sm">Founder Photo (Dummy)</span>
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">About the Founder</h2>
            <h3 className="text-xl text-blue-600 mb-4">{data?.founder?.name || "Dr. T R Nisar Ahamed"}</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {data?.founder?.biography || "With years of experience in counseling and mentoring, Dr. Nisar Ahamed is dedicated to helping individuals discover their true path."}
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="w-full py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(data?.services?.length ? data.services : [1, 2, 3]).map((service: any, i: number) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition">
                <h3 className="text-xl font-bold mb-3">{service.title || `Service ${i + 1}`}</h3>
                <p className="text-gray-600">{service.description || "Comprehensive guidance tailored to your specific goals and aspirations."}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentoria Packages */}
      <section id="packages" className="w-full py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Mentoria's Plans</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Customise Your Mentorship Plan</p>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {["8-9 STUDENTS", "10-12 STUDENTS", "COLLEGE GRADUATES", "WORKING PROFESSIONALS"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-bold rounded-md text-sm transition ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-white text-blue-600 border border-gray-200 hover:bg-blue-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Standard Package */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col">
              <div className="text-blue-400 text-sm font-semibold mb-2">STANDARD</div>
              <h3 className="text-2xl font-bold text-blue-500 mb-2">Discover</h3>
              <div className="text-3xl font-bold text-blue-500 mb-8">₹ 5,500</div>
              
              <ul className="space-y-4 flex-1 text-sm text-gray-600">
                <li className="flex items-start gap-3"><span className="text-blue-500 font-bold">✓</span> Psychometric assessment to measure your interests</li>
                <li className="flex items-start gap-3"><span className="text-blue-500 font-bold">✓</span> 1 career counselling session with Mentoria's expert career coaches</li>
                <li className="flex items-start gap-3"><span className="text-blue-500 font-bold">✓</span> Lifetime access to Knowledge Gateway</li>
                <li className="flex items-start gap-3"><span className="text-blue-500 font-bold">✓</span> Invites to live webinars by industry experts</li>
                <li className="flex items-start gap-3 text-gray-400 line-through"><span className="text-purple-400 font-bold">✗</span> Customised reports after each session with education pathways</li>
                <li className="flex items-start gap-3 text-gray-400 line-through"><span className="text-purple-400 font-bold">✗</span> Guidance on studying abroad</li>
                <li className="flex items-start gap-3 text-gray-400 line-through"><span className="text-purple-400 font-bold">✗</span> CV building during internships/graduation</li>
              </ul>
              <button className="w-full mt-8 py-3 bg-blue-400 text-white font-bold rounded-full hover:bg-blue-500 transition">BUY NOW</button>
            </div>

            {/* Premium Package */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-pink-500 rounded-bl-full -mr-2 -mt-2"></div>
              <div className="text-blue-400 text-sm font-semibold mb-2">PREMIUM</div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Discover plus+</h3>
              <div className="text-3xl font-bold text-blue-600 mb-8">₹ 15,000</div>
              
              <ul className="space-y-4 flex-1 text-sm text-gray-600">
                <li className="flex items-start gap-3"><span className="text-blue-600 font-bold">✓</span> Psychometric assessments to measure your interests, personality and abilities</li>
                <li className="flex items-start gap-3"><span className="text-blue-600 font-bold">✓</span> 8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation</li>
                <li className="flex items-start gap-3"><span className="text-blue-600 font-bold">✓</span> Lifetime access to Knowledge Gateway</li>
                <li className="flex items-start gap-3"><span className="text-blue-600 font-bold">✓</span> Invites to live webinars by industry experts</li>
                <li className="flex items-start gap-3"><span className="text-blue-600 font-bold">✓</span> Customised reports after each session with education pathways</li>
                <li className="flex items-start gap-3"><span className="text-blue-600 font-bold">✓</span> Guidance on studying abroad</li>
                <li className="flex items-start gap-3"><span className="text-blue-600 font-bold">✓</span> CV building during internships/graduation</li>
              </ul>
              <button className="w-full mt-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition">BUY NOW</button>
            </div>

            {/* Customisable Plan */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col">
              <div className="text-blue-400 text-sm font-semibold mb-2">CUSTOMISABLE</div>
              <h3 className="text-2xl font-bold text-blue-700 mb-2">Build Your Own</h3>
              <div className="text-3xl font-bold text-blue-700 mb-8">Contact Us</div>
              
              <ul className="space-y-4 flex-1 text-sm text-gray-600">
                <li className="flex items-start gap-3"><span className="text-blue-700 font-bold">✓</span> Tailor your own mentoring sessions</li>
                <li className="flex items-start gap-3"><span className="text-blue-700 font-bold">✓</span> Choose specific topics you need help with</li>
                <li className="flex items-start gap-3"><span className="text-blue-700 font-bold">✓</span> Flexible scheduling</li>
                <li className="flex items-start gap-3"><span className="text-blue-700 font-bold">✓</span> Specialized expert guidance</li>
                <li className="flex items-start gap-3"><span className="text-blue-700 font-bold">✓</span> One-on-one personalized attention</li>
                <li className="flex items-start gap-3"><span className="text-blue-700 font-bold">✓</span> Build a unique roadmap for your career</li>
              </ul>
              <a href="#contact" className="block text-center w-full mt-8 py-3 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 transition">INQUIRE NOW</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="w-full py-24 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900">What Our Clients Say</h2>
          <div className="bg-white p-8 rounded-2xl shadow-sm italic text-gray-600 text-lg">
            "ElevateNext provided me with the clarity and direction I needed to take the next big step in my career."
            <div className="mt-6 font-semibold not-italic text-gray-900">- Anonymous Client</div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="w-full py-24 px-4">
        <div className="container mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
          <p className="text-gray-600 mb-8">Ready to start your journey? Get in touch with us today.</p>
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col gap-4">
            <div className="flex flex-col text-left">
              <label className="text-sm font-semibold text-gray-700 mb-1">Name</label>
              <input type="text" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Name" />
            </div>
            <div className="flex flex-col text-left">
              <label className="text-sm font-semibold text-gray-700 mb-1">Email</label>
              <input type="email" className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Email" />
            </div>
            <div className="flex flex-col text-left">
              <label className="text-sm font-semibold text-gray-700 mb-1">Message</label>
              <textarea className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" placeholder="How can we help you?"></textarea>
            </div>
            <button className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition mt-2">
              Send Message
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
