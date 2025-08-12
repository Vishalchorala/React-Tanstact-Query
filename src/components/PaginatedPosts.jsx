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

    if (isLoading) return <p className="flex justify-center items-center h-screen max-w-7xl mx-auto text-4xl">Loading...</p>;
    if (isError) return <p className="flex justify-center items-center h-screen max-w-7xl mx-auto text-4xl">Error: {error.message}</p>;

    return (
        // <div>
        //     <h2>📄 Paginated Posts</h2>
        //     {data.map((post) => (
        //         <p key={post.id}>
        //             <strong>{post.id}.</strong> {post.title}
        //         </p>
        //     ))}

        //     <div style={{ marginTop: "10px" }}>
        //         <button
        //             onClick={() => setPage((old) => Math.max(old - 1, 1))}
        //             disabled={page === 1}
        //         >
        //             Previous
        //         </button>
        //         <span style={{ margin: "0 10px" }}>Page {page}</span>
        //         <button
        //             onClick={() => setPage((old) => old + 1)}
        //             disabled={data.length < 10}
        //         >
        //             Next
        //         </button>
        //     </div>

        //     {isFetching && <p>Loading new page...</p>}
        // </div>



        <div className="max-w-7xl mx-auto my-10 px-4">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                📄 <span>Paginated Posts</span>
            </h2>

            <div className="space-y-4">
                {data.map((post) => (
                    <p key={post.id} className="text-gray-800">
                        <strong className="text-blue-600">{post.id}.</strong> {post.title}
                    </p>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
                <button
                    onClick={() => setPage((old) => Math.max(old - 1, 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Previous
                </button>

                <span className="text-gray-700 font-medium">Page {page}</span>

                <button
                    onClick={() => setPage((old) => old + 1)}
                    disabled={data.length < 10}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>

            {isFetching && <p className="mt-4 text-blue-500">Loading new page...</p>}
        </div>

    );
}
