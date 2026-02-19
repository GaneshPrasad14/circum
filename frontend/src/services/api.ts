export const API_URL = 'http://localhost:7002/api/blogs';

export const getBlogs = async () => {
    const response = await fetch(API_URL);
    return response.json();
};

export const getBlogBySlug = async (slug: string) => {
    const response = await fetch(`${API_URL}/${slug}`);
    return response.json();
};

export const createBlog = async (blogData: any) => {
    const isFormData = blogData instanceof FormData;

    const headers: HeadersInit = isFormData
        ? {}
        : { 'Content-Type': 'application/json' };

    const body = isFormData ? blogData : JSON.stringify(blogData);

    const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body,
    });
    return response.json();
};

export const deleteBlog = async (id: string) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return response.json();
};
