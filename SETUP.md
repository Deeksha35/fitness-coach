# Setup Instructions

## Environment Setup

### 1. Get Gemini API Key
1. Visit [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key

### 2. Configure Environment
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local and paste your API key
NEXT_PUBLIC_GEMINI_API_KEY=your_key_here
```

## Local Development

### Install & Run

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open browser to http://localhost:3000
```

### Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm start        # Production server
npm run lint     # ESLint check
```

## Project Features

### ✅ Implemented
- [x] Landing page with hero and features
- [x] User input form (name, age, metrics, goals, preferences)
- [x] Gemini API integration for plan generation
- [x] Workout plan display with exercises
- [x] Diet plan with meal details
- [x] Lifestyle tips and motivation
- [x] Copy to clipboard
- [x] PDF export (jsPDF)
- [x] Local storage persistence
- [x] Regenerate plan button
- [x] Dark/Light mode toggle
- [x] Voice reading (Web Speech API)
- [x] Responsive mobile design
- [x] Smooth animations (Framer Motion)
- [x] Error handling with user feedback
- [x] Header with theme toggle
- [x] Image placeholders for exercises/meals

## Deployment

### Quick Deploy to Vercel

```bash
# 1. Push to GitHub
git push origin main

# 2. Visit vercel.com
# 3. Click "New Project"
# 4. Import your GitHub repo
# 5. Add environment variable:
#    Name: NEXT_PUBLIC_GEMINI_API_KEY
#    Value: your_api_key
# 6. Click Deploy
```

### Deploy to Other Platforms

See [DEPLOY.md](./DEPLOY.md) for detailed instructions for:
- Netlify
- AWS Amplify
- Firebase Hosting
- Docker/Self-hosted

## Troubleshooting

### Build Error: "Module not found"
- Check `tsconfig.json` has correct path aliases
- Ensure all imports use `@/` prefix correctly

### API errors
- Verify `NEXT_PUBLIC_GEMINI_API_KEY` is set correctly
- Check API key is not expired
- Verify API is enabled in Google Cloud Console

### Dark mode not working
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check localStorage is enabled

### Voice reading not working
- Check browser supports Web Speech API
- Not available in all browsers (works in Chrome, Edge, Safari)
- Fallback message displayed automatically

## File Structure Explanation

```
lib/
  ai.ts          # Gemini API calls, plan generation
  pdf.ts         # PDF export using jsPDF + html2canvas
  types.ts       # TypeScript interfaces and types

src/
  app/
    page.tsx     # Main app logic (landing, form, plan display)
    layout.tsx   # Root layout with Header
    globals.css  # Global styles
  
  components/
    Header.tsx        # Navigation bar, theme toggle
    FitnessForm.tsx   # User input form component
    PlanView.tsx      # Plan display with actions
    ThemeProvider.tsx # Dark mode logic (legacy, using Header now)
    index.ts          # Component exports
```

## Key Technologies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations
- **Lucide React**: Icon library
- **jsPDF + html2canvas**: PDF generation
- **Web Speech API**: Text-to-speech

## Performance Tips

- The app is fully optimized for production
- Uses `next/image` for image optimization (future)
- Minimal JavaScript bundle
- Fast API responses with Gemini
- localStorage caching reduces API calls

## Testing the App

1. **Landing Page**: Should show hero section and features
2. **Form Submission**: Click "Generate My Plan" button
3. **Plan Generation**: Wait for API response (should be <5 seconds)
4. **Plan Display**: See workout, diet, tips in cards
5. **Actions**: Try Copy, Export PDF, Read Plan, Regenerate
6. **Dark Mode**: Toggle using header button
7. **Responsiveness**: Resize browser to test mobile view

## Security Notes

- API key is `NEXT_PUBLIC_` so it's exposed to browser (required for client-side calls)
- All API calls go directly to Gemini (no backend needed)
- No user data stored on servers
- Plans stored only in browser localStorage

## Future Enhancements

- AI-generated exercise images
- User authentication
- Progress tracking dashboard
- Email plan delivery
- Social sharing
- Multiple plans comparison

---

**Ready to deploy!** Follow the Vercel instructions above.
