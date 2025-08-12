import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPaginatedPosts } from "../api/postsApi";

export default function PaginatedPosts() {
    const [page, setPage] = useState(1);

    const { data, isLoading, isError, error, isFetching } = useQuery({
        queryKey: ["paginatedPosts", page],
        queryFn: () => fetchPaginatedPosts(page),
        keepPreviousData: true,
    });

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>📄 Paginated Posts</h2>
            {data.map((post) => (
                <p key={post.id}>
                    <strong>{post.id}.</strong> {post.title}
                </p>
            ))}

            <div style={{ marginTop: "10px" }}>
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span style={{ margin: "0 10px" }}>Page {page}</span>
                <button
                    onClick={() => setPage((old) => old + 1)}
                    disabled={data.length < 10}
                >
                    Next
                </button>
            </div>

            {isFetching && <p>Loading new page...</p>}
        </div>
    );
}
