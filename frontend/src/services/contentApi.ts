const API_URL = 'http://localhost:7002/api/content';

export const getPageContent = async (page: string) => {
    try {
        const response = await fetch(`${API_URL}/${page}`);
        if (!response.ok) {
            throw new Error('Failed to fetch content');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching page content:', error);
        return null;
    }
};

export const updateSectionContent = async (page: string, section: string, content: any) => {
    try {
        const response = await fetch(`${API_URL}/${page}/${section}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        });
        if (!response.ok) {
            throw new Error('Failed to update content');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating section content:', error);
        throw error;
    }
};
