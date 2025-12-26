# 🚀 Quick Start Guide

## 5-Minute Setup

### Step 1: Get API Key (2 min)
```
1. Go to https://ai.google.dev/
2. Click "Get API Key" button
3. Create new API key
4. Copy to clipboard
```

### Step 2: Clone & Install (2 min)
```bash
git clone <repository-url>
cd fitness-coach
npm install
```

### Step 3: Configure (1 min)
```bash
# Copy environment file
cp .env.example .env.local

# Open .env.local and add:
NEXT_PUBLIC_GEMINI_API_KEY=paste_your_key_here
```

### Step 4: Run
```bash
npm run dev
# Opens http://localhost:3000 automatically
```

## First Test

1. **Landing Page**: You should see hero section
2. **Click "Generate My Plan"**: Form appears
3. **Fill Form**:
   - Name: Your name
   - Age: 25
   - Weight: 70 kg
   - Height: 170 cm
   - Choose options for goal/level/location/diet
4. **Click "Generate My Fitness Plan"**: Wait 5-10 seconds
5. **View Plan**: See workout, diet, tips
6. **Try Features**:
   - Copy Plan button
   - Export PDF button
   - Read My Plan button
   - Toggle dark mode
   - Click Regenerate

## Folder Structure

```
fitness-coach/
├── src/
│   ├── app/page.tsx         ← Main app logic
│   ├── app/layout.tsx       ← Root layout
│   ├── components/
│   │   ├── Header.tsx       ← Top navigation
│   │   ├── FitnessForm.tsx  ← Input form
│   │   └── PlanView.tsx     ← Plan display
│   └── app/globals.css      ← Global styles
├── lib/
│   ├── ai.ts                ← API calls
│   ├── pdf.ts               ← PDF export
│   └── types.ts             ← TypeScript types
└── package.json
```

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Main app with state management |
| `src/components/FitnessForm.tsx` | User input form |
| `src/components/PlanView.tsx` | Plan display and actions |
| `lib/ai.ts` | Gemini API integration |
| `lib/pdf.ts` | PDF export using jsPDF |
| `src/app/layout.tsx` | Root HTML layout |

## Common Tasks

### Change Colors
Edit `src/app/globals.css` or components to adjust Tailwind colors.

### Modify Form Fields
Edit `src/components/FitnessForm.tsx` to add/remove form inputs.

### Change Plan Prompts
Edit `lib/ai.ts` to modify how Gemini generates plans.

### Adjust Animations
Edit Framer Motion settings in components (look for `initial`, `animate`, `variants`).

## Troubleshooting

### "Cannot find module @/lib/ai"
- Check `tsconfig.json` has path aliases
- Run `npm run build` to verify

### "API key not configured"
- Verify `.env.local` file exists
- Check key is copied correctly
- Restart dev server: `npm run dev`

### Dark mode doesn't work
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh page (Ctrl+Shift+R)
- Check localStorage enabled

### Form doesn't submit
- Check API key is set
- Look for errors in browser console (F12)
- Ensure internet connection is active

## Deploy to Vercel

```bash
# 1. Push code to GitHub
git push origin main

# 2. Go to vercel.com
# 3. Click "New Project"
# 4. Import your GitHub repo
# 5. Add env var: NEXT_PUBLIC_GEMINI_API_KEY
# 6. Click Deploy
```

**That's it! Your app is live.**

## Commands Reference

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Create production build
npm start        # Run production server
npm run lint     # Check code quality
```

## What's Included

✅ Landing page with animations
✅ User input form with validation
✅ AI plan generation via Gemini
✅ Beautiful plan display
✅ PDF export functionality
✅ Voice reading (text-to-speech)
✅ Dark/Light mode toggle
✅ Local storage persistence
✅ Mobile responsive design
✅ Error handling and user feedback

## Next Steps

1. **Customize**: Edit copy, colors, fonts to match your style
2. **Deploy**: Follow Vercel deployment above
3. **Share**: Send the link to friends
4. **Iterate**: Add features based on feedback

## Need Help?

- Check [README.md](./README.md) for full documentation
- See [FEATURES.md](./FEATURES.md) for feature details
- Read [DEPLOY.md](./DEPLOY.md) for deployment info
- Check [SETUP.md](./SETUP.md) for detailed setup

---

**You're ready to go! Happy coding! 🎉**
