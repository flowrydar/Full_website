# Floye Wedding Website 2026

This repository contains the wedding website for the Floye wedding in 2026.

## Deployment Options

### GoDaddy Deployment Instructions

1. Build the project with:
   ```
   npm run build
   ```

2. The build will create a `dist` folder that contains all the static files needed for deployment.

3. Upload the contents of the `dist` folder to your GoDaddy hosting using FTP or their file manager.

4. Make sure your GoDaddy hosting is set up to serve a single-page application (SPA). You might need to add an `.htaccess` file with the following content:
   ```
   RewriteEngine On
   RewriteBase /
   RewriteRule ^index\.html$ - [L]
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule . /index.html [L]
   ```

5. If you're using a subdomain or a specific directory, adjust the `RewriteBase` accordingly.

### AWS Amplify Deployment

1. Connect this GitHub repository to AWS Amplify.
2. Select the main-floye branch for deployment.
3. Follow the AWS Amplify setup wizard to complete the deployment.

## Development

1. Install dependencies:
   ```
   npm install
   ```

2. Start development server:
   ```
   npm run dev
   ```

3. Build for production:
   ```
   npm run build
   ```

## Features

- Elegant wedding invitation
- RSVP form with guest management
- Interactive elements with animations
- Background music
- Responsive design for all devices

## Project info

**URL**: https://lovable.dev/projects/c890c89c-4ca0-488c-81b9-a89384348fe9

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c890c89c-4ca0-488c-81b9-a89384348fe9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c890c89c-4ca0-488c-81b9-a89384348fe9) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
