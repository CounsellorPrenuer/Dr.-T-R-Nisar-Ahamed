"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/lib/sanity";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-900">Mentoria Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Choose the perfect package for your journey.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg: any, i: number) => (
              <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col transition hover:-translate-y-1 hover:shadow-xl">
                <div className="h-64 relative w-full bg-gray-100">
                  {/* Using regular img for external Sanity images or fixed local paths */}
                  <img 
                    src={pkg.image}
                    alt={pkg.name || `Package ${i+1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
                    {pkg.price && <p className="text-blue-600 font-bold mb-4">{pkg.price}</p>}
                    <p className="text-gray-600 text-sm mb-4">{pkg.description || "Unlock premium insights and guided mentoring."}</p>
                  </div>
                  <button className="w-full py-3 bg-blue-50 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
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
