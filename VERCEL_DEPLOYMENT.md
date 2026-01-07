# Vercel Deployment Guide

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your project pushed to GitHub, GitLab, or Bitbucket
3. Your Gemini API key(s) ready

## Step-by-Step Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with GitHub/GitLab/Bitbucket

2. **Import Your Project**
   - Click "Import Project"
   - Select your repository
   - Click "Import"

3. **Configure Project Settings**
   - **Framework Preset**: Select "Other" or leave as "Other"
   - **Root Directory**: Leave as `./` (root)
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/build`
   - **Install Command**: `npm install`

4. **Environment Variables**
   - Click "Environment Variables"
   - Add your Gemini API key(s):
     ```
     GEMINI_API_KEY=your_key_here
     ```
     OR for multiple keys:
     ```
     GEMINI_API_KEY_1=key1
     GEMINI_API_KEY_2=key2
     GEMINI_API_KEY_3=key3
     ```
   - Click "Save"

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? **Select your account**
   - Link to existing project? **No** (first time)
   - Project name? **thinking-buddy** (or your choice)
   - Directory? **./** (root)
   - Override settings? **No**

4. **Set Environment Variables**
   ```bash
   vercel env add GEMINI_API_KEY
   # Paste your API key when prompted
   ```

   For multiple keys:
   ```bash
   vercel env add GEMINI_API_KEY_1
   vercel env add GEMINI_API_KEY_2
   # etc.
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Project Structure for Vercel

```
thinking-buddy/
├── api/              # Serverless functions
│   ├── health.js
│   └── learn.js
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── package.json
├── server/          # Server code (used by API functions)
│   └── services/
├── vercel.json      # Vercel configuration
└── package.json
```

## Important Notes

1. **API Routes**: The `/api/*` routes are automatically converted to serverless functions
2. **Environment Variables**: Must be set in Vercel dashboard or via CLI
3. **Build Process**: Vercel will:
   - Install root dependencies
   - Install client dependencies
   - Build the React app
   - Deploy API functions

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure `client/package.json` has a `build` script
- Check build logs in Vercel dashboard

### API Routes Not Working
- Verify `api/` folder exists with `.js` files
- Check that environment variables are set
- Review function logs in Vercel dashboard

### Environment Variables Not Loading
- Make sure variables are set for the correct environment (Production, Preview, Development)
- Redeploy after adding new environment variables
- Check variable names match exactly (case-sensitive)

## Custom Domain (Optional)

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow DNS configuration instructions

## Updating Your Deployment

After making changes:
- **Via Dashboard**: Push to your Git repository, Vercel auto-deploys
- **Via CLI**: Run `vercel --prod` after committing changes

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Vercel Support: [vercel.com/support](https://vercel.com/support)

