# Push to GitHub Instructions

## Quick Setup (Follow These Steps)

### Step 1: Create Repository on GitHub
1. Go to https://github.com/new
2. Repository name: `fitness-coach`
3. Description: `AI-powered fitness coach - personalized workouts, nutrition plans, and daily motivation`
4. Choose: Public (recommended for portfolio)
5. Do NOT initialize with README (we already have it)
6. Click "Create repository"

### Step 2: Copy Your GitHub Username
You'll need it in the next step.

### Step 3: Run These Commands (Replace USERNAME with your GitHub username)

```powershell
cd c:\contact\fitness-coach

# Add GitHub remote
git remote add origin https://github.com/USERNAME/fitness-coach.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## What Gets Pushed
✅ All source code (src/, lib/)
✅ Configuration files (package.json, tsconfig.json, etc.)
✅ All 9 documentation files
✅ Git history with 5 commits
✅ .env.local (IMPORTANT - make sure to add to .gitignore if you don't want API key exposed)

## After Push
- Repository will be at: https://github.com/USERNAME/fitness-coach
- You can deploy to Vercel directly from GitHub
- Changes will be tracked in git history

## Note About API Key
The `.env.local` file contains your Gemini API key. Consider:
1. **Keep private**: Don't push to public repo
2. **Create .gitignore entry**: Add `/.env.local` to .gitignore before pushing
3. **Use Vercel secrets**: Add the key in Vercel environment variables instead

Let me know once you've created the GitHub repo and I'll push automatically!
