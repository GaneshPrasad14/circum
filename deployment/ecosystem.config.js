module.exports = {
    apps: [
        {
            name: 'gentle-care-backend',
            script: './server.js',
            cwd: './backend', // Path to your backend directory
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 5000,
                // Add other environment variables here if needed, 
                // but it's better to use a .env file in the backend directory
            },
        },
    ],
};
