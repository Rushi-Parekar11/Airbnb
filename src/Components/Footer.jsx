import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#171717] text-[#a1a1a1] px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-6">
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-[#fe595e]">Course bnb</h2>
          <p className="text-sm max-w-xs">
            Learn from the best online courses, from web development to machine learning.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="space-y-1">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Courses</li>
            <li className="hover:text-white cursor-pointer">About</li>
            <li className="hover:text-white cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-white">Contact</h3>
          <p>Email: rushikeshparekar11@gmail.com</p>
          <p>Phone: +91 7756808374</p>
        </div>
      </div>

      <div className="mt-10 text-center border-t border-[#222323] pt-4 text-sm">
        © {new Date().getFullYear()} MyCourseSite. All rights reserved.
      </div>
    </footer>
  );
}
