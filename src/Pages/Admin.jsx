import React, { useState } from 'react';
import UserData from "../data/users.json";

function Admin() {
    const [users] = useState(UserData?.users || []);
    const [loading] = useState(false);
    const [error] = useState(null);

    if (loading) return <div className="text-white p-5">Loading...</div>;
    if (error) return <div className="text-red-500 p-5">Error: {error}</div>;
    if (users.length === 0) return <div className="text-white p-5">No users found</div>;

    return (
        <>
            {/* Summary Cards */}
            <div className="w-full bg-[#0a0a0a] text-white flex justify-center pt-9 px-4">
                <div className="w-full max-w-6xl flex flex-wrap justify-between gap-4">
                    <div className="bg-[#171717] flex-1 min-w-[200px] h-40 border border-[#222323] rounded-lg p-5">
                        <p className='text-lg text-[#a1a1a1]'>Total Users</p>
                        <h1 className='text-5xl font-bold'>{users.length}</h1>
                    </div>

                    <div className="bg-[#171717] flex-1 min-w-[200px] h-40 border border-[#222323] rounded-lg p-5">
                        <p className='text-sm text-[#a1a1a1]'>Total Students</p>
                        <h1 className='text-xl font-bold'>{users.filter(u => u.role === 'student').length}</h1>
                    </div>

                    <div className="bg-[#171717] flex-1 min-w-[200px] h-40 border border-[#222323] rounded-lg p-5">
                        <p className='text-sm text-[#a1a1a1]'>Total Teachers</p>
                        <h1 className='text-xl font-bold'>{users.filter(u => u.role === 'teacher').length}</h1>
                    </div>

                    <div className="bg-[#171717] flex-1 min-w-[200px] h-40 border border-[#222323] rounded-lg p-5">
                        <p className='text-sm text-[#a1a1a1]'>Users Without Courses</p>
                        <h1 className='text-xl font-bold'>{users.filter(u => !u.enrolledCourses || u.enrolledCourses.length === 0).length}</h1>
                        <p className='text-sm text-[#a1a1a1] mt-2'>Users With Courses</p>
                        <h1 className='text-xl font-bold'>{users.length - users.filter(u => !u.enrolledCourses || u.enrolledCourses.length === 0).length}</h1>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className='flex flex-col items-center bg-[#0a0a0a] min-h-screen py-8 px-4 mb-0'>
                <h1 className='text-2xl text-white font-bold mb-6'>All Users info</h1>

                {users.map((user) => (
                    <div
                        key={user.id}
                        className="w-full max-w-6xl bg-[#262626] border border-[#2e2e2e] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between px-4 py-4 mb-4 gap-4"
                    >
                        {/* User ID */}
                        <p className="w-full sm:w-6 text-center text-white">{user.id}</p>

                        {/* Name & Email */}
                        <div className="flex flex-col text-sm w-full sm:w-[35%] text-white">
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>

                        {/* Role */}
                        <div className="flex items-center justify-center text-sm bg-white text-black p-1 px-4 rounded-full w-full sm:w-auto">
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </div>

                        {/* Authored Courses */}
                        {user.role === "teacher" && (
                            <div className="text-sm text-white mt-2 sm:mt-0">
                                Authored Courses: {user.authoredCourses?.length || 0}
                            </div>
                        )}

                        {/* Enrolled Courses */}
                        {user.role === "student" && (
                            <div className="flex flex-col gap-2 text-sm mt-2 sm:mt-0">
                                {user.enrolledCourses && user.enrolledCourses.length > 0 ? (
                                    user.enrolledCourses.map((courseId) => (
                                        <div
                                            key={courseId}
                                            className="bg-[#333] ml-6 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1"
                                        >
                                            <span>Course {courseId}:</span>
                                            <span>{(user.progress[courseId] * 100).toFixed(0)}%</span>
                                        </div>
                                    ))
                                ) : (
                                    <span className='text-white'>No course enrolled</span>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
        </>
    );
}

export default Admin;
