import { UserInput, FitnessPlan } from './types';

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

async function callGeminiAPI(prompt: string): Promise<string> {
  if (!API_KEY) {
    throw new Error('API key not set');
  }

  try {
    console.log('🔍 Calling Gemini API...');
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

    console.log('📡 Response status:', response.status);

    if (!response.ok) {
      const errorData = await response.text();
      console.error('❌ API Error:', response.status, errorData);
      throw new Error(`API failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Full response:', JSON.stringify(data, null, 2));

    // Extract text from response
    let text = '';
    
    if (data.candidates && data.candidates.length > 0) {
      const candidate = data.candidates[0];
      if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
        text = candidate.content.parts[0].text;
      }
    }

    if (!text) {
      console.error('⚠️ No text in response');
      throw new Error('Empty response from API');
    }

    console.log('✅ Got response:', text.substring(0, 100));
    return text;
  } catch (error) {
    console.error('🚨 API call error:', error);
    throw error;
  }
}

function parseExercises(text: string): any[] {
  const exercises: any[] = [];
  const lines = text.split('\n');
  
  for (let i = 0; i < Math.min(lines.length, 5); i++) {
    const line = lines[i].trim();
    if (line && line.length > 5) {
      exercises.push({
        name: line.substring(0, 50),
        sets: 3,
        reps: 10,
        restSeconds: 60,
        notes: '',
      });
    }
  }

  if (exercises.length === 0) {
    exercises.push({
      name: 'Push-ups',
      sets: 3,
      reps: 10,
      restSeconds: 60,
      notes: 'Great for chest and arms',
    });
  }

  return exercises;
}

export async function generateFitnessPlan(userInput: UserInput): Promise<FitnessPlan> {
  const workoutPrompt = `Create a simple ${userInput.fitnessLevel} level workout plan for someone:
Age: ${userInput.age}, Weight: ${userInput.weight}kg, Height: ${userInput.height}cm, Goal: ${userInput.fitnessGoal}, Location: ${userInput.workoutLocation}

Just list 5 simple exercises, one per line. Start each with a dash.`;

  const dietPrompt = `Create a simple diet plan for someone:
Age: ${userInput.age}, Weight: ${userInput.weight}kg, Goal: ${userInput.fitnessGoal}, Diet: ${userInput.dietPreference}

Format:
BREAKFAST: [meal name] - [calories] cal - [protein] protein - [description]
LUNCH: [meal name] - [calories] cal - [protein] protein - [description]
DINNER: [meal name] - [calories] cal - [protein] protein - [description]
SNACKS: [snack name] - [calories] cal - [protein] protein - [description]`;

  const tipsPrompt = `Give 5 quick fitness tips for someone aged ${userInput.age} wanting to ${userInput.fitnessGoal} with ${userInput.stressLevel || 'medium'} stress. Just list them briefly.`;

  let workoutText = '';
  let dietText = '';
  let tipsText = '';

  // Get each response with fallback handling
  try {
    workoutText = await callGeminiAPI(workoutPrompt);
  } catch (e) {
    console.warn('Workout API failed, using defaults:', e);
    workoutText = '';
  }

  try {
    dietText = await callGeminiAPI(dietPrompt);
  } catch (e) {
    console.warn('Diet API failed, using defaults:', e);
    dietText = '';
  }

  try {
    tipsText = await callGeminiAPI(tipsPrompt);
  } catch (e) {
    console.warn('Tips API failed, using defaults:', e);
    tipsText = '';
  }

  // Parse workout
  const exercises = parseExercises(workoutText);

  // Parse diet
  let breakfast = { name: 'Oatmeal with berries', calories: 400, protein: '15g', description: 'Healthy breakfast' };
  let lunch = { name: 'Grilled chicken salad', calories: 600, protein: '45g', description: 'Protein-rich lunch' };
  let dinner = { name: 'Salmon with vegetables', calories: 700, protein: '50g', description: 'Omega-3 dinner' };
  let snacks = { name: 'Greek yogurt', calories: 150, protein: '20g', description: 'Healthy snack' };

  // Try to parse diet response
  const lines = dietText.split('\n');
  for (const line of lines) {
    if (line.includes('BREAKFAST')) {
      breakfast = { name: 'Breakfast meal', calories: 400, protein: '15g', description: line };
    } else if (line.includes('LUNCH')) {
      lunch = { name: 'Lunch meal', calories: 600, protein: '45g', description: line };
    } else if (line.includes('DINNER')) {
      dinner = { name: 'Dinner meal', calories: 700, protein: '50g', description: line };
    } else if (line.includes('SNACKS')) {
      snacks = { name: 'Snack', calories: 150, protein: '20g', description: line };
    }
  }

  return {
    workout: {
      exercises,
      summary: `A ${userInput.fitnessLevel} level fitness plan for ${userInput.fitnessGoal}. Start with 3 sets of each exercise, rest 60 seconds between sets.`,
    },
    diet: {
      breakfast,
      lunch,
      dinner,
      snacks,
      summary: `A personalized ${userInput.dietPreference} diet plan totaling around 1850 calories per day, adjusted for your ${userInput.fitnessGoal} goal.`,
    },
    tips: tipsText || 'Stay consistent, drink water, get proper sleep, and maintain a positive mindset!',
    generatedAt: new Date().toISOString(),
    userInput,
  };
}

export async function getMotivationalQuote(): Promise<string> {
  const prompt = `Generate a short motivational fitness quote (1-2 sentences).`;
  try {
    return await callGeminiAPI(prompt);
  } catch {
    return "Every day is a chance to become stronger. Keep pushing! 💪";
  }
}
