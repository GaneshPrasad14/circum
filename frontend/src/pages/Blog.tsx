import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogs } from '@/services/api';

const Blog = () => {
    const [blogs, setBlogs] = useState<any[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container mx-auto px-4 py-20">
                <h1 className="text-4xl font-heading font-bold text-center mb-12">Latest Articles</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <a href={`/blog/${blog.slug || blog._id}`} key={blog._id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-border hover:shadow-xl transition-all duration-300 block group">
                            {blog.image && (
                                <div className="overflow-hidden h-48">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=No+Image';
                                        }}
                                    />
                                </div>
                            )}
                            <div className="p-6">
                                <span className="text-xs font-bold text-primary uppercase tracking-wider">{new Date(blog.date).toLocaleDateString()}</span>
                                <h3 className="text-xl font-heading font-bold mt-2 mb-3 line-clamp-2 group-hover:text-primary transition-colors">{blog.title}</h3>
                                <p className="text-muted-foreground text-sm line-clamp-3 mb-4">{blog.content.substring(0, 100)}...</p>

                                {blog.tags && blog.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {blog.tags.slice(0, 3).map((tag: string, i: number) => (
                                            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">#{tag}</span>
                                        ))}
                                    </div>
                                )}

                                <span className="text-sm font-medium text-secondary">By {blog.author}</span>
                            </div>
                        </a>
                    ))}
                    {blogs.length === 0 && (
                        <p className="col-span-full text-center text-muted-foreground">No articles found.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Blog;
