# Setting Environment Variables in Vercel

## Important: No `.env` file needed!

In Vercel, you **do NOT** use `.env` files. Environment variables are set through the Vercel dashboard or CLI.

## Method 1: Vercel Dashboard (Easiest)

1. **Go to your project** in [vercel.com/dashboard](https://vercel.com/dashboard)

2. **Click on your project** → **Settings** → **Environment Variables**

3. **Add your API key(s):**

   **For single key:**
   - **Name:** `GEMINI_API_KEY`
   - **Value:** `AIzaSyDdsUswdPHqtgd8Z2rgTtvImRDCh4qoloA` (your actual key)
   - **Environment:** Select all (Production, Preview, Development) or just Production
   - Click **Save**

   **For multiple keys (recommended):**
   - **Name:** `GEMINI_API_KEY_1`
   - **Value:** Your first API key
   - **Environment:** Production, Preview, Development
   - Click **Save**
   
   - **Name:** `GEMINI_API_KEY_2`
   - **Value:** Your second API key
   - **Environment:** Production, Preview, Development
   - Click **Save**
   
   (Repeat for more keys)

4. **Redeploy your project:**
   - Go to **Deployments** tab
   - Click the **⋯** menu on the latest deployment
   - Click **Redeploy**
   - OR push a new commit to trigger auto-deploy

## Method 2: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Login
vercel login

# Add environment variable
vercel env add GEMINI_API_KEY

# When prompted:
# - Value: Paste your API key
# - Environment: Select Production, Preview, Development (or just Production)

# For multiple keys:
vercel env add GEMINI_API_KEY_1
vercel env add GEMINI_API_KEY_2
# etc.

# Redeploy
vercel --prod
```

## Verify Environment Variables Are Set

1. **Check in Dashboard:**
   - Settings → Environment Variables
   - You should see your keys listed

2. **Check via Debug Endpoint:**
   - Visit: `https://your-project.vercel.app/api/debug-keys`
   - This will show if keys are loaded (remove this endpoint in production!)

3. **Check Function Logs:**
   - Go to Deployments → Click on a deployment → Functions tab
   - Look for logs that say "Loaded X API key(s) for retry mechanism"

## Common Issues

### ❌ "No API keys found"
- **Solution:** Environment variables not set or not redeployed
- **Fix:** Set variables in dashboard → Redeploy

### ❌ Keys work locally but not on Vercel
- **Solution:** Local uses `.env` file, Vercel needs dashboard variables
- **Fix:** Set variables in Vercel dashboard (not `.env` file)

### ❌ Keys set but still not working
- **Solution:** Need to redeploy after adding variables
- **Fix:** Redeploy the project

### ❌ Wrong environment selected
- **Solution:** Variables only set for Preview, but using Production
- **Fix:** Set variables for all environments (Production, Preview, Development)

## Important Notes

- ✅ Environment variables are **automatically available** in Vercel serverless functions
- ✅ No need for `source .env` or `dotenv` in production (it's harmless but not needed)
- ✅ Variables are **encrypted** and **secure** in Vercel
- ✅ You can have different values for Production vs Preview environments
- ❌ **Never commit `.env` files** to Git (they're in `.gitignore`)

## After Setting Variables

1. **Redeploy** your project (required!)
2. **Test** the API endpoint
3. **Check logs** if issues persist

