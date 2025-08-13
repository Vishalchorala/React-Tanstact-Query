import React, { useRef, useEffect } from "react";
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
        staleTime: 1000,
        getNextPageParam: (lastPage, pages) =>
            lastPage.length === 10 ? pages.length + 1 : undefined,
    });

    const loaderRef = useRef(null);

    // Intersection Observer to auto-load when bottom comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        };
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    if (status === "loading")
        return (
            <p className="flex justify-center items-center h-screen max-w-7xl mx-auto text-4xl">
                Loading...
            </p>
        );
    if (status === "error")
        return (
            <p className="flex justify-center items-center h-screen max-w-7xl mx-auto text-4xl">
                Error: {error.message}
            </p>
        );

    return (
        <div className="max-w-4xl mx-auto my-10 px-4">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                📄 <span>Infinite Scroll Posts</span>
            </h2>

            <div className="space-y-16">
                {data?.pages?.map((page, i) => (
                    <div key={i}>
                        {page.map((post) => (
                            <p key={post.id} className="text-gray-800 my-6">
                                <strong className="text-blue-600">{post.id}.</strong> {post.title}
                            </p>
                        ))}
                    </div>
                ))}
            </div>

            <div ref={loaderRef} className="h-10"></div>

            {isFetchingNextPage && (
                <p className="text-center text-gray-500 mt-4 text-3xl">Loading more...</p>
            )}
        </div>
    );
}
