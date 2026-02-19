module.exports = {
    apps: [
        {
            name: 'circumcare-backend',
            script: './server.js',
            cwd: './backend',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 7002,
                // MONGODB_URI will be loaded from .env file in backend directory
            },
        },
    ],
};
