import React from 'react'
import { Search } from 'lucide-react';

function HeroPage({ search, setSearch, suggestions, handleSelect }) {
    return (
        <>
            <div className="h-150 bg-gradient-to-b from-[#323233] to-[#000000] flex justify-center">
                <div className="p-25">

                    <h1 className="text-center text-2xl font-bold">
                        Upgrade Your Skills. Transform Your <span className="text-[#fe595e]">Future !</span>
                    </h1>


                    <div className="relative">

                        {/* INPUT BOX */}
                        <div className="border border-[#a1a1a1] w-150 flex items-center px-5 rounded-4xl mt-5">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="What do you want to learn today?"
                                className="text-[#a1a1a1] focus:outline-none focus:ring-0 focus:border-white p-4 w-140"
                            />
                            <Search />
                        </div>

                        {/* SEARCH SUGGESTIONS DROPDOWN */}
                        {search.length > 0 && (
                            <div className="absolute top-20 left-0 w-150 bg-[#111] border border-[#333] rounded shadow-lg z-50 max-h-60 overflow-y-auto">
                                {suggestions.length === 0 && (
                                    <p className="p-3 text-white">No results found</p>
                                )}

                                {suggestions.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSelect(item)}
                                        className="w-full text-left p-2 hover:bg-[#222] border-b border-[#333]"
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroPage;
