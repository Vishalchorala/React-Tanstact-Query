import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchInfinitePosts } from "../api/postsApi";

export default function InfinitePosts() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
        queryKey: ["infinitePosts"],
        queryFn: fetchInfinitePosts,
        getNextPageParam: (lastPage, pages) =>
            lastPage.length === 10 ? pages.length + 1 : undefined,
    });

    if (status === "loading") return <p>Loading...</p>;
    if (status === "error") return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>📄 Infinite Scroll Posts</h2>
            {data.pages.map((page, i) => (
                <React.Fragment key={i}>
                    {page.map((post) => (
                        <p key={post.id}>
                            <strong>{post.id}.</strong> {post.title}
                        </p>
                    ))}
                </React.Fragment>
            ))}
            <button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "Load More"
                        : "No More Posts"}
            </button>
        </div>
    );
}
