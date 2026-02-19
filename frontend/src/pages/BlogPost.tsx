import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getBlogBySlug } from '@/services/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';

const BlogPost = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!slug) return;
            try {
                const data = await getBlogBySlug(slug);
                setBlog(data);
            } catch (error) {
                console.error("Failed to fetch blog", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
    }, [slug]);

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="h-4 w-32 bg-gray-200 rounded mb-4"></div>
                    <div className="h-2 w-24 bg-gray-200 rounded"></div>
                </div>
            </div>
            <Footer />
        </div>
    );

    if (!blog) return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-2xl font-bold mb-4">Post not found</h2>
                <Button asChild>
                    <Link to="/blog">Return to Blog</Link>
                </Button>
            </div>
            <Footer />
        </div>
    );

    return (
        <div className="min-h-screen bg-background font-sans">
            <Helmet>
                <title>{blog.title} | Gentle Care</title>
                <meta name="description" content={blog.metaDescription} />
                <meta name="keywords" content={blog.tags?.join(', ')} />
                {/* Facebok / Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={blog.title} />
                <meta property="og:description" content={blog.metaDescription} />
                <meta property="og:image" content={blog.image} />
            </Helmet>

            <Header />

            <main>
                {/* Hero / Header Section */}
                <section className="bg-primary/5 py-12 md:py-20">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <Link to="/blog" className="inline-flex items-center text-primary font-medium mb-8 hover:underline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Articles
                        </Link>

                        <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {blog.tags?.map((tag: string, index: number) => (
                                <span key={index} className="bg-white border border-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-foreground leading-tight">
                            {blog.title}
                        </h1>

                        <div className="flex items-center justify-center gap-6 text-muted-foreground text-sm md:text-base">
                            <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                <span className="font-medium text-foreground">{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <article className="container mx-auto px-4 max-w-4xl -mt-8 relative z-10 pb-20">
                    {blog.image && (
                        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 aspect-video bg-gray-100">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://placehold.co/1200x600?text=No+Image'; // Fallback
                                }}
                            />
                        </div>
                    )}

                    <div className="prose prose-lg md:prose-xl max-w-none prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-img:rounded-xl">
                        {blog.content.split('\n').map((paragraph: string, idx: number) => (
                            <p key={idx} className="mb-4">{paragraph}</p>
                        ))}
                    </div>

                    {/* Share & Footer of Article */}
                    <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
                        <div className="text-muted-foreground font-medium">
                            Share this article:
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" size="icon" className="rounded-full" onClick={() => navigator.share?.({ title: blog.title, url: window.location.href })}>
                                <Share2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
};

export default BlogPost;
