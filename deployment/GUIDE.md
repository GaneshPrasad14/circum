# Manual Deployment Guide: MERN Stack on VPS

This guide walks you through deploying your React + Node.js application to a Linux VPS (e.g., Ubuntu) manually.

## Prerequisites

Ensure your VPS has the following installed:
-   **Node.js & npm** (v18 or higher)
-   **Nginx** (Web Server)
-   **Git**
-   **PM2** (Process Manager for Node.js)

```bash
# Update and install basics
sudo apt update && sudo apt upgrade -y
sudo apt install nginx git curl -y

# Install Node.js (v18)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2
```

---

## Step 1: Clone Repository

SSH into your VPS and clone your repository.

```bash
cd /var/www
sudo mkdir gentle-care
sudo chown -R $USER:$USER gentle-care
git clone <YOUR_GIT_REPO_URL> gentle-care
cd gentle-care
```

---

## Step 2: Backend Setup

Navigate to the `backend` directory, install dependencies, and configure the environment.

1.  **Install Dependencies**
    ```bash
    cd backend
    npm install
    ```

2.  **Create .env File**
    Create a `.env` file with your production variables.
    ```bash
    nano .env
    ```
    Paste your environment variables:
    ```env
    PORT=5000
    MONGODB_URI=<YOUR_MONGODB_CONNECTION_STRING>
    # Add other secrets here
    ```
    Press `Ctrl+X`, then `Y`, then `Enter` to save.

3.  **Start with PM2**
    We will use the generated `ecosystem.config.js` to manage the process.
    ```bash
    # Go back to root project folder
    cd .. 
    
    # Start the backend
    pm2 start deployment/ecosystem.config.js
    
    # Save the process list so it restarts on reboot
    pm2 save
    pm2 startup
    ```

---

## Step 3: Frontend Setup

Navigate to the `frontend` directory, install dependencies, and build the specific static files.

1.  **Install Dependencies**
    ```bash
    cd frontend
    npm install
    ```

2.  **Build configurations**
    Ensure your `.env` or build config points to your domain for API calls if necessary.
    
3.  **Build the Project**
    ```bash
    npm run build
    ```
    This will create a `dist` folder in `frontend/dist`.

---

## Step 4: Nginx Configuration

We need to tell Nginx how to serve your frontend files and proxy API requests to your backend.

1.  **Copy Config File**
    We'll use the template provided in `deployment/nginx.conf`.
    ```bash
    sudo cp deployment/nginx.conf /etc/nginx/sites-available/gentle-care
    ```

2.  **Edit Config**
    Edit the file to match your domain and paths.
    ```bash
    sudo nano /etc/nginx/sites-available/gentle-care
    ```
    -   Change `server_name` to your actual domain (e.g., `example.com`).
    -   Ensure `root` points to `/var/www/gentle-care/frontend/dist`.
    -   Ensure `proxy_pass` matches your backend port (default 5000).

3.  **Enable Site**
    Link the configuration to `sites-enabled`.
    ```bash
    sudo ln -s /etc/nginx/sites-available/gentle-care /etc/nginx/sites-enabled/
    sudo rm /etc/nginx/sites-enabled/default # Remove default site if present
    ```

4.  **Test and Restart Nginx**
    ```bash
    sudo nginx -t # Check for syntax errors
    sudo systemctl restart nginx
    ```

---

## Step 5: SSL (HTTPS) Setup

Secure your site with a free SSL certificate using Certbot.

1.  **Install Certbot**
    ```bash
    sudo apt install certbot python3-certbot-nginx -y
    ```

2.  **Obtain Certificate**
    ```bash
    sudo certbot --nginx -d your_domain.com -d www.your_domain.com
    ```
    Follow the prompts. Certbot will automatically update your Nginx config to redirect HTTP to HTTPS.

---

## Troubleshooting

-   **Backend not working?** check logs: `pm2 logs`
-   **Frontend 404s?** Ensure Nginx `root` path is correct and `try_files` directive is present.
-   **502 Bad Gateway?** Backend is not running on the specified port. Check `pm2 status`.

Your application should now be live!
