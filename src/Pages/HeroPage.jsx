import React from "react";
import { Search } from "lucide-react";

function HeroPage({ search, setSearch, suggestions, handleSelect,courses }) {
const topicTitles = courses.flatMap(course =>
  course.topics.flatMap(topic => [
    topic.title, // topic title
    ...topic.subtopics.map(sub => sub.title) // all subtopic titles
  ])
);

  console.log(topicTitles);   
  return (
    <>
    <div className="pt-20 bg-gradient-to-b from-[#323233] to-[#000000] flex justify-center items-center py-16 px-4 md:px-0 ">
      <div className="w-full max-w-4xl text-center">
        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Upgrade Your Skills. Transform Your{" "}
          <span className="text-[#fe595e]">Future!</span>
        </h1>

        {/* Search Box */}
        <div className="relative mt-4 w-full max-w-full px-4 sm:px-0">
  {/* Search Box */}
  <div className="flex items-center border border-[#a1a1a1] rounded-full px-3 py-2 bg-[#1a1a1a] w-full">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="What do you want to learn today?"
      className="flex-1 bg-transparent text-white placeholder-[#a1a1a1] focus:outline-none px-2 py-1 text-sm sm:text-base"
    />
    <Search className="text-white w-5 h-5" />
  </div>

  {/* Suggestions Dropdown */}
  {search.length > 0 && (
    <div className="absolute left-0 right-0 mt-1 bg-[#111] border border-[#333] rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 text-sm sm:text-base">
      {suggestions.length === 0 && (
        <p className="p-2 sm:p-3 text-white">No results found</p>
      )}
      {suggestions.map((item, i) => (
        <button
          key={i}
          onClick={() => handleSelect(item)}
          className="w-full text-left p-2 sm:p-3 hover:bg-[#222] border-b border-[#333] text-white"
        >
          {item.label}
        </button>
      ))}
    </div>
  )}
</div>

    
      </div>
    </div>
                    <h1 className='text-2xl text-center text-white font-bold  mt-9'>Explore All Topics</h1>

<div className=" p-10 flex flex-wrap gap-2 justify-center h-170 ">
  {topicTitles.map((data, inx) => (
    <div
      key={inx}
      className="bg-[#171717] border border-[#222323] rounded-3xl py-2 px-4 flex items-center justify-center w-auto"
    >
      <p className="text-sm text-[#a1a1a1]">{data}</p>
    </div>
  ))}
</div>

    </>
  );
}

export default HeroPage;
