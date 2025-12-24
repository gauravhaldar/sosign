"use client";

import Link from "next/link";

// Sample data for "You May Have Missed" section
const missedPosts = [
  {
    id: 1,
    slug: "top-luxury-ideas-high-end-home",
    title: "Top Luxury Ideas for High-End Home Exterior Decor",
    categories: ["Interior", "Lifestyle"],
    author: "nikkuramani",
    date: "February 26, 2024",
    image: "https://picsum.photos/seed/missed1/400/400",
  },
  {
    id: 2,
    slug: "discovering-hidden-mysteries-petra",
    title: "Discovering the Hidden Mysteries of Petra",
    categories: ["Animals", "Lifestyle"],
    author: "nikkuramani",
    date: "February 26, 2024",
    image: "https://picsum.photos/seed/missed2/400/400",
  },
  {
    id: 3,
    slug: "leading-state-art-design-history",
    title: "Leading state of the art design history",
    categories: ["Interior", "Lifestyle"],
    author: "nikkuramani",
    date: "February 23, 2024",
    image: "https://picsum.photos/seed/missed3/400/400",
  },
  {
    id: 4,
    slug: "rapid-aircraft-interior-design",
    title: "Rapid Aircraft Interior Design via Renderings",
    categories: ["Lifestyle", "Technology"],
    author: "nikkuramani",
    date: "February 21, 2024",
    image: "https://picsum.photos/seed/missed4/400/400",
  },
];

export default function YouHave() {
  return (
    <section className="bg-[#f0f2f5] py-12 px-4 sm:px-6 lg:px-8">
      {/* White Card Container */}
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm">
        {/* Section Title */}
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a1a2e]">
            You May Have Missed
          </h2>
          <span className="w-3 h-3 bg-[#F43676] rounded-full"></span>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {missedPosts.map((post) => (
            <Link
              key={post.id}
              href={`/category/${post.categories[0].toLowerCase()}/${post.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-square"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url('${post.image}')` }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.map((category, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#fce4ec] text-[#F43676] rounded-full text-xs font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-white font-bold text-base leading-tight mb-3 group-hover:text-[#F43676] transition-colors">
                  {post.title}
                </h3>

                {/* Author Info */}
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-gray-400 overflow-hidden">
                    <img
                      src={`https://ui-avatars.com/api/?name=${post.author}&background=random&size=24`}
                      alt={post.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-gray-300 text-xs">{post.author}</span>
                  <span className="text-[#F43676] text-xs">•</span>
                  <span className="text-gray-400 text-xs">{post.date}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
