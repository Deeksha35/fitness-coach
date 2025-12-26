import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FitnessPlan } from './types';

export async function exportPlanAsImage(elementId: string): Promise<HTMLCanvasElement> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Element not found');
  
  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: 2,
    allowTaint: true,
    useCORS: true,
  });
  
  return canvas;
}

export async function exportPlanAsPDF(plan: FitnessPlan): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let yPos = 15;
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  // Header
  doc.setFontSize(20);
  doc.text("My Fitness Plan", margin, yPos);
  yPos += 12;

  // User Info
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Generated: ${new Date(plan.generatedAt).toLocaleDateString()}`, margin, yPos);
  yPos += 8;

  // User Details Section
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Profile", margin, yPos);
  yPos += 6;
  
  doc.setFontSize(10);
  const userDetails = `Name: ${plan.userInput.name} | Age: ${plan.userInput.age} | Goal: ${plan.userInput.fitnessGoal}`;
  doc.text(userDetails, margin, yPos);
  yPos += 8;

  // Workout Plan
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Workout Plan", margin, yPos);
  yPos += 6;

  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(plan.workout.summary, margin, yPos, { maxWidth: contentWidth, align: 'left' });
  yPos += doc.getTextDimensions(plan.workout.summary).h + 6;

  if (plan.workout.exercises.length > 0) {
    doc.setFontSize(9);
    doc.setTextColor(0);
    plan.workout.exercises.forEach((exercise) => {
      if (yPos > pageHeight - 20) {
        doc.addPage();
        yPos = 15;
      }
      doc.text(`• ${exercise.name}: ${exercise.sets}x${exercise.reps} (${exercise.restSeconds}s rest)`, margin, yPos);
      yPos += 6;
    });
  }

  yPos += 4;

  // Diet Plan
  if (yPos > pageHeight - 30) {
    doc.addPage();
    yPos = 15;
  }

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Diet Plan", margin, yPos);
  yPos += 6;

  doc.setFontSize(10);
  const meals = [
    { meal: 'Breakfast', details: plan.diet.breakfast },
    { meal: 'Lunch', details: plan.diet.lunch },
    { meal: 'Dinner', details: plan.diet.dinner },
    { meal: 'Snacks', details: plan.diet.snacks },
  ];

  meals.forEach(({ meal, details }) => {
    if (yPos > pageHeight - 20) {
      doc.addPage();
      yPos = 15;
    }
    doc.setTextColor(0);
    doc.setFontSize(9);
    doc.text(`${meal}: ${details.name} (${details.calories} cal)`, margin, yPos);
    yPos += 5;
  });

  yPos += 4;

  // Tips
  if (yPos > pageHeight - 30) {
    doc.addPage();
    yPos = 15;
  }

  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Lifestyle Tips", margin, yPos);
  yPos += 6;

  doc.setFontSize(10);
  doc.setTextColor(80);
  doc.text(plan.tips, margin, yPos, { maxWidth: contentWidth, align: 'left' });

  doc.save(`fitness-plan-${Date.now()}.pdf`);
}
