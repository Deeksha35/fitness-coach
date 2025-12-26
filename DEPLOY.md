# AI Fitness Coach App

A production-ready web application that generates personalized fitness plans using Google Gemini API.

## Features

✨ **Personalized Fitness Plans**
- Dynamic workout plans based on fitness level and goals
- Custom diet plans matching dietary preferences
- AI-powered motivation tips and lifestyle advice

🎯 **User-Friendly Interface**
- Clean, minimal design with calm aesthetics
- Dark/Light mode support
- Responsive across all devices

🔊 **Voice & Multimedia**
- Text-to-speech plan reading
- Image placeholders for exercises and meals
- Interactive modal previews

💾 **Export & Persistence**
- Export plans as PDF
- Save plans to browser localStorage
- Copy plan to clipboard

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **PDF Export**: jsPDF + html2canvas
- **Deployment**: Vercel ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key ([Get one here](https://ai.google.dev/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-coach
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```env
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

### Development

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Create a production build:
```bash
npm run build
npm start
```

## Project Structure

```
fitness-coach/
├── lib/
│   ├── ai.ts          # Gemini API integration
│   ├── pdf.ts         # PDF export functionality
│   └── types.ts       # TypeScript type definitions
├── src/
│   ├── app/
│   │   ├── page.tsx   # Main app page with landing & state
│   │   ├── layout.tsx # Root layout
│   │   └── globals.css # Global styles
│   └── components/
│       ├── Header.tsx        # Navigation & theme toggle
│       ├── FitnessForm.tsx   # User input form
│       ├── PlanView.tsx      # Plan display & actions
│       ├── ThemeProvider.tsx # Dark mode logic
│       └── index.ts          # Component exports
├── .env.local        # Environment variables
└── package.json      # Dependencies
```

## Usage

### 1. Landing Page
- Clean hero section with feature highlights
- Call-to-action button to start

### 2. Fitness Form
Fill in your fitness profile:
- Personal details (name, age, gender, height, weight)
- Fitness goal (weight loss, muscle gain, etc.)
- Fitness level (beginner, intermediate, advanced)
- Workout location (home, gym, outdoor)
- Diet preference (balanced, vegetarian, vegan, keto, high-protein)
- Optional: Medical history, stress level

### 3. AI Plan Generation
Your personalized plan includes:
- **Workout Plan**: Exercises with sets, reps, and rest times
- **Diet Plan**: Breakfast, lunch, dinner, and snacks with calories and protein
- **Tips**: Motivational and lifestyle advice

### 4. Plan Actions
- **Copy Plan**: Copy to clipboard
- **Export PDF**: Download as PDF file
- **Read My Plan**: Text-to-speech narration
- **Regenerate**: Create a new plan with same profile
- **Create New Plan**: Start over with different profile

## API Integration

The app uses Google Gemini API for plan generation. The API calls include:

1. **Workout Prompt**: Generates exercise routines based on profile
2. **Diet Prompt**: Creates meal plans matching preferences
3. **Tips Prompt**: Provides motivational and lifestyle tips

All responses are structured as JSON for consistency and parsing.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Android)

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/fitness-coach)

### Manual Deployment

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Select your repository
5. Add environment variable: `NEXT_PUBLIC_GEMINI_API_KEY`
6. Click "Deploy"

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

**Note**: The `NEXT_PUBLIC_` prefix exposes this variable to the browser, which is necessary for client-side API calls.

## Performance

- Fast page loads with Next.js optimization
- Image optimization for better performance
- Client-side caching with localStorage
- Minimal bundle size

## Dark Mode

The app automatically detects system preference and allows manual toggling via the header button. Theme preference is persisted in localStorage.

## Error Handling

- Graceful API error messages
- Fallback UI for missing data
- User-friendly error notifications

## Future Enhancements

- AI-generated exercise images
- ElevenLabs voice synthesis
- User authentication for multi-device sync
- Progress tracking dashboard
- Social sharing features
- Email plan delivery

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

---

**Created with ❤️ by Your Name**
