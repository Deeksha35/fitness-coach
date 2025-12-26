'use client';

import { FitnessPlan } from '@/lib/types';
import { motion } from 'framer-motion';
import { Download, RotateCcw, Copy, Check, Volume2, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { exportPlanAsPDF } from '@/lib/pdf';

interface PlanViewProps {
  plan: FitnessPlan;
  onRegenerate: () => Promise<void>;
  isLoading: boolean;
}

export function PlanView({ plan, onRegenerate, isLoading }: PlanViewProps) {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleCopy = () => {
    const planText = `
Fitness Plan for ${plan.userInput.name}

WORKOUT PLAN
${plan.workout.summary}

Exercises:
${plan.workout.exercises.map((ex) => `• ${ex.name}: ${ex.sets}x${ex.reps} (${ex.restSeconds}s rest)${ex.notes ? ` - ${ex.notes}` : ''}`).join('\n')}

DIET PLAN
Breakfast: ${plan.diet.breakfast.name} (${plan.diet.breakfast.calories} cal) - ${plan.diet.breakfast.description}
Lunch: ${plan.diet.lunch.name} (${plan.diet.lunch.calories} cal) - ${plan.diet.lunch.description}
Dinner: ${plan.diet.dinner.name} (${plan.diet.dinner.calories} cal) - ${plan.diet.dinner.description}
Snacks: ${plan.diet.snacks.name} (${plan.diet.snacks.calories} cal) - ${plan.diet.snacks.description}

${plan.diet.summary}

LIFESTYLE TIPS
${plan.tips}
    `;
    navigator.clipboard.writeText(planText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      await exportPlanAsPDF(plan);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF');
    } finally {
      setExporting(false);
    }
  };

  const handleReadPlan = async () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Voice reading is not supported in your browser');
      return;
    }

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const planText = `Your fitness plan for ${plan.userInput.name}. ${plan.workout.summary}. ${plan.diet.summary}. ${plan.tips}`;
    const utterance = new SpeechSynthesisUtterance(planText);
    utterance.rate = 0.9;
    utterance.onstart = () => setIsReading(true);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Your Fitness Plan, {plan.userInput.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generated on {new Date(plan.generatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-3 justify-center">
        <motion.button
          onClick={handleCopy}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Plan'}
        </motion.button>

        <motion.button
          onClick={handleExport}
          disabled={exporting}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
        >
          <Download className="w-4 h-4" />
          {exporting ? 'Exporting...' : 'Export PDF'}
        </motion.button>

        <motion.button
          onClick={handleReadPlan}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            isReading
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white'
          }`}
        >
          <Volume2 className="w-4 h-4" />
          {isReading ? 'Stop Reading' : 'Read My Plan'}
        </motion.button>

        <motion.button
          onClick={onRegenerate}
          disabled={isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {isLoading ? 'Regenerating...' : 'Regenerate'}
        </motion.button>
      </motion.div>

      {/* Workout Plan */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg dark:shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🏋️</span> Workout Plan
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{plan.workout.summary}</p>

        {plan.workout.exercises.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Exercises</h3>
            <div className="grid gap-3">
              {plan.workout.exercises.map((exercise, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => {
                    setSelectedItem(exercise.name);
                    setShowImageModal(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        {exercise.name}
                        <ImageIcon className="w-4 h-4 text-blue-500 opacity-60" />
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {exercise.sets} sets × {exercise.reps} reps
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Rest: {exercise.restSeconds}s</p>
                      {exercise.notes && <p className="text-sm text-gray-700 dark:text-gray-300 mt-2 italic">{exercise.notes}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Diet Plan */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg dark:shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">🥗</span> Diet Plan
        </h2>
        {plan.diet.summary && <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{plan.diet.summary}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Breakfast', meal: plan.diet.breakfast },
            { label: 'Lunch', meal: plan.diet.lunch },
            { label: 'Dinner', meal: plan.diet.dinner },
            { label: 'Snacks', meal: plan.diet.snacks },
          ].map(({ label, meal }) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{label}</h3>
              <p className="font-medium text-blue-600 dark:text-blue-400">{meal.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{meal.calories} calories</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Protein: {meal.protein}</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2 italic">{meal.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tips */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg dark:shadow-xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span> Lifestyle Tips
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{plan.tips}</p>
      </motion.div>

      {/* Image Modal */}
      {showImageModal && selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowImageModal(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-gray-900 rounded-2xl p-8 max-w-md w-full text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{selectedItem}</h3>
            <div className="w-full h-64 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Image Placeholder</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">AI-generated images coming soon</p>
              </div>
            </div>
            <motion.button
              onClick={() => setShowImageModal(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
