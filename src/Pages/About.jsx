import React from 'react';
import { ChevronRight, Award, Users, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer';

const About = () => {
  const navigate = useNavigate();
  const teamMembers = [
    { name: 'Alex Morgan', role: 'Founder & CEO', image: '/placeholder.svg' },
    { name: 'Jamie Chen', role: 'CTO', image: '/placeholder.svg' },
    { name: 'Sam Wilson', role: 'Design Lead', image: '/placeholder.svg' },
    { name: 'Taylor Reed', role: 'Marketing Director', image: '/placeholder.svg' },
  ];

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-block rounded-lg bg-[#4A90E250] px-3 py-1 text-sm text-[var(--secondary-foreground)] mb-4">About Us</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            We're on a mission to transform digital experiences
          </h1>
          <p className="text-lg text-[var(--muted-foreground)] max-w-2xl mb-8">
            Founded in 2020, our team of passionate creators, developers, and visionaries work together to build products that make a difference.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-[#4A90E2] hover:scale-110 duration-200 text-[var(--primary-foreground)] px-6 py-2 rounded-lg flex items-center" onClick={() => navigate('/contact')}>
              Get in touch <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto mb-12">
            These principles guide everything we do and help us create exceptional experiences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Award />, title: 'Excellence', text: 'We strive for excellence in everything we do.' },
              { icon: <Users />, title: 'Collaboration', text: 'We believe great ideas come from diverse perspectives.' },
              { icon: <Heart />, title: 'Empathy', text: "We put ourselves in our users' shoes to create impactful products." }
            ].map((value, index) => (
              <div key={index} className="bg-[var(--card)] shadow-lg p-6 rounded-lg text-center">
                <div className="bg-[#4A90E270] p-3 w-12 h-12 flex items-center justify-center mb-4 mx-auto rounded-full">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-[var(--muted-foreground)]">{value.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-48 h-48 mb-4 mx-auto rounded-full bg-[var(--muted)]"></div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-[var(--muted-foreground)]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[var(--secondary)] p-8 md:p-12 text-center rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to work with us?</h2>
          <p className="text-[var(--muted-foreground)] max-w-2xl mx-auto mb-8">
            Whether you have a project in mind or just want to say hello, we'd love to hear from you.
          </p>
          <button onClick={() => navigate('/contact')} className="bg-[#4A90E2] hover:scale-110 duration-200 text-[var(--primary-foreground)] px-8 py-3 rounded-lg flex items-center mx-auto">
            Contact us today <ChevronRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
