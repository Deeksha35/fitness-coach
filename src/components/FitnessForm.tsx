'use client';

import { useState, FormEvent } from 'react';
import { UserInput } from '@/lib/types';
import { motion } from 'framer-motion';

interface FitnessFormProps {
  onSubmit: (input: UserInput) => Promise<void>;
  isLoading: boolean;
}

export function FitnessForm({ onSubmit, isLoading }: FitnessFormProps) {
  const [formData, setFormData] = useState<UserInput>({
    name: '',
    age: 25,
    gender: 'male',
    height: 170,
    weight: 70,
    fitnessGoal: 'weight-loss',
    fitnessLevel: 'beginner',
    workoutLocation: 'home',
    dietPreference: 'balanced',
    medicalHistory: '',
    stressLevel: 'medium',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    await onSubmit(formData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg dark:shadow-xl"
    >
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create Your Fitness Plan</h2>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white transition"
            required
          />
        </div>

        {/* Age, Gender, Height, Weight */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="15"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              min="100"
              max="250"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="30"
              max="300"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            />
          </div>
        </div>

        {/* Fitness Goal */}
        <div>
          <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            What's Your Fitness Goal?
          </label>
          <select
            id="fitnessGoal"
            name="fitnessGoal"
            value={formData.fitnessGoal}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="weight-loss">Weight Loss</option>
            <option value="muscle-gain">Muscle Gain</option>
            <option value="endurance">Improve Endurance</option>
            <option value="general-fitness">General Fitness</option>
            <option value="strength">Build Strength</option>
          </select>
        </div>

        {/* Fitness Level & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Fitness Level
            </label>
            <select
              id="fitnessLevel"
              name="fitnessLevel"
              value={formData.fitnessLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label htmlFor="workoutLocation" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Workout Location
            </label>
            <select
              id="workoutLocation"
              name="workoutLocation"
              value={formData.workoutLocation}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            >
              <option value="home">Home</option>
              <option value="gym">Gym</option>
              <option value="outdoor">Outdoor</option>
            </select>
          </div>
        </div>

        {/* Diet Preference */}
        <div>
          <label htmlFor="dietPreference" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Diet Preference
          </label>
          <select
            id="dietPreference"
            name="dietPreference"
            value={formData.dietPreference}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="balanced">Balanced</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="keto">Keto</option>
            <option value="high-protein">High Protein</option>
          </select>
        </div>

        {/* Stress Level */}
        <div>
          <label htmlFor="stressLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Stress Level
          </label>
          <select
            id="stressLevel"
            name="stressLevel"
            value={formData.stressLevel}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {/* Medical History */}
        <div>
          <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Medical History (Optional)
          </label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="e.g., Knee pain, asthma, etc."
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {isLoading ? 'Generating Your Plan...' : 'Generate My Fitness Plan'}
        </motion.button>
      </div>
    </motion.form>
  );
}
