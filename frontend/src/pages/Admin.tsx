import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog, deleteBlog, getBlogs } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Trash2, LogOut, Plus, X } from 'lucide-react';
import { getPageContent, updateSectionContent } from '@/services/contentApi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper to manage array fields
const HomeContentEditor = ({ section = 'hero' }: { section?: string }) => {
    const [content, setContent] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchContent();
    }, [section]);

    const fetchContent = async () => {
        const data = await getPageContent('home');
        if (data && data[section]) {
            setContent(data[section]);
        } else {
            // Default initialization based on section
            if (section === 'stats') {
                setContent({ items: [] });
            } else if (section === 'features') {
                setContent({ items: [] });
            } else if (section === 'statsBar') {
                setContent({ items: [] });
            } else if (section === 'benefits') {
                setContent({ title: '', items: [] });
            } else if (section === 'dontDelay') {
                setContent({ title: '', items: [] });
            } else if (section === 'whyChooseUs') {
                setContent({ title: '', items: [] });
            } else if (section === 'cost') {
                setContent({ title: '', items: [] });
            } else if (section === 'comparison') {
                setContent({ items: [] });
            } else if (section === 'info') {
                setContent({
                    whatIsTitle: '', whatIsText: '',
                    whenToConsultTitle: '', whenToConsultItems: [],
                    reasonsTitle: '', reasonsItems: []
                });
            } else if (section === 'faq') {
                setContent({ items: [] });
            } else if (section === 'journey') {
                setContent({ items: [] });
            } else {
                setContent({});
            }
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateSectionContent('home', section, content);
            alert('Content updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Failed to update content.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: string, value: any) => {
        setContent((prev: any) => ({ ...prev, [key]: value }));
    };

    const handleArrayChange = (index: number, field: string, value: any) => {
        const newItems = [...(content.items || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        handleChange('items', newItems);
    };

    const addItem = () => {
        const newItems = [...(content.items || []), {}];
        handleChange('items', newItems);
    };

    const removeItem = (index: number) => {
        const newItems = [...(content.items || [])];
        newItems.splice(index, 1);
        handleChange('items', newItems);
    };

    if (!content) return <div>Loading...</div>;

    return (
        <div className="space-y-4">
            {section === 'hero' && (
                <>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hero Heading (HTML allowed)</label>
                        <Input
                            placeholder="Heading"
                            value={content.heading || ''}
                            onChange={(e) => handleChange('heading', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Hero Subheading</label>
                        <Textarea
                            placeholder="Subheading"
                            value={content.subheading || ''}
                            onChange={(e) => handleChange('subheading', e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Trust Badge Text</label>
                        <Input
                            placeholder="Trusted by..."
                            value={content.trustBadge || ''}
                            onChange={(e) => handleChange('trustBadge', e.target.value)}
                        />
                    </div>
                </>
            )}

            {section === 'stats' && (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Manage the 3 stats displayed in the Hero section.</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <Input
                                    placeholder="Text (e.g., 10+ Years)"
                                    value={item.text || ''}
                                    onChange={(e) => handleArrayChange(index, 'text', e.target.value)}
                                />
                                <Input
                                    placeholder="Subtext (e.g., Experience)"
                                    value={item.subtext || ''}
                                    onChange={(e) => handleArrayChange(index, 'subtext', e.target.value)}
                                />
                                <Input
                                    placeholder="Icon Name (Award, CheckCircle2, Shield)"
                                    value={item.icon || ''}
                                    onChange={(e) => handleArrayChange(index, 'icon', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Stat
                    </Button>
                </div>
            )}

            {section === 'features' && (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Manage the 4 key features. Styling (colors) is tied to the position (1-4).</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <Textarea
                                    placeholder="Title (Use <br/> for line breaks)"
                                    value={item.title || ''}
                                    onChange={(e) => handleArrayChange(index, 'title', e.target.value)}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <Input
                                        placeholder="Icon Name (ShieldCheck, Feather...)"
                                        value={item.icon || ''}
                                        onChange={(e) => handleArrayChange(index, 'icon', e.target.value)}
                                    />
                                    <Input
                                        placeholder="Badge/Overlay (Optional)"
                                        value={item.badge || item.overlayText || ''}
                                        onChange={(e) => {
                                            if (index === 3) handleArrayChange(index, 'overlayText', e.target.value);
                                            else handleArrayChange(index, 'badge', e.target.value);
                                        }}
                                    />
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Feature
                    </Button>
                </div>
            )}

            {section === 'statsBar' && (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Manage the global stats bar (e.g., Happy Patients, Hospitals).</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <Input
                                    placeholder="Number (e.g., 2000+)"
                                    value={item.number || ''}
                                    onChange={(e) => handleArrayChange(index, 'number', e.target.value)}
                                />
                                <Input
                                    placeholder="Label (e.g., HAPPY PATIENTS)"
                                    value={item.label || ''}
                                    onChange={(e) => handleArrayChange(index, 'label', e.target.value)}
                                />
                                <Input
                                    placeholder="Icon Name (Users, Building, MapPin)"
                                    value={item.icon || ''}
                                    onChange={(e) => handleArrayChange(index, 'icon', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Stat
                    </Button>
                </div>
            )}

            {section === 'benefits' && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                            placeholder="Benefits of Laser Circumcision"
                            value={content.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">Manage the benefits list.</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <Input
                                    placeholder="Title (Most Advanced Technology)"
                                    value={item.title || ''}
                                    onChange={(e) => handleArrayChange(index, 'title', e.target.value)}
                                />
                                <Input
                                    placeholder="Icon Name (Zap, Eye, Clock, Home)"
                                    value={item.icon || ''}
                                    onChange={(e) => handleArrayChange(index, 'icon', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Benefit
                    </Button>
                </div>
            )}

            {section === 'dontDelay' && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                            placeholder="Don't Delay Laser Circumcision Treatment"
                            value={content.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">Manage the checklist items.</p>
                    {(content.items || []).map((item: string, index: number) => (
                        <div key={index} className="flex gap-2 items-center border p-2 rounded">
                            <Input
                                placeholder="Item Item..."
                                value={item || ''}
                                onChange={(e) => {
                                    const newItems = [...(content.items || [])];
                                    newItems[index] = e.target.value;
                                    handleChange('items', newItems);
                                }}
                            />
                            <Button variant="ghost" size="icon" onClick={() => {
                                const newItems = [...(content.items || [])];
                                newItems.splice(index, 1);
                                handleChange('items', newItems);
                            }}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => {
                        const newItems = [...(content.items || []), ""];
                        handleChange('items', newItems);
                    }} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Item
                    </Button>
                </div>
            )}

            {section === 'whyChooseUs' && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                            placeholder="Why Circumcare?"
                            value={content.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">Manage the reasons.</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <Input
                                    placeholder="Text"
                                    value={item.text || ''}
                                    onChange={(e) => handleArrayChange(index, 'text', e.target.value)}
                                />
                                <Input
                                    placeholder="Icon Name (ShieldCheck, FileText, Car, HeartPulse)"
                                    value={item.icon || ''}
                                    onChange={(e) => handleArrayChange(index, 'icon', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Reason
                    </Button>
                </div>
            )}

            {section === 'cost' && (
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Section Title</label>
                        <Input
                            placeholder="Cost of Circumcision Depends on:"
                            value={content.title || ''}
                            onChange={(e) => handleChange('title', e.target.value)}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground">Manage the cost factors.</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <Input
                                    placeholder="Text"
                                    value={item.text || ''}
                                    onChange={(e) => handleArrayChange(index, 'text', e.target.value)}
                                />
                                <Input
                                    placeholder="Icon Name (DollarSign, Activity, Stethoscope, UserCheck)"
                                    value={item.icon || ''}
                                    onChange={(e) => handleArrayChange(index, 'icon', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Factor
                    </Button>
                </div>
            )}

            {section === 'comparison' && (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Manage the comparison table rows.</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1 grid-cols-1 md:grid-cols-3">
                                <Input
                                    placeholder="Aspect (e.g., Pain)"
                                    value={item.aspect || ''}
                                    onChange={(e) => handleArrayChange(index, 'aspect', e.target.value)}
                                />
                                <Input
                                    placeholder="Conventional (e.g., High)"
                                    value={item.conventional || ''}
                                    onChange={(e) => handleArrayChange(index, 'conventional', e.target.value)}
                                />
                                <Input
                                    placeholder="Laser (e.g., Low)"
                                    value={item.laser || ''}
                                    onChange={(e) => handleArrayChange(index, 'laser', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Row
                    </Button>
                </div>
            )}

            {section === 'info' && (
                <div className="space-y-6">
                    <div className="space-y-2 border p-2 rounded">
                        <h3 className="font-bold">What is Circumcision?</h3>
                        <Input
                            placeholder="Title"
                            value={content.whatIsTitle || ''}
                            onChange={(e) => handleChange('whatIsTitle', e.target.value)}
                        />
                        <Textarea
                            placeholder="Description..."
                            value={content.whatIsText || ''}
                            onChange={(e) => handleChange('whatIsText', e.target.value)}
                        />
                    </div>

                    <div className="space-y-2 border p-2 rounded">
                        <h3 className="font-bold">When to Consult?</h3>
                        <Input
                            placeholder="Title"
                            value={content.whenToConsultTitle || ''}
                            onChange={(e) => handleChange('whenToConsultTitle', e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">List Items:</p>
                        {(content.whenToConsultItems || []).map((item: string, index: number) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={item || ''}
                                    onChange={(e) => {
                                        const newItems = [...(content.whenToConsultItems || [])];
                                        newItems[index] = e.target.value;
                                        handleChange('whenToConsultItems', newItems);
                                    }}
                                />
                                <Button variant="ghost" size="icon" onClick={() => {
                                    const newItems = [...(content.whenToConsultItems || [])];
                                    newItems.splice(index, 1);
                                    handleChange('whenToConsultItems', newItems);
                                }}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => {
                            const newItems = [...(content.whenToConsultItems || []), ""];
                            handleChange('whenToConsultItems', newItems);
                        }}> Add Item </Button>
                    </div>

                    <div className="space-y-2 border p-2 rounded">
                        <h3 className="font-bold">Reasons to do?</h3>
                        <Input
                            placeholder="Title"
                            value={content.reasonsTitle || ''}
                            onChange={(e) => handleChange('reasonsTitle', e.target.value)}
                        />
                        <p className="text-xs text-muted-foreground">List Items:</p>
                        {(content.reasonsItems || []).map((item: string, index: number) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    value={item || ''}
                                    onChange={(e) => {
                                        const newItems = [...(content.reasonsItems || [])];
                                        newItems[index] = e.target.value;
                                        handleChange('reasonsItems', newItems);
                                    }}
                                />
                                <Button variant="ghost" size="icon" onClick={() => {
                                    const newItems = [...(content.reasonsItems || [])];
                                    newItems.splice(index, 1);
                                    handleChange('reasonsItems', newItems);
                                }}>
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={() => {
                            const newItems = [...(content.reasonsItems || []), ""];
                            handleChange('reasonsItems', newItems);
                        }}> Add Item </Button>
                    </div>
                </div>
            )}

            {section === 'faq' && (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Manage FAQs.</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <Input
                                    placeholder="Question"
                                    value={item.q || ''}
                                    onChange={(e) => handleArrayChange(index, 'q', e.target.value)}
                                />
                                <Textarea
                                    placeholder="Answer"
                                    value={item.a || ''}
                                    onChange={(e) => handleArrayChange(index, 'a', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add FAQ
                    </Button>
                </div>
            )}

            {section === 'journey' && (
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">Manage Patient Journey Steps.</p>
                    {(content.items || []).map((item: any, index: number) => (
                        <div key={index} className="flex gap-2 items-start border p-2 rounded">
                            <div className="grid gap-2 flex-1">
                                <div className="flex gap-2">
                                    <Input
                                        className="w-20"
                                        placeholder="Step #"
                                        type="number"
                                        value={item.step || ''}
                                        onChange={(e) => handleArrayChange(index, 'step', parseInt(e.target.value))}
                                    />
                                    <Input
                                        placeholder="Title (e.g., Consultation)"
                                        value={item.title || ''}
                                        onChange={(e) => handleArrayChange(index, 'title', e.target.value)}
                                    />
                                </div>
                                <Input
                                    placeholder="Description"
                                    value={item.desc || ''}
                                    onChange={(e) => handleArrayChange(index, 'desc', e.target.value)}
                                />
                                <Input
                                    placeholder="Icon Name (PiStethoscopeDuotone...)"
                                    value={item.icon || ''}
                                    onChange={(e) => handleArrayChange(index, 'icon', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeItem(index)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={addItem} className="gap-2">
                        <Plus className="w-4 h-4" /> Add Step
                    </Button>
                </div>
            )}

            <Button onClick={handleSave} disabled={loading} className="w-full">
                {loading ? 'Saving...' : 'Save Content'}
            </Button>
        </div>
    );
};

const Admin = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image: '',
        author: 'Admin',
        slug: '',
        metaDescription: '',
        tags: ''
    });
    const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate();

    // Basic Auth Check
    useEffect(() => {
        const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
        if (!isAuthenticated) {
            navigate("/login");
        }
        fetchBlogs();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("isAdminAuthenticated");
        navigate("/login");
    };

    const fetchBlogs = async () => {
        const data = await getBlogs();
        setBlogs(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.content) return;
        const blogData = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim())
        };
        await createBlog(blogData);
        setFormData({
            title: '',
            content: '',
            image: '',
            author: 'Admin',
            slug: '',
            metaDescription: '',
            tags: ''
        });
        fetchBlogs();
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            await deleteBlog(id);
            fetchBlogs();
        }
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-heading font-bold">Admin Panel</h1>
                <Button variant="outline" onClick={handleLogout} className="gap-2 text-destructive border-destructive hover:bg-destructive hover:text-white">
                    <LogOut className="w-4 h-4" />
                    Logout
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Create Post Form */}
                <div className="bg-white p-6 rounded-xl shadow-md border border-border h-fit">
                    <h2 className="text-xl font-bold mb-4">Edit Home Page Content</h2>
                    <Tabs defaultValue="hero" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 mb-4 h-auto gap-2">
                            <TabsTrigger value="hero">Hero</TabsTrigger>
                            <TabsTrigger value="stats">Hero Stats</TabsTrigger>
                            <TabsTrigger value="features">Features</TabsTrigger>
                            <TabsTrigger value="statsBar">Global Stats</TabsTrigger>
                            <TabsTrigger value="benefits">Benefits</TabsTrigger>
                            <TabsTrigger value="dontDelay">Don't Delay</TabsTrigger>
                            <TabsTrigger value="whyChooseUs">Why Choose Us</TabsTrigger>
                            <TabsTrigger value="cost">Cost</TabsTrigger>
                            <TabsTrigger value="comparison">Comparison</TabsTrigger>
                            <TabsTrigger value="info">Info</TabsTrigger>
                            <TabsTrigger value="faq">FAQ</TabsTrigger>
                            <TabsTrigger value="journey">Patient Journey</TabsTrigger>
                        </TabsList>
                        <TabsContent value="hero">
                            <HomeContentEditor section="hero" />
                        </TabsContent>
                        <TabsContent value="stats">
                            <HomeContentEditor section="stats" />
                        </TabsContent>
                        <TabsContent value="features">
                            <HomeContentEditor section="features" />
                        </TabsContent>
                        <TabsContent value="statsBar">
                            <HomeContentEditor section="statsBar" />
                        </TabsContent>
                        <TabsContent value="benefits">
                            <HomeContentEditor section="benefits" />
                        </TabsContent>
                        <TabsContent value="dontDelay">
                            <HomeContentEditor section="dontDelay" />
                        </TabsContent>
                        <TabsContent value="whyChooseUs">
                            <HomeContentEditor section="whyChooseUs" />
                        </TabsContent>
                        <TabsContent value="cost">
                            <HomeContentEditor section="cost" />
                        </TabsContent>
                        <TabsContent value="comparison">
                            <HomeContentEditor section="comparison" />
                        </TabsContent>
                        <TabsContent value="info">
                            <HomeContentEditor section="info" />
                        </TabsContent>
                        <TabsContent value="faq">
                            <HomeContentEditor section="faq" />
                        </TabsContent>
                        <TabsContent value="journey">
                            <HomeContentEditor section="journey" />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md border border-border h-fit">
                    <h2 className="text-xl font-bold mb-4">Create New Post</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Image (Upload File OR Enter URL)</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                            />
                            <div className="text-center text-xs text-muted-foreground">- OR -</div>
                            <Input
                                placeholder="Image URL (Optional)"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            />
                        </div>
                        <Input
                            placeholder="Author"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        />
                        <Input
                            placeholder="Slug (URL Friendly) e.g., benefit-of-circumcision"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        />
                        <Input
                            placeholder="Meta Description (SEO)"
                            value={formData.metaDescription}
                            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        />
                        <Input
                            placeholder="Tags (Comma separated) e.g., health, care"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        />
                        <Textarea
                            placeholder="Content"
                            className="min-h-[150px]"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        />
                        <Button type="submit" className="w-full">Publish Post</Button>
                    </form>
                </div>

                {/* Existing Posts List */}
                <div className="space-y-4 lg:col-span-2">
                    <h2 className="text-xl font-bold mb-4">Existing Posts</h2>
                    {blogs.map((blog) => (
                        <div key={blog._id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-border shadow-sm">
                            <div>
                                <h3 className="font-bold">{blog.title}</h3>
                                <p className="text-xs text-muted-foreground">{new Date(blog.date).toLocaleDateString()}</p>
                            </div>
                            <Button variant="destructive" size="icon" onClick={() => handleDelete(blog._id)}>
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {blogs.length === 0 && <p className="text-muted-foreground">No posts yet.</p>}
                </div>
            </div>
        </div>
    );
};

export default Admin;
