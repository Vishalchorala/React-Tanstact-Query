import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/postsApi";

export default function FetchPosts() {
    const { data, error, isLoading, isError } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>📄 All Posts</h2>
            {data.slice(0, 10).map((post) => (
                <p key={post.id}>
                    <strong>{post.id}.</strong> {post.title}
                </p>
            ))}
        </div>
    );
}
