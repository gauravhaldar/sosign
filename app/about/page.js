"use client";

import React from 'react';
import { FaUsers, FaHandshake, FaBullhorn, FaMobileAlt, FaGlobe, FaHeart, FaCheckCircle } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="bg-[#f0f2f5] min-h-screen py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#002050] to-[#2D3A8C] rounded-3xl p-8 md:p-12 mb-10 text-center shadow-xl">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
            About Us – Sosign.in
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Sosign.in is a powerful petition and signature-campaign platform built to transform voices into real-world change. We exist with one clear purpose: to create awareness, unite people, and help resolve social issues quickly, transparently, and permanently.
          </p>
        </div>

        {/* Who We Are Section */}
        <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#F43676]/10 rounded-full flex items-center justify-center">
              <FaUsers className="text-[#F43676] text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#002050]">Who We Are</h2>
          </div>
          <div className="space-y-4 text-[#302d55] leading-relaxed text-lg">
            <p>
              Sosign is a new-age digital movement that brings people from across the nation onto one common platform. We believe that every individual&apos;s opinion matters and that collective voices can influence decisions, policies, and actions.
            </p>
            <p>
              At Sosign, we help citizens use their online identity as a force for good—to start petitions, support causes, and build campaigns that address the social challenges affecting our country today.
            </p>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#F43676]/10 rounded-full flex items-center justify-center">
              <FaHandshake className="text-[#F43676] text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#002050]">What We Do</h2>
          </div>
          <p className="text-[#302d55] leading-relaxed text-lg mb-6">
            We connect:
          </p>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[#f0f2f5] rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-[#002050] rounded-full flex items-center justify-center mx-auto mb-3">
                <FaUsers className="text-white text-sm" />
              </div>
              <p className="text-[#002050] font-semibold">Ordinary citizens who want change</p>
            </div>
            <div className="bg-[#f0f2f5] rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-[#F43676] rounded-full flex items-center justify-center mx-auto mb-3">
                <FaHeart className="text-white text-sm" />
              </div>
              <p className="text-[#002050] font-semibold">Social workers and NGOs working on the ground</p>
            </div>
            <div className="bg-[#f0f2f5] rounded-xl p-5 text-center">
              <div className="w-10 h-10 bg-[#2D3A8C] rounded-full flex items-center justify-center mx-auto mb-3">
                <FaBullhorn className="text-white text-sm" />
              </div>
              <p className="text-[#002050] font-semibold">Political leaders and parties who can drive policy and action</p>
            </div>
          </div>
          <p className="text-[#302d55] leading-relaxed text-lg">
            By bringing these stakeholders together, Sosign becomes a bridge between problems, people, and solutions. Our platform enables meaningful discussions, verified signature campaigns, and focused awareness drives that push issues in the right direction.
          </p>
        </div>

        {/* Why Sosign Matters Section */}
        <div className="bg-gradient-to-r from-[#F43676] to-[#ff6b9d] rounded-2xl p-8 md:p-10 mb-8 shadow-lg text-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FaCheckCircle className="text-white text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold">Why Sosign Matters</h2>
          </div>
          <div className="space-y-4 leading-relaxed text-lg">
            <p>
              Too often, important issues are discussed only in closed circles—with friends, on local street corners, or on social media without impact. Sosign changes that.
            </p>
            <p className="font-semibold text-xl">
              Instead of just talking about problems, we help you act.
            </p>
            <p>
              Sosign gives you the medium to speak up, but you are the real power. Every signature, every shared campaign, and every discussion moves us closer to a better society.
            </p>
          </div>
        </div>

        {/* Our Mission Section */}
        <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#F43676]/10 rounded-full flex items-center justify-center">
              <FaBullhorn className="text-[#F43676] text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#002050]">Our Mission</h2>
          </div>
          <p className="text-[#302d55] leading-relaxed text-lg mb-6">
            Our mission is simple yet strong:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Create social awareness",
              "Encourage responsible participation",
              "Support campaigns that lead to real solutions",
              "Strengthen democracy through people-driven action"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 bg-[#f0f2f5] rounded-lg p-4">
                <div className="w-8 h-8 bg-[#002050] rounded-full flex items-center justify-center flex-shrink-0">
                  <FaCheckCircle className="text-white text-sm" />
                </div>
                <p className="text-[#002050] font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Scope Section */}
        <div className="bg-white rounded-2xl p-8 md:p-10 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#F43676]/10 rounded-full flex items-center justify-center">
              <FaGlobe className="text-[#F43676] text-xl" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#002050]">Future Scope of Sosign</h2>
          </div>
          <p className="text-[#302d55] leading-relaxed text-lg mb-6">
            We are building Sosign not just for today, but for the future.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: FaMobileAlt, text: "Launch of a dedicated Android app to make starting and supporting petitions even easier" },
              { icon: FaGlobe, text: "Expansion into large-scale national and global campaigns" },
              { icon: FaHeart, text: "Focus on critical issues such as human trafficking, social justice, public welfare, and human rights" },
              { icon: FaCheckCircle, text: "Becoming a trusted digital space where voices lead to measurable outcomes" }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-[#f0f2f5] rounded-lg p-4">
                <div className="w-8 h-8 bg-[#F43676] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <item.icon className="text-white text-sm" />
                </div>
                <p className="text-[#302d55]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join the Change CTA Section */}
        <div className="bg-gradient-to-r from-[#002050] to-[#2D3A8C] rounded-2xl p-8 md:p-12 text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Join the Change</h2>
          <p className="text-white/90 text-lg mb-6">
            We are not just talking about changing the world—we are doing it together.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["Join Sosign.in", "Start a campaign", "Support a cause", "Add your signature"].map((action, index) => (
              <span key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full font-medium">
                {action}
              </span>
            ))}
          </div>
          <p className="text-[#F43676] text-xl md:text-2xl font-bold italic">
            Because when people unite with purpose, change is not optional—it&apos;s inevitable.
          </p>
        </div>
      </div>
    </div>
  );
}
