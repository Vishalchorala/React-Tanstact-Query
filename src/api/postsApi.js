// src/api/postsApi.js
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/posts";

// Basic fetch
export const fetchPosts = async () => {
    const res = await axios.get(API_URL);
    return res.data;
};

// Pagination fetch
export const fetchPaginatedPosts = async (page = 1) => {
    const res = await axios.get(API_URL, {
        params: { _page: page, _limit: 10 },
    });
    return res.data;
};

// Infinite scroll fetch
export const fetchInfinitePosts = async ({ pageParam = 1 }) => {
    const res = await axios.get(API_URL, {
        params: { _page: pageParam, _limit: 10 },
    });
    return res.data;
};
