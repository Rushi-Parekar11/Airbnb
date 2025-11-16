import React, { useState } from "react";
import coursesJson from "../data/courses.json";
import { ChevronRight, ChevronDown } from "lucide-react";
import HeroPage from "./HeroPage";

const courses = coursesJson.courses;

export default function Home() {
  const [openCourse, setOpenCourse] = useState(null);
  const [openTopic, setOpenTopic] = useState(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [search, setSearch] = useState("");

  // BUILD SEARCH SUGGESTIONS
  const suggestions = [];
  courses.forEach((course, cIndex) => {
    if (course.title.toLowerCase().includes(search.toLowerCase())) {
      suggestions.push({ type: "course", course, cIndex, label: course.title });
    }

    course.topics.forEach((topic, tIndex) => {
      if (topic.title.toLowerCase().includes(search.toLowerCase())) {
        suggestions.push({
          type: "topic",
          course,
          topic,
          cIndex,
          tIndex,
          label: `${course.title} → ${topic.title}`,
        });
      }

      topic.subtopics.forEach((sub, sIndex) => {
        if (sub.title.toLowerCase().includes(search.toLowerCase())) {
          suggestions.push({
            type: "sub",
            course,
            topic,
            sub,
            cIndex,
            tIndex,
            sIndex,
            label: `${course.title} → ${topic.title} → ${sub.title}`,
          });
        }
      });
    });
  });

  // HANDLE SELECTION FROM SEARCH
  const handleSelect = (item) => {
    setSearch("");
    setShowSidebar(false);

    setOpenCourse(item.cIndex ?? null);
    setOpenTopic(item.tIndex ?? null);

    if (item.type === "sub") {
      setSelectedSubtopic(item.sub);
    } else {
      setSelectedSubtopic(null);
    }
  };

  return (
    <>

      {/* BREADCRUMBS */}
      <nav className="border border-[#222323] h-8 w-full bg-[#0a0a0a] flex items-center px-6 text-[#a1a1a1] text-[12px]">
        <div className="flex items-center">
          <span className="cursor-pointer hover:text-[#fe595e]">Home</span>

          {/* CHECK COURSE EXISTS */}
          {openCourse !== null && courses[openCourse] && (
            <>
              <ChevronRight className="h-3" />
              <span className="cursor-pointer hover:text-[#fe595e]">
                {courses[openCourse]?.title}
              </span>
            </>
          )}

          {/* CHECK TOPIC EXISTS */}
          {openCourse !== null &&
            openTopic !== null &&
            courses[openCourse]?.topics?.[openTopic] && (
              <>
                <ChevronRight className="h-3" />
                <span className="cursor-pointer hover:text-[#fe595e]">
                  {courses[openCourse]?.topics?.[openTopic]?.title}
                </span>
              </>
            )}

          {/* CHECK SUBTOPIC */}
          {selectedSubtopic && (
            <>
              <ChevronRight className="h-3" />
              <span className="text-[#fe595e] font-semibold">
                {selectedSubtopic.title}
              </span>
            </>
          )}
        </div>
      </nav>

      {/* MAIN LAYOUT */}
      <div className="bg-[#0a0a0a] h-screen flex flex-col">
        {/* MOBILE HAMBURGER */}
        <button
          className="md:hidden p-3 text-white bg-[#222222] rounded shadow fixed top-2 left-4 z-50"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <div className="space-y-1">
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </div>
        </button>

        <div className="flex flex-1 text-white">
          {/* LEFT SIDEBAR */}
          <div
            className={`fixed md:static top-0 left-0 h-full w-72 bg-black border-r border-[#222323] p-4 z-40
                        transform transition-transform duration-300
                        ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                      `}
          >
            <div
              className="flex items-center justify-center w-full p-3 bg-[#222222] border border-[#ababab] text-white rounded font-semibold mb-4 cursor-pointer"
              onClick={() => window.location.reload()}
            >
              All sources
            </div>

            {/* COURSES */}
            {courses.map((course, cIndex) => (
              <div key={cIndex} className="mb-4">
                <button
                  onClick={() =>
                    setOpenCourse(openCourse === cIndex ? null : cIndex)
                  }
                  className="flex items-center justify-between w-full p-3 bg-black border-b border-[#222323] hover:bg-[#212121] font-semibold"
                >
                  {course.title}
                  {openCourse === cIndex ? <ChevronDown /> : <ChevronRight />}
                </button>

                {openCourse === cIndex && (
                  <div className="ml-3 mt-2 space-y-2">
                    {course.topics?.map((topic, tIndex) => (
                      <div key={tIndex}>
                        <button
                          onClick={() =>
                            setOpenTopic(openTopic === tIndex ? null : tIndex)
                          }
                          className="flex items-center justify-between w-full p-2 bg-[#212121] border-b border-[#222323] rounded font-medium"
                        >
                          {topic.title}
                          {openTopic === tIndex ? (
                            <ChevronDown />
                          ) : (
                            <ChevronRight />
                          )}
                        </button>

                        {openTopic === tIndex && (
                          <div className="ml-4 mt-2 space-y-1 border-l border-[#222323] pl-3">
                            {topic.subtopics?.map((sub, sIndex) => (
                              <button
                                key={sIndex}
                                onClick={() => {
                                  setSelectedSubtopic(sub);
                                  setShowSidebar(false);
                                }}
                                className={`block w-full text-left p-2 rounded hover:bg-[#212121] ${
                                  selectedSubtopic?.title === sub.title
                                    ? "bg-[#222323] font-semibold"
                                    : "bg-black"
                                }`}
                              >
                                {sub.title}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* MOBILE OVERLAY */}
          {showSidebar && (
            <div
              className="fixed inset-0 bg-black bg-opacity-40 md:hidden z-30"
              onClick={() => setShowSidebar(false)}
            ></div>
          )}

          {/* RIGHT CONTENT */}
          <div className="flex-1 overflow-y-auto bg-black">
            {selectedSubtopic ? (
              <div className="bg-[#222222] p-6 rounded-xl border border-[#ababab]">
                <div className="text-2xl font-bold text-white mb-9">
                  {selectedSubtopic.title}
                </div>
                <p className="text-gray-300 whitespace-pre-line">
                  {selectedSubtopic.content}
                </p>
              </div>
            ) : (
              <HeroPage
                search={search}
                setSearch={setSearch}
                suggestions={suggestions}
                handleSelect={handleSelect}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
