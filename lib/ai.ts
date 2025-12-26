import { UserInput, FitnessPlan } from './types';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

async function callGeminiAPI(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  try {
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Gemini API error');
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || '';
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

export async function generateFitnessPlan(userInput: UserInput): Promise<FitnessPlan> {
  const workoutPrompt = `Create a ${userInput.fitnessLevel} fitness workout plan for someone with these details:
- Age: ${userInput.age}
- Weight: ${userInput.weight} kg
- Height: ${userInput.height} cm
- Goal: ${userInput.fitnessGoal}
- Workout Location: ${userInput.workoutLocation}
- Medical History: ${userInput.medicalHistory || 'None'}

Provide the response as JSON with this structure:
{
  "exercises": [
    {"name": "exercise name", "sets": number, "reps": number, "restSeconds": number, "notes": "optional notes"}
  ],
  "summary": "brief summary of the workout plan"
}`;

  const dietPrompt = `Create a personalized diet plan for someone with these details:
- Age: ${userInput.age}
- Weight: ${userInput.weight} kg
- Height: ${userInput.height} cm
- Goal: ${userInput.fitnessGoal}
- Diet Preference: ${userInput.dietPreference}

Provide the response as JSON with this structure:
{
  "breakfast": {"name": "dish", "calories": number, "protein": "amount", "description": "brief desc"},
  "lunch": {"name": "dish", "calories": number, "protein": "amount", "description": "brief desc"},
  "dinner": {"name": "dish", "calories": number, "protein": "amount", "description": "brief desc"},
  "snacks": {"name": "snack", "calories": number, "protein": "amount", "description": "brief desc"},
  "summary": "brief summary"
}`;

  const tipsPrompt = `Give 3-5 motivational and lifestyle tips for someone who is ${userInput.age} years old, trying to achieve ${userInput.fitnessGoal}, with stress level ${userInput.stressLevel || 'medium'}. Keep it concise and actionable.`;

  try {
    const [workoutResponse, dietResponse, tipsResponse] = await Promise.all([
      callGeminiAPI(workoutPrompt),
      callGeminiAPI(dietPrompt),
      callGeminiAPI(tipsPrompt),
    ]);

    // Parse JSON responses
    let workout;
    let diet;

    try {
      const workoutJson = workoutResponse.match(/\{[\s\S]*\}/)?.[0];
      workout = workoutJson ? JSON.parse(workoutJson) : { exercises: [], summary: workoutResponse };
    } catch {
      workout = { exercises: [], summary: workoutResponse };
    }

    try {
      const dietJson = dietResponse.match(/\{[\s\S]*\}/)?.[0];
      diet = dietJson ? JSON.parse(dietJson) : { breakfast: { name: 'N/A', calories: 0, protein: 'N/A', description: dietResponse }, lunch: { name: 'N/A', calories: 0, protein: 'N/A', description: '' }, dinner: { name: 'N/A', calories: 0, protein: 'N/A', description: '' }, snacks: { name: 'N/A', calories: 0, protein: 'N/A', description: '' }, summary: '' };
    } catch {
      diet = { breakfast: { name: 'N/A', calories: 0, protein: 'N/A', description: dietResponse }, lunch: { name: 'N/A', calories: 0, protein: 'N/A', description: '' }, dinner: { name: 'N/A', calories: 0, protein: 'N/A', description: '' }, snacks: { name: 'N/A', calories: 0, protein: 'N/A', description: '' }, summary: '' };
    }

    return {
      workout: {
        exercises: workout.exercises || [],
        summary: workout.summary || '',
      },
      diet: {
        breakfast: diet.breakfast || { name: 'N/A', calories: 0, protein: 'N/A', description: '' },
        lunch: diet.lunch || { name: 'N/A', calories: 0, protein: 'N/A', description: '' },
        dinner: diet.dinner || { name: 'N/A', calories: 0, protein: 'N/A', description: '' },
        snacks: diet.snacks || { name: 'N/A', calories: 0, protein: 'N/A', description: '' },
        summary: diet.summary || '',
      },
      tips: tipsResponse,
      generatedAt: new Date().toISOString(),
      userInput,
    };
  } catch (error) {
    console.error('Error generating fitness plan:', error);
    throw error;
  }
}

export async function getMotivationalQuote(): Promise<string> {
  const prompt = `Generate a short, motivational fitness quote (1-2 sentences). Just the quote, no attribution.`;
  try {
    return await callGeminiAPI(prompt);
  } catch {
    return "Every day is a chance to become stronger. Let's go! 💪";
  }
}
