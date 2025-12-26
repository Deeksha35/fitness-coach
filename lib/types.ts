export interface UserInput {
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  height: number;
  weight: number;
  fitnessGoal: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  workoutLocation: 'home' | 'gym' | 'outdoor';
  dietPreference: string;
  medicalHistory?: string;
  stressLevel?: 'low' | 'medium' | 'high';
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restSeconds: number;
  notes?: string;
}

export interface MealPlan {
  name: string;
  calories: number;
  protein: string;
  description: string;
}

export interface WorkoutPlan {
  exercises: Exercise[];
  summary: string;
}

export interface DietPlan {
  breakfast: MealPlan;
  lunch: MealPlan;
  dinner: MealPlan;
  snacks: MealPlan;
  summary: string;
}

export interface FitnessPlan {
  workout: WorkoutPlan;
  diet: DietPlan;
  tips: string;
  generatedAt: string;
  userInput: UserInput;
}
