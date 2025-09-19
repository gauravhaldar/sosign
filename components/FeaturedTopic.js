"use client";

import { motion } from "framer-motion";

const topics = [
  "Women's Rights",
  "Education",
  "Environment",
  "Health",
  "Child Rights",
  "Human Rights",
  "Civic",
  "Animals",
  "Ban Single-Use Plastics",
  "Increase Minimum Wage",
  "Enforce Stricter Animal Cruelty Laws",
  "Mandate Mental Health Education in Schools",
  "Lower College Tuition Fees",
  "Legalize Medical Marijuana",
  "Improve Public Transportation Infrastructure",
  "Implement Universal Basic Income",
  "Protect Endangered Species",
  "Support Renewable Energy Projects",
  "Ban Factory Farming",
  "Enforce Stricter Gun Control Laws",
  "Promote Gender Pay Equality",
  "Regulate Social Media Algorithms",
  "Provide Free Menstrual Products in Schools",
  "Make Election Day a National Holiday",
  "Require Police Body Cameras",
  "Improve Accessibility for People with Disabilities",
  "Stop Deforestation in Protected Areas",
  "Increase Funding for Public Libraries",
  "Mandate Transparent Food Labeling",
  "Establish Stricter Data Privacy Laws",
  "Legalize Same-Sex Marriage (where not yet legal)",
  "Increase Support for Homeless Shelters",
  "Ban Animal Testing for Cosmetics",
  "Reduce Military Spending",
  "Provide Tax Incentives for Small Businesses",
  "End Child Marriage",
  "Promote Remote Work Options",
  "Protect Freedom of the Press",
];

export default function FeaturedTopic() {
  return (
    <section className="bg-gray-50 py-8 px-4 scale-95">
      {/* Heading */}
      <h2 className="text-xl md:text-2xl font-medium text-gray-700 mb-6 text-left">
        Featured Topics
      </h2>

      {/* Topics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {topics.map((topic, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.02 }}
            className="p-3 bg-white rounded-lg hover:shadow-md transition cursor-pointer text-gray-600 text-xs font-medium text-center"
          >
            {topic}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
