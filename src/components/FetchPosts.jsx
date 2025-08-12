import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/postsApi";

export default function FetchPosts() {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p className="flex justify-center items-center h-screen max-w-7xl mx-auto text-4xl">Loading...</p>;
    if (isError) return <p className="flex justify-center items-center h-screen max-w-7xl mx-auto text-4xl">Error: {error.message}</p>;

    return (
        // <div className="max-w-7xl mx-auto my-10">
        //     <h2>📄 All Posts</h2>
        //     {data.slice(0, 10).map((post) => (
        //         <p key={post.id}>
        //             <strong>{post.id}.</strong> {post.title}
        //         </p>
        //     ))}
        // </div>


        <div className="max-w-7xl mx-auto my-10 px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📄 <span>All Posts</span>
            </h2>
            <div className="space-y-4">
                {data.slice(0, 10).map((post) => (
                    <p key={post.id} className="text-gray-800">
                        <strong className="text-blue-600">{post.id}.</strong> {post.title}
                    </p>
                ))}
            </div>
        </div>

    );
}
