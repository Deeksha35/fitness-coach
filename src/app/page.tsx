'use client';

import { useState, useEffect } from 'react';
import { FitnessForm } from '@/components/FitnessForm';
import { PlanView } from '@/components/PlanView';
import { FitnessPlan, UserInput } from '@/lib/types';
import { generateFitnessPlan } from '@/lib/ai';
import { motion } from 'framer-motion';
import { AlertCircle, Sparkles } from 'lucide-react';

export default function Home() {
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    const savedPlan = localStorage.getItem('fitnessPlan');
    if (savedPlan) {
      try {
        const parsed = JSON.parse(savedPlan);
        setPlan(parsed);
        setShowLanding(false);
      } catch (err) {
        console.error('Failed to load saved plan:', err);
      }
    }
  }, []);

  const handleGeneratePlan = async (input: UserInput) => {
    setIsLoading(true);
    setError(null);
    try {
      const generatedPlan = await generateFitnessPlan(input);
      setPlan(generatedPlan);
      localStorage.setItem('fitnessPlan', JSON.stringify(generatedPlan));
      setShowLanding(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate plan';
      setError(errorMessage);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!plan) return;
    setIsLoading(true);
    setError(null);
    try {
      const newPlan = await generateFitnessPlan(plan.userInput);
      setPlan(newPlan);
      localStorage.setItem('fitnessPlan', JSON.stringify(newPlan));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to regenerate';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewPlan = () => {
    setPlan(null);
    localStorage.removeItem('fitnessPlan');
    setShowLanding(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mt-6 mx-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 p-4 rounded-lg flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-800 dark:text-red-300 font-medium">Error</p>
            <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
          </div>
        </motion.div>
      )}

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        {showLanding && !plan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl mx-auto"
          >
            {/* Landing Page */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  AI-POWERED FITNESS
                </span>
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Your Personal AI<br />Fitness Coach
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                Transform your fitness journey with personalized workout plans, smart nutrition guidance, and AI-powered motivation—all tailored to you.
              </p>
            </motion.div>

            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
            >
              {[
                {
                  icon: '🏋️',
                  title: 'Personalized Workouts',
                  desc: 'Dynamic exercise plans based on your fitness level and goals',
                },
                {
                  icon: '🥗',
                  title: 'Smart Nutrition',
                  desc: 'Custom diet plans matching your preferences and objectives',
                },
                {
                  icon: '💡',
                  title: 'Daily Motivation',
                  desc: 'Tips, insights, and encouragement to keep you on track',
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ translateY: -8 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-900 dark:to-neutral-800 p-8 rounded-2xl border border-gray-200 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white shadow-lg"
            >
              <h2 className="text-3xl font-bold mb-4">
                Ready to Transform?
              </h2>
              <p className="text-lg mb-8 opacity-95">
                Create your personalized fitness plan in minutes
              </p>
              <button
                onClick={() => setShowLanding(false)}
                className="bg-white text-blue-600 font-bold px-8 py-4 rounded-xl hover:shadow-lg transition-all hover:scale-105 inline-block"
              >
                Generate My Plan
              </button>
            </motion.div>
          </motion.div>
        )}

        {!showLanding && !plan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <FitnessForm onSubmit={handleGeneratePlan} isLoading={isLoading} />
          </motion.div>
        )}

        {plan && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PlanView plan={plan} onRegenerate={handleRegenerate} isLoading={isLoading} />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <button
                onClick={handleNewPlan}
                className="px-8 py-3 bg-gray-200 dark:bg-neutral-800 hover:bg-gray-300 dark:hover:bg-neutral-700 text-gray-900 dark:text-white rounded-lg font-semibold transition-all hover:shadow-md"
              >
                Create New Plan
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
