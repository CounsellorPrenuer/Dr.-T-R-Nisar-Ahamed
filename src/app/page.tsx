"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "@/lib/sanity";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("8-9 STUDENTS");
  const [mainTab, setMainTab] = useState("Mentoria's Plans");

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
          <div className="flex flex-col items-center w-full mb-12">
            {/* Main Tabs */}
            <div className="flex w-full max-w-4xl border-2 border-blue-600 rounded-md overflow-hidden mb-6">
              <button 
                onClick={() => setMainTab("Mentoria's Plans")}
                className={`flex-1 py-3 font-bold text-sm text-center transition ${mainTab === "Mentoria's Plans" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`}
              >
                Mentoria's Plans
              </button>
              <button 
                onClick={() => setMainTab("Customise Your Mentorship Plan")}
                className={`flex-1 py-3 font-bold text-sm text-center transition ${mainTab === "Customise Your Mentorship Plan" ? "bg-blue-600 text-white" : "bg-white text-blue-600 hover:bg-blue-50"}`}
              >
                Customise Your Mentorship Plan
              </button>
            </div>
            
            {mainTab === "Mentoria's Plans" && (
              <>
                {/* Sub Tabs */}
                <div className="flex flex-wrap justify-center gap-2 w-full max-w-6xl">
                  {["8-9 STUDENTS", "10-12 STUDENTS", "COLLEGE GRADUATES", "WORKING PROFESSIONALS"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-8 py-3 font-semibold text-sm transition border ${
                        activeTab === tab
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-blue-600 border-gray-200 hover:bg-blue-50"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {mainTab === "Mentoria's Plans" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Standard Package */}
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-10 flex flex-col">
                <div className="text-blue-500 text-sm font-semibold mb-4 tracking-wider uppercase">STANDARD</div>
                
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-blue-500 mb-2">
                    {activeTab === "8-9 STUDENTS" ? "Discover" : activeTab === "10-12 STUDENTS" ? "Achieve Online" : "Ascend Online"}
                  </h3>
                  <div className="flex justify-center items-start text-blue-500">
                    <span className="text-xl mt-1 mr-1">₹</span>
                    <span className="text-4xl font-bold">
                      {activeTab === "8-9 STUDENTS" ? "5,500" : activeTab === "10-12 STUDENTS" ? "5,999" : "6,499"}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-5 flex-1 text-sm text-gray-600">
                  <li className="flex items-start gap-4">
                    <span className="text-blue-500 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" ? "Psychometric assessment to measure your interests" : "Psychometric assessment to measure your interests, personality and abilities"}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-500 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" ? "1 career counselling session with Mentoria's expert career coaches" : "1 career counselling session"}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-500 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">Lifetime access to Knowledge Gateway</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-500 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" ? "Invites to live webinars by industry experts" : "Pre-recorded webinars by industry experts"}</span>
                  </li>
                  <li className="flex items-start gap-4 text-gray-400 line-through">
                    <span className="text-purple-400 font-bold text-lg mt-[-2px]">✗</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" || activeTab === "10-12 STUDENTS" ? "Customised reports after each session with education pathways" : "Customised reports after each session with information on certificate/online courses"}</span>
                  </li>
                  <li className="flex items-start gap-4 text-gray-400 line-through">
                    <span className="text-purple-400 font-bold text-lg mt-[-2px]">✗</span> 
                    <span className="leading-snug">Guidance on studying abroad</span>
                  </li>
                  <li className="flex items-start gap-4 text-gray-400 line-through">
                    <span className="text-purple-400 font-bold text-lg mt-[-2px]">✗</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" ? "CV building during internships/graduation" : activeTab === "10-12 STUDENTS" ? "CV reviews during internships/graduation" : "CV reviews for job application"}</span>
                  </li>
                </ul>
                
                <button className="w-full mt-10 py-3 bg-blue-400 text-white font-bold rounded-full hover:bg-blue-500 transition shadow-md">BUY NOW</button>
              </div>

              {/* Premium Package */}
              <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-10 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-pink-600 rounded-bl-full -mr-4 -mt-4"></div>
                <div className="text-blue-600 text-sm font-semibold mb-4 tracking-wider uppercase">PREMIUM</div>
                
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-bold text-blue-600 mb-2">
                    {activeTab === "8-9 STUDENTS" ? "Discover plus+" : activeTab === "10-12 STUDENTS" ? "Achieve Plus+" : "Ascend Plus+"}
                  </h3>
                  <div className="flex justify-center items-start text-blue-600">
                    <span className="text-xl mt-1 mr-1">₹</span>
                    <span className="text-4xl font-bold">
                      {activeTab === "8-9 STUDENTS" ? "15,000" : "10,599"}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-5 flex-1 text-sm text-gray-600">
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">Psychometric {activeTab === "8-9 STUDENTS" ? "assessments" : "assessment"} to measure your interests, personality and abilities</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" ? "8 career counselling sessions (1 every year) with Mentoria's expert career coaches until graduation" : activeTab === "10-12 STUDENTS" ? "4 career counselling sessions" : "3 career counselling sessions"}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">Lifetime access to Knowledge Gateway</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" ? "Invites to live webinars by industry experts" : "Attend live webinars by industry experts"}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" || activeTab === "10-12 STUDENTS" ? "Customised reports after each session with education pathways" : "Customised reports after each session with information on certificate/online courses"}</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">Guidance on studying abroad</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-lg mt-[-2px]">✓</span> 
                    <span className="leading-snug">{activeTab === "8-9 STUDENTS" ? "CV building during internships/graduation" : activeTab === "10-12 STUDENTS" ? "CV reviews during internships/graduation" : "CV reviews for job application"}</span>
                  </li>
                </ul>
                
                <button className="w-full mt-10 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition shadow-md relative z-10">BUY NOW</button>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Want To Customise Your Mentorship Plan?</h3>
                <p className="text-gray-600">If you want to subscribe to specific services from Mentoria that resolve your career challenges,<br/>you can choose one or more of the following:</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {[
                  { title: "CV Building", price: "₹2000", desc: "Is your CV making a great first impression on your behalf? Our HR experts will help you build the kind of CV that stands out from the crowd and increases your chances of getting interview calls." },
                  { title: "LinkedIn Profile Building", price: "₹2000", desc: "Revamp your LinkedIn profile with recommendations from recruitment experts to showcase your career journey and increase your chances of interview calls." },
                  { title: "LinkedIn Profile + CV Building", price: "₹3500", desc: "Build the kind of profile recruiters would love to spend time on. Get your CV and LinkedIn profile built by our HR/Recruitment experts." },
                  { title: "Job Application Strategy", price: "₹4000", desc: "Build the right pipeline for job interviews through a customised job application tracker with information on companies, job postings and steps you need to follow to land your dream job." },
                  { title: "Career Report", price: "₹2500", desc: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests, personality and abilities. Find out where your interests lie and which future paths you can potentially consider." },
                  { title: "Career Report + Career Counselling", price: "₹4000", desc: "Connect with India's top career coaches to analyse your psychometric report, get a detailed action plan for your development areas and shortlist the top three career paths you're most likely to enjoy and excel at." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col items-start hover:shadow-lg transition">
                    <div className="w-full h-48 bg-gray-100 rounded-md mb-6 flex items-center justify-center text-gray-400">
                      Icon
                    </div>
                    <h4 className="text-lg font-bold text-gray-800">{item.title}</h4>
                    <div className="text-blue-600 font-bold mb-3">{item.price}</div>
                    <p className="text-sm text-gray-600 mb-6 flex-1">{item.desc}</p>
                    <button className="px-8 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">BUY NOW</button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
