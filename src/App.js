import React, { useState, useEffect } from 'react';
import './App.css';

// ==========================================
// 1. THE MEGA SYMPTOM DATABASE
// ==========================================
// Categories for better filtering
const symptomCategories = [
  'General', 
  'Digestive', 
  'Respiratory', 
  'ENT (Ear/Nose/Throat)', 
  'Musculoskeletal',
  'Skin', 
  'Urinary', 
  'Eye',
  'Neurological', 
  'Mental Health'
];

const symptomDatabase = {
  // --- GENERAL / SYSTEMIC ---
  'Fever': {
    category: 'General',
    tags: ['hot', 'high temp', 'chills', 'shivering', 'febrile'],
    doctors: ['General Physician', 'Internal Medicine'],
    severity: 'moderate',
    description: 'Body temperature higher than 100.4°F (38°C).',
    precautions: ['Rest adequately', 'Stay hydrated with water/electrolytes', 'Monitor temperature every 4 hours', 'Sponge bath with lukewarm water'],
    possibleTests: ['Complete Blood Count (CBC)', 'Dengue NS1', 'Malaria Smear', 'Urine Culture', 'Typhoid Widal Test']
  },
  'Fatigue': {
    category: 'General',
    tags: ['tired', 'exhausted', 'weakness', 'lethargy', 'no energy'],
    doctors: ['General Physician', 'Endocrinologist'],
    severity: 'low',
    description: 'Feeling of extreme tiredness not relieved by sleep.',
    precautions: ['Improve sleep hygiene', 'Check iron intake (leafy greens)', 'Stay hydrated', 'Manage stress levels'],
    possibleTests: ['Thyroid Profile (TSH)', 'Iron Studies', 'Vitamin B12', 'Vitamin D', 'Blood Glucose']
  },
  'Chills': {
    category: 'General',
    tags: ['shaking', 'cold', 'goosebumps'],
    doctors: ['General Physician'],
    severity: 'moderate',
    description: 'Feeling cold and shivering, often preceding a fever.',
    precautions: ['Keep warm with blankets', 'Drink warm fluids', 'Monitor temperature'],
    possibleTests: ['CBC', 'Blood Culture', 'Influenza Test']
  },
  'Night Sweats': {
    category: 'General',
    tags: ['sweating', 'damp sheets', 'sleep sweat'],
    doctors: ['General Physician', 'Pulmonologist'],
    severity: 'moderate',
    description: 'Severe sweating at night that soaks sleepwear.',
    precautions: ['Keep bedroom cool', 'Wear breathable cotton', 'Drink water before bed', 'Consult if weight loss occurs'],
    possibleTests: ['Chest X-Ray', 'Thyroid Profile', 'CBC', 'ESR']
  },
  'Weight Loss': {
    category: 'General',
    tags: ['thin', 'skinny', 'loss', 'unexplained'],
    doctors: ['General Physician', 'Endocrinologist'],
    severity: 'moderate',
    description: 'Unintentional loss of body weight (>5% in 6 months).',
    precautions: ['Track daily calorie intake', 'Monitor for other symptoms', 'Eat nutrient-dense foods'],
    possibleTests: ['Thyroid Profile', 'HbA1c', 'Celiac Test', 'Whole Body Checkup']
  },
  'Loss of Appetite': {
    category: 'General',
    tags: ['no hunger', 'skip meals', 'anorexia'],
    doctors: ['General Physician', 'Gastroenterologist'],
    severity: 'low',
    description: 'Reduced desire to eat.',
    precautions: ['Eat small frequent meals', 'Choose favorite foods', 'Stay hydrated', 'Avoid strong odors'],
    possibleTests: ['Liver Function Test', 'Kidney Function Test', 'CBC']
  },

  // --- DIGESTIVE ---
  'Abdominal Pain': {
    category: 'Digestive',
    tags: ['stomach ache', 'belly pain', 'tummy', 'cramps'],
    doctors: ['General Physician', 'Gastroenterologist'],
    severity: 'moderate',
    description: 'Pain or discomfort in the stomach region.',
    precautions: ['Apply heat pad', 'Avoid solid food temporarily', 'Sip clear fluids', 'Avoid painkillers without advice'],
    possibleTests: ['Ultrasound Abdomen', 'Amylase/Lipase', 'Urine Routine', 'Stool Test']
  },
  'Diarrhea': {
    category: 'Digestive',
    tags: ['loose motion', 'watery stool', 'poop', 'dysentery'],
    doctors: ['General Physician', 'Gastroenterologist'],
    severity: 'moderate',
    description: 'Frequent loose or watery bowel movements.',
    precautions: ['Drink ORS (Oral Rehydration Solution)', 'Eat BRAT diet (Bananas, Rice, Applesauce, Toast)', 'Avoid dairy and spicy food'],
    possibleTests: ['Stool Routine', 'Stool Culture', 'Electrolytes']
  },
  'Vomiting': {
    category: 'Digestive',
    tags: ['puke', 'throw up', 'nausea'],
    doctors: ['General Physician'],
    severity: 'moderate',
    description: 'Forceful expulsion of stomach contents.',
    precautions: ['Sip water or ice chips', 'Rest stomach for 4 hours', 'Eat bland foods', 'Avoid strong smells'],
    possibleTests: ['Electrolytes', 'Liver Function Test', 'Abdominal Ultrasound']
  },
  'Constipation': {
    category: 'Digestive',
    tags: ['hard stool', 'cant poop', 'blocked'],
    doctors: ['General Physician', 'Dietician'],
    severity: 'low',
    description: 'Infrequent or difficult bowel movements.',
    precautions: ['Increase fiber intake', 'Drink warm water', 'Exercise daily', 'Eat prunes/figs'],
    possibleTests: ['Thyroid Profile', 'Stool Occult Blood']
  },
  'Heartburn': {
    category: 'Digestive',
    tags: ['acid', 'reflux', 'chest burn', 'gerd'],
    doctors: ['General Physician', 'Gastroenterologist'],
    severity: 'low',
    description: 'Burning pain in chest after eating.',
    precautions: ['Do not lie down after eating', 'Avoid spicy/oily foods', 'Elevate head while sleeping'],
    possibleTests: ['Endoscopy', 'H. Pylori Test']
  },
  'Bloating': {
    category: 'Digestive',
    tags: ['gas', 'swollen belly', 'burping', 'fullness'],
    doctors: ['General Physician', 'Gastroenterologist'],
    severity: 'low',
    description: 'Feeling of fullness or tightness in abdomen.',
    precautions: ['Walk after meals', 'Eat slowly', 'Avoid carbonated drinks', 'Check food intolerances'],
    possibleTests: ['H. Pylori Test', 'Ultrasound Abdomen', 'Celiac Screen']
  },

  // --- RESPIRATORY ---
  'Cough': {
    category: 'Respiratory',
    tags: ['dry cough', 'wet cough', 'phlegm', 'hacking'],
    doctors: ['General Physician', 'Pulmonologist'],
    severity: 'low',
    description: 'Reflex action to clear airways.',
    precautions: ['Steam inhalation', 'Honey and ginger tea', 'Warm salt water gargle', 'Wear mask'],
    possibleTests: ['Chest X-Ray', 'CBC', 'Sputum Culture']
  },
  'Shortness of Breath': {
    category: 'Respiratory',
    tags: ['breathless', 'gasping', 'air hunger', 'asthma'],
    doctors: ['Pulmonologist', 'Cardiologist'],
    severity: 'emergency',
    description: 'Difficulty getting enough air into lungs.',
    precautions: ['Sit upright', 'Loosen tight clothing', 'Use inhaler if prescribed', 'Seek emergency help'],
    possibleTests: ['Pulse Oximetry', 'Chest X-Ray', 'ECG', 'D-Dimer']
  },
  'Wheezing': {
    category: 'Respiratory',
    tags: ['whistle', 'noisy breathing', 'asthma'],
    doctors: ['Pulmonologist', 'Allergist'],
    severity: 'moderate',
    description: 'High-pitched whistling sound during breathing.',
    precautions: ['Avoid cold air', 'Use inhaler', 'Identify allergens (dust/pollen)'],
    possibleTests: ['Spirometry (PFT)', 'Allergy Panel', 'Chest X-Ray']
  },
  'Sneezing': {
    category: 'Respiratory',
    tags: ['achoo', 'nose', 'allergy'],
    doctors: ['General Physician', 'Allergist'],
    severity: 'low',
    description: 'Uncontrollable expulsion of air from nose.',
    precautions: ['Identify triggers', 'Use air purifier', 'Wash face frequently'],
    possibleTests: ['Allergy Skin Test', 'IgE Levels']
  },

  // --- ENT ---
  'Sore Throat': {
    category: 'ENT (Ear/Nose/Throat)',
    tags: ['pain', 'swallowing', 'scratchy', 'voice'],
    doctors: ['General Physician', 'ENT Specialist'],
    severity: 'low',
    description: 'Pain, scratchiness or irritation of the throat.',
    precautions: ['Salt water gargle', 'Drink warm liquids', 'Rest voice', 'Avoid cold foods'],
    possibleTests: ['Throat Swab', 'Rapid Strep Test']
  },
  'Runny Nose': {
    category: 'ENT (Ear/Nose/Throat)',
    tags: ['congestion', 'mucus', 'stuffy', 'cold'],
    doctors: ['General Physician'],
    severity: 'low',
    description: 'Excess drainage from the nose.',
    precautions: ['Steam inhalation', 'Hydration', 'Use saline nasal spray'],
    possibleTests: ['Flu Test', 'Allergy Panel']
  },
  'Ear Pain': {
    category: 'ENT (Ear/Nose/Throat)',
    tags: ['earache', 'blocked', 'hearing'],
    doctors: ['ENT Specialist', 'General Physician'],
    severity: 'moderate',
    description: 'Sharp, dull, or burning pain in the ear.',
    precautions: ['Keep ear dry', 'Warm compress outside ear', 'Do NOT insert Q-tips'],
    possibleTests: ['Otoscopy', 'Audiometry']
  },
  'Hoarse Voice': {
    category: 'ENT (Ear/Nose/Throat)',
    tags: ['lost voice', 'raspy', 'laryngitis'],
    doctors: ['ENT Specialist'],
    severity: 'low',
    description: 'Abnormal change in voice quality.',
    precautions: ['Complete voice rest', 'Hydration', 'Avoid whispering (strains cords)'],
    possibleTests: ['Laryngoscopy']
  },

  // --- MUSCULOSKELETAL ---
  'Back Pain': {
    category: 'Musculoskeletal',
    tags: ['spine', 'lumbar', 'lower back', 'ache'],
    doctors: ['General Physician', 'Orthopedist', 'Physiotherapist'],
    severity: 'moderate',
    description: 'Physical discomfort anywhere on the spine or back.',
    precautions: ['Maintain good posture', 'Avoid heavy lifting', 'Use firm mattress', 'Heat/Ice therapy'],
    possibleTests: ['X-Ray Spine', 'Vitamin D', 'Calcium', 'MRI Spine']
  },
  'Joint Pain': {
    category: 'Musculoskeletal',
    tags: ['knee', 'elbow', 'arthritis', 'stiff'],
    doctors: ['General Physician', 'Rheumatologist', 'Orthopedist'],
    severity: 'moderate',
    description: 'Discomfort, aches, or soreness in joints.',
    precautions: ['Rest affected area', 'Apply ice packs', 'Maintain healthy weight', 'Low impact exercise'],
    possibleTests: ['Uric Acid', 'RA Factor', 'ESR', 'X-Ray']
  },
  'Muscle Cramps': {
    category: 'Musculoskeletal',
    tags: ['spasm', 'leg', 'calf', 'charley horse'],
    doctors: ['General Physician', 'Physiotherapist'],
    severity: 'low',
    description: 'Sudden, involuntary contraction of muscle.',
    precautions: ['Gentle stretching', 'Hydrate (Electrolytes)', 'Massage area', 'Heat pack'],
    possibleTests: ['Calcium', 'Magnesium', 'Potassium', 'Vitamin D']
  },
  'Neck Pain': {
    category: 'Musculoskeletal',
    tags: ['stiff neck', 'cervical', 'posture'],
    doctors: ['Orthopedist', 'Physiotherapist'],
    severity: 'low',
    description: 'Pain in the neck area, often due to posture.',
    precautions: ['Adjust screen height', 'Neck stretches', 'Ergonomic pillow', 'Limit phone use'],
    possibleTests: ['X-Ray Cervical Spine']
  },

  // --- SKIN ---
  'Skin Rash': {
    category: 'Skin',
    tags: ['itch', 'red', 'hives', 'allergy'],
    doctors: ['General Physician', 'Dermatologist'],
    severity: 'low',
    description: 'Change in color or texture of skin.',
    precautions: ['Avoid scratching', 'Moisturize', 'Wear loose cotton clothes', 'Cold compress'],
    possibleTests: ['CBC', 'IgE Allergy Test', 'Skin Biopsy']
  },
  'Acne': {
    category: 'Skin',
    tags: ['pimples', 'zits', 'face', 'spots'],
    doctors: ['Dermatologist'],
    severity: 'low',
    description: 'Pimples, whiteheads, or blackheads on skin.',
    precautions: ['Keep face clean', 'Use oil-free products', 'Don\'t touch face', 'Change pillowcase'],
    possibleTests: ['Hormonal Profile (FSH/LH/Testosterone)']
  },
  'Itching': {
    category: 'Skin',
    tags: ['scratch', 'pruritus', 'dry skin'],
    doctors: ['Dermatologist', 'General Physician'],
    severity: 'low',
    description: 'Uncomfortable sensation aimed at scratching.',
    precautions: ['Moisturize frequently', 'Avoid hot showers', 'Use mild soap'],
    possibleTests: ['Liver Function Test', 'Kidney Function Test', 'Blood Sugar']
  },
  'Hair Loss': {
    category: 'Skin',
    tags: ['bald', 'thinning', 'alopecia', 'shedding'],
    doctors: ['Dermatologist', 'Trichologist'],
    severity: 'low',
    description: 'Excessive loss of hair from scalp.',
    precautions: ['Gentle hair care', 'Eat protein rich diet', 'Manage stress'],
    possibleTests: ['Ferritin', 'Thyroid Profile', 'Vitamin D', 'Zinc']
  },

  // --- URINARY ---
  'Burning Urination': {
    category: 'Urinary',
    tags: ['pee pain', 'dysuria', 'uti', 'stinging'],
    doctors: ['General Physician', 'Urologist'],
    severity: 'moderate',
    description: 'Pain or burning sensation during urination.',
    precautions: ['Drink plenty of water', 'Drink cranberry juice', 'Maintain hygiene', 'Don\'t hold urine'],
    possibleTests: ['Urine Routine', 'Urine Culture', 'Ultrasound KUB']
  },
  'Frequent Urination': {
    category: 'Urinary',
    tags: ['toilet often', 'bladder', 'polyuria'],
    doctors: ['General Physician', 'Urologist'],
    severity: 'moderate',
    description: 'Needing to urinate more often than usual.',
    precautions: ['Limit caffeine/alcohol', 'Check blood sugar', 'Bladder training'],
    possibleTests: ['Blood Sugar (Fasting/PP)', 'Urine Routine', 'PSA (for men)']
  },
  'Dark Urine': {
    category: 'Urinary',
    tags: ['yellow pee', 'dehydration', 'liver'],
    doctors: ['General Physician', 'Internal Medicine'],
    severity: 'moderate',
    description: 'Urine that is deeper in color than straw-yellow.',
    precautions: ['Drink 2-3 liters of water', 'Monitor for jaundice (yellow eyes)'],
    possibleTests: ['Liver Function Test', 'Urine Routine', 'Kidney Function Test']
  },

  // --- EYE ---
  'Red Eye': {
    category: 'Eye',
    tags: ['pink eye', 'bloodshot', 'conjunctivitis'],
    doctors: ['General Physician', 'Ophthalmologist'],
    severity: 'low',
    description: 'Redness of the white part of the eye.',
    precautions: ['Wash hands', 'Do not touch eyes', 'Use separate towel', 'Warm compress'],
    possibleTests: ['Eye Exam']
  },
  'Blurred Vision': {
    category: 'Eye',
    tags: ['fuzzy', 'can\'t see', 'focus'],
    doctors: ['Ophthalmologist', 'General Physician'],
    severity: 'moderate',
    description: 'Loss of sharpness of eyesight.',
    precautions: ['Rest eyes', 'Check blood sugar', 'Wear sunglasses', 'Adequate lighting'],
    possibleTests: ['Visual Acuity Test', 'Retina Scan', 'Blood Sugar']
  },
  'Eye Pain': {
    category: 'Eye',
    tags: ['hurt', 'strain', 'pressure'],
    doctors: ['Ophthalmologist'],
    severity: 'moderate',
    description: 'Discomfort or pain in or around the eye.',
    precautions: ['Rest eyes (20-20-20 rule)', 'Reduce screen time', 'Wear glasses'],
    possibleTests: ['Eye Pressure (Tonometry)', 'Eye Exam']
  },

  // --- NEUROLOGICAL ---
  'Headache': {
    category: 'Neurological',
    tags: ['head pain', 'migraine', 'tension'],
    doctors: ['General Physician', 'Neurologist'],
    severity: 'low',
    description: 'Pain in the head or upper neck.',
    precautions: ['Hydrate', 'Rest in dark quiet room', 'Cold compress', 'Sleep'],
    possibleTests: ['Eye Exam', 'BP Check', 'Sinus X-Ray']
  },
  'Dizziness': {
    category: 'Neurological',
    tags: ['vertigo', 'spinning', 'lightheaded', 'faint'],
    doctors: ['General Physician', 'ENT Specialist'],
    severity: 'moderate',
    description: 'Sensation of spinning or losing balance.',
    precautions: ['Sit down immediately', 'Move slowly', 'Drink water', 'Avoid driving'],
    possibleTests: ['BP Monitoring', 'Hemoglobin', 'Blood Sugar', 'MRI Brain']
  },
  'Numbness': {
    category: 'Neurological',
    tags: ['tingling', 'pins and needles', 'asleep'],
    doctors: ['General Physician', 'Neurologist'],
    severity: 'moderate',
    description: 'Loss of sensation or tingling in body parts.',
    precautions: ['Check for tight clothes', 'Move the limb', 'Check blood sugar'],
    possibleTests: ['Vitamin B12', 'HbA1c', 'Nerve Conduction Study']
  },

  // --- MENTAL HEALTH ---
  'Anxiety': {
    category: 'Mental Health',
    tags: ['worry', 'panic', 'nervous', 'stress'],
    doctors: ['General Physician', 'Psychiatrist', 'Psychologist'],
    severity: 'moderate',
    description: 'Excessive worry or fear interfering with daily life.',
    precautions: ['Deep breathing exercises', 'Limit caffeine', 'Meditation', 'Talk to someone'],
    possibleTests: ['Thyroid Profile', 'Cortisol Level']
  },
  'Insomnia': {
    category: 'Mental Health',
    tags: ['cant sleep', 'awake', 'restless'],
    doctors: ['General Physician', 'Psychiatrist'],
    severity: 'low',
    description: 'Difficulty falling or staying asleep.',
    precautions: ['Stick to sleep schedule', 'No screens 1 hour before bed', 'Dark cool room'],
    possibleTests: ['Thyroid Profile', 'Sleep Study']
  },
  'Depression': {
    category: 'Mental Health',
    tags: ['sad', 'hopeless', 'low mood', 'crying'],
    doctors: ['Psychiatrist', 'Psychologist'],
    severity: 'moderate',
    description: 'Persistent feeling of sadness and loss of interest.',
    precautions: ['Seek professional help', 'Stay connected with family', 'Routine exercise'],
    possibleTests: ['Vitamin D', 'Vitamin B12', 'Thyroid Profile']
  }
};

// ==========================================
// 2. SMART CONDITION MATCHING LOGIC
// ==========================================
// This helps the user identify what combination of symptoms might mean
const conditionDatabase = {
  // Respiratory / Viral
  'Fever,Cough,Sore Throat': {
    name: 'Common Cold / Viral Infection',
    urgency: 'low',
    description: 'A viral infection of your nose and throat (upper respiratory tract).',
    outcomes: ['Usually harmless', 'Resolves in 7-10 days', 'Antibiotics not needed for viruses']
  },
  'Fever,Body Ache,Chills,Fatigue': {
    name: 'Influenza (Flu)',
    urgency: 'moderate',
    description: 'A contagious respiratory illness caused by influenza viruses.',
    outcomes: ['Rest is crucial', 'Drink plenty of fluids', 'Highly contagious - stay home']
  },
  'Fever,Headache,Skin Rash,Joint Pain': {
    name: 'Dengue Fever',
    urgency: 'moderate',
    description: 'Mosquito-borne viral infection common in tropical areas.',
    outcomes: ['Hydration is critical', 'Monitor platelet count', 'Avoid NSAIDs (Aspirin/Ibuprofen)']
  },

  // Digestive
  'Diarrhea,Vomiting,Abdominal Pain': {
    name: 'Gastroenteritis (Stomach Flu) / Food Poisoning',
    urgency: 'moderate',
    description: 'Intestinal infection marked by watery diarrhea, cramps, and vomiting.',
    outcomes: ['Main risk is dehydration', 'Sip ORS frequently', 'Avoid solid food for a few hours']
  },
  'Heartburn,Bloating,Abdominal Pain': {
    name: 'GERD / Acid Reflux / Gastritis',
    urgency: 'low',
    description: 'Digestive disorder affecting the ring of muscle between your esophagus and stomach.',
    outcomes: ['Lifestyle changes usually help', 'Avoid trigger foods', 'Weight loss helps']
  },

  // Urinary
  'Burning Urination,Frequent Urination': {
    name: 'Urinary Tract Infection (UTI)',
    urgency: 'moderate',
    description: 'Infection in any part of your urinary system — your kidneys, bladder, or urethra.',
    outcomes: ['Requires antibiotics', 'Drink water to flush bacteria', 'Consult doctor']
  },

  // Deficiencies / Chronic
  'Fatigue,Dizziness,Pale Skin,Hair Loss': {
    name: 'Anemia (Iron Deficiency)',
    urgency: 'moderate',
    description: 'A condition in which you lack enough healthy red blood cells to carry adequate oxygen.',
    outcomes: ['Iron supplements needed', 'Dietary changes (spinach, meat)', 'Check for blood loss']
  },
  'Fatigue,Weight Loss,Frequent Urination,Thirst': {
    name: 'Diabetes Mellitus',
    urgency: 'moderate',
    description: 'A group of diseases that result in too much sugar in the blood (high blood glucose).',
    outcomes: ['Requires lifelong management', 'Diet control is key', 'Regular blood sugar monitoring']
  },
  'Joint Pain,Fatigue,Skin Rash': {
    name: 'Autoimmune Condition (e.g. Lupus/RA)',
    urgency: 'moderate',
    description: 'A condition in which your immune system mistakenly attacks your body.',
    outcomes: ['Needs specialist (Rheumatologist)', 'Long term medication', 'Anti-inflammatory diet']
  }
};

// ==========================================
// 3. LAB REFERENCE DATABASE (LOW VALUE LOGIC)
// ==========================================
// Defines standard minimums. If user value < min, we trigger alert.
const labReferenceData = {
  'Hemoglobin': {
    keywords: ['hemoglobin', 'hb', 'hgb'],
    min: 13.0, // Avg for adult males, slightly lower for females but safe threshold
    unit: 'g/dL',
    indication: 'Anemia (Iron Deficiency or Chronic Disease)',
    suggestions: ['Increase iron intake (Spinach, Red meat, Dates)', 'Take Iron + Vitamin C supplements', 'Avoid tea/coffee with meals'],
    specialist: 'General Physician / Hematologist'
  },
  'Platelet Count': {
    keywords: ['platelet', 'plt'],
    min: 150000,
    unit: '/µL',
    indication: 'Thrombocytopenia (Bleeding Risk)',
    suggestions: ['Avoid injury and contact sports', 'Use soft toothbrush', 'Check for viral infections like Dengue', 'Avoid blood thinners'],
    specialist: 'Hematologist / General Physician'
  },
  'WBC Count': {
    keywords: ['wbc', 'leukocyte', 'white blood'],
    min: 4000,
    unit: '/µL',
    indication: 'Leukopenia (Low Immunity)',
    suggestions: ['Practice strict hygiene', 'Avoid crowds and sick people', 'Cook food thoroughly', 'Wear a mask'],
    specialist: 'Immunologist / General Physician'
  },
  'Vitamin D': {
    keywords: ['vitamin d', '25-oh'],
    min: 20,
    unit: 'ng/mL',
    indication: 'Vitamin D Deficiency (Bone Weakness/Fatigue)',
    suggestions: ['Get morning sunlight (15-20 mins)', 'Consume fortified milk, egg yolks', 'Take Vitamin D3 supplements'],
    specialist: 'Orthopedist / General Physician'
  },
  'Vitamin B12': {
    keywords: ['vitamin b12', 'cobalamin'],
    min: 200,
    unit: 'pg/mL',
    indication: 'B12 Deficiency (Nerve Issues/Anemia)',
    suggestions: ['Eat meat, fish, dairy', 'Vegetarians may need fortified cereals', 'B12 supplements or injections'],
    specialist: 'Neurologist / General Physician'
  },
  'Ferritin': {
    keywords: ['ferritin'],
    min: 30,
    unit: 'ng/mL',
    indication: 'Low Iron Stores',
    suggestions: ['Iron supplementation', 'Focus on heme-iron foods', 'Check for blood loss sources'],
    specialist: 'Hematologist'
  },
  'Calcium': {
    keywords: ['calcium', 'ca++'],
    min: 8.5,
    unit: 'mg/dL',
    indication: 'Hypocalcemia (Bone/Muscle Issues)',
    suggestions: ['Increase dairy (milk, cheese)', 'Calcium supplements', 'Check Vitamin D levels'],
    specialist: 'Endocrinologist'
  },
  'HDL Cholesterol': {
    keywords: ['hdl', 'high density'],
    min: 40,
    unit: 'mg/dL',
    indication: 'Low Good Cholesterol (Heart Risk)',
    suggestions: ['Aerobic exercise (30 mins daily)', 'Eat healthy fats (Olive oil, Avocado, Nuts)', 'Quit smoking'],
    specialist: 'Cardiologist'
  },
  'Fasting Blood Sugar': {
    keywords: ['fasting sugar', 'glucose', 'fbs'],
    min: 70,
    unit: 'mg/dL',
    indication: 'Hypoglycemia (Low Blood Sugar)',
    suggestions: ['Carry fast-acting carbs (candy/juice)', 'Eat small regular meals', 'Review diabetes medication'],
    specialist: 'Diabetologist / General Physician'
  },
  'Potassium': {
    keywords: ['potassium', 'k+'],
    min: 3.5,
    unit: 'mEq/L',
    indication: 'Hypokalemia (Cramps/Heart Risk)',
    suggestions: ['Eat bananas, coconut water, potatoes', 'Avoid heavy sweating without electrolytes', 'Monitor heart rate'],
    specialist: 'Nephrologist / Cardiologist'
  },
  'Sodium': {
    keywords: ['sodium', 'na+'],
    min: 135,
    unit: 'mEq/L',
    indication: 'Hyponatremia (Salt Deficiency)',
    suggestions: ['Limit fluid intake slightly', 'Add moderate salt to diet', 'Check diuretics usage'],
    specialist: 'Nephrologist'
  },
  'Total Protein': {
    keywords: ['total protein'],
    min: 6.0,
    unit: 'g/dL',
    indication: 'Hypoproteinemia (Malnutrition/Liver issue)',
    suggestions: ['Increase protein intake (Eggs, Meat, Dal, Soy)', 'Check liver function'],
    specialist: 'Gastroenterologist / Dietician'
  }
};

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================

// Simple Modal Component for Disclaimer
const DisclaimerModal = ({ onClose }) => (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <span className="modal-icon">⚠️</span>
        <h2>Medical Disclaimer</h2>
      </div>
      <div className="modal-body">
        <p><strong>This application is for informational purposes only.</strong></p>
        <p>
          It is NOT a substitute for professional medical advice, diagnosis, or treatment. 
          Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
        <p>
          <strong>Emergency Warning:</strong> If you are experiencing chest pain, difficulty breathing, or severe bleeding, call emergency services immediately.
        </p>
      </div>
      <button className="modal-btn" onClick={onClose}>I Understand & Accept</button>
    </div>
  </div>
);

function App() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [symptomResults, setSymptomResults] = useState(null);
  
  // Lab State
  const [labInputText, setLabInputText] = useState('');
  const [labAnalysis, setLabAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState('symptoms');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  // --- 1. FILTERING SYMPTOMS ---
  const allSymptoms = Object.keys(symptomDatabase).sort();

  const filteredSymptoms = allSymptoms.filter(symptom => {
    const data = symptomDatabase[symptom];
    const matchesSearch = symptom.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          data.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || data.category === selectedCategory;
    
    return matchesSearch && matchesCategory && !selectedSymptoms.includes(symptom);
  });

  const toggleSymptom = (symptom) => {
    if (selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
    setSymptomResults(null); // Clear results if selection changes
  };

  // --- 2. SYMPTOM ANALYSIS ENGINE ---
  const analyzeSymptoms = () => {
    if (selectedSymptoms.length === 0) return;

    const doctorSet = new Set();
    const allPrecautions = [];
    const allTests = [];
    let maxSeverity = 'low';

    // Step A: Aggregate Data from Individual Symptoms
    selectedSymptoms.forEach(symptom => {
      const data = symptomDatabase[symptom];
      
      // Add Doctors
      data.doctors.forEach(doctor => doctorSet.add(doctor));
      
      // Add Precautions
      allPrecautions.push(...data.precautions);
      
      // Add Tests
      allTests.push(...data.possibleTests);
      
      // Calculate Severity
      if (data.severity === 'emergency') maxSeverity = 'emergency';
      else if (data.severity === 'moderate' && maxSeverity !== 'emergency') maxSeverity = 'moderate';
    });

    // Step B: Pattern Matching for Conditions
    let bestMatch = null;
    let maxMatchCount = 0;

    for (const [key, value] of Object.entries(conditionDatabase)) {
      const keySymptoms = key.split(',');
      const matchCount = keySymptoms.filter(s => selectedSymptoms.includes(s)).length;
      
      // Logic: If user has at least 2 matching symptoms of a condition, and covers >50% of that condition's list
      if (matchCount >= 2 && matchCount >= (keySymptoms.length / 2)) {
        if (matchCount > maxMatchCount) {
          maxMatchCount = matchCount;
          bestMatch = value;
        }
      }
    }

    // Update severity based on matched condition
    if (bestMatch) {
        if (bestMatch.urgency === 'emergency') maxSeverity = 'emergency';
        else if (bestMatch.urgency === 'moderate' && maxSeverity !== 'emergency') maxSeverity = 'moderate';
    }

    setSymptomResults({
      doctors: Array.from(doctorSet),
      possibleCondition: bestMatch,
      urgency: maxSeverity,
      precautions: [...new Set(allPrecautions)], // Remove duplicates
      tests: [...new Set(allTests)], // Remove duplicates
      timestamp: new Date().toLocaleString()
    });
  };

  // --- 3. LAB REPORT ANALYSIS ENGINE (Low Value Detection) ---
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsProcessing(true);
    setLabAnalysis(null);

    // Simulate PDF extraction delay (In real app, use pdf.js)
    setTimeout(() => {
        setIsProcessing(false);
        // Pre-fill with demo text to show user how it works
        const demoText = `[System] File loaded: ${file.name}.\n\n(Note: Analysis is local. Please ensure text is correct below.)\n\n--- Sample Extracted Text ---\nHemoglobin: 10.2 g/dL\nVitamin D: 15 ng/mL\nPlatelets: 130000 /µL`;
        setLabInputText(demoText);
    }, 1000);
  };

  const analyzeLabText = () => {
    if (!labInputText.trim()) return;
    setIsProcessing(true);

    const findings = [];
    // Normalize text: lowercase, remove special chars like :, -
    const lowerText = labInputText.toLowerCase().replace(/[:;,-]/g, ' '); 
    
    Object.keys(labReferenceData).forEach(testName => {
      const testData = labReferenceData[testName];
      
      // 1. Find the keyword in the text
      const foundKeyword = testData.keywords.find(k => lowerText.includes(k));
      
      if (foundKeyword) {
        // 2. Find a number appearing "near" the keyword (look ahead 35 characters)
        const index = lowerText.indexOf(foundKeyword);
        const searchWindow = lowerText.substring(index, index + 35); 
        const numberMatch = searchWindow.match(/(\d+(\.\d+)?)/);
        
        if (numberMatch) {
            const value = parseFloat(numberMatch[0]);
            
            // 3. Check if value is LOW
            if (value < testData.min) {
                findings.push({
                    test: testName,
                    value: value,
                    min: testData.min,
                    unit: testData.unit,
                    indication: testData.indication,
                    suggestions: testData.suggestions,
                    specialist: testData.specialist
                });
            }
        }
      }
    });

    setTimeout(() => {
      setLabAnalysis({
        findings: findings,
        rawLength: labInputText.length,
        timestamp: new Date().toLocaleString()
      });
      setIsProcessing(false);
    }, 800);
  };

  // --- 4. UTILITY HELPERS ---
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'emergency': return '#ef4444'; // Red
      case 'moderate': return '#f59e0b'; // Orange
      default: return '#10b981'; // Green
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="app-container">
      {showDisclaimer && <DisclaimerModal onClose={() => setShowDisclaimer(false)} />}
      
      <header className="app-header no-print">
        <div className="header-content">
          <h1>🩺 HealthAI Associate</h1>
          <p>Comprehensive Symptom Checker & Clinical Lab Assistant</p>
        </div>
      </header>

      <div className="main-interface">
        {/* Tab Navigation */}
        <div className="tabs no-print">
          <button 
            className={`tab-btn ${activeTab === 'symptoms' ? 'active' : ''}`}
            onClick={() => setActiveTab('symptoms')}
          >
            🔍 Check Symptoms
          </button>
          <button 
            className={`tab-btn ${activeTab === 'lab' ? 'active' : ''}`}
            onClick={() => setActiveTab('lab')}
          >
            📄 Analyze Lab Report
          </button>
        </div>

        {/* ==================== SYMPTOMS TAB ==================== */}
        {activeTab === 'symptoms' && (
          <div className="tab-content fade-in">
            <div className="search-section no-print">
              <div className="search-bar">
                <span className="icon">🔎</span>
                <input 
                  type="text" 
                  placeholder="Search symptoms (e.g., 'Diarrhea', 'Pain', 'Eye', 'Skin')..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="category-filters">
                <button 
                    className={`cat-btn ${selectedCategory === 'All' ? 'active' : ''}`} 
                    onClick={() => setSelectedCategory('All')}
                >All</button>
                {symptomCategories.map(cat => (
                    <button 
                        key={cat}
                        className={`cat-btn ${selectedCategory === cat ? 'active' : ''}`} 
                        onClick={() => setSelectedCategory(cat)}
                    >
                        {cat}
                    </button>
                ))}
              </div>
            </div>

            <div className="workspace">
                {/* Left Side: Symptom Pool */}
                <div className="selection-pool no-print">
                    <h3>Available Symptoms ({filteredSymptoms.length})</h3>
                    <div className="symptom-grid">
                        {filteredSymptoms.length > 0 ? (
                            filteredSymptoms.map(s => (
                                <button key={s} className="symptom-chip" onClick={() => toggleSymptom(s)}>
                                    <span className="plus">+</span> {s}
                                </button>
                            ))
                        ) : (
                            <p className="no-results">No symptoms found matching your search.</p>
                        )}
                    </div>
                </div>
                
                {/* Right Side: Selected List */}
                <div className="selected-area">
                    <div className="selected-header">
                        <h3>Selected Symptoms ({selectedSymptoms.length})</h3>
                        <button 
                            className="analyze-btn"
                            disabled={selectedSymptoms.length === 0}
                            onClick={analyzeSymptoms}
                        >
                            RUN ANALYSIS ⚡
                        </button>
                    </div>
                    
                    <div className="chips-container">
                        {selectedSymptoms.length === 0 && <p className="placeholder">Click symptoms on the left to add...</p>}
                        {selectedSymptoms.map(s => (
                            <span key={s} className="chip active" onClick={() => toggleSymptom(s)}>
                                {s} <span className="x">✕</span>
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* ANALYSIS RESULTS */}
            {symptomResults && (
              <div className="results-panel">
                <div className="result-header-row">
                    <h2>Analysis Report</h2>
                    <span className="timestamp">{symptomResults.timestamp}</span>
                </div>

                <div className="alert-box" style={{ 
                    borderLeft: `5px solid ${getSeverityColor(symptomResults.urgency)}`,
                    background: '#fff' 
                }}>
                  <div className="alert-content">
                      <span className="alert-icon" style={{ color: getSeverityColor(symptomResults.urgency) }}>
                        {symptomResults.urgency === 'emergency' ? '🚨' : symptomResults.urgency === 'moderate' ? '⚠️' : '✅'}
                      </span>
                      <div>
                        <strong>URGENCY LEVEL: {symptomResults.urgency.toUpperCase()}</strong>
                        {symptomResults.urgency === 'emergency' && <p>Please seek immediate medical attention.</p>}
                        {symptomResults.urgency === 'moderate' && <p>We recommend consulting a doctor soon.</p>}
                        {symptomResults.urgency === 'low' && <p>Monitor symptoms and practice self-care.</p>}
                      </div>
                  </div>
                </div>

                {symptomResults.possibleCondition && (
                    <div className="condition-match-card">
                        <h3>Potential Match</h3>
                        <h4>{symptomResults.possibleCondition.name}</h4>
                        <p>{symptomResults.possibleCondition.description}</p>
                        <div className="outcomes">
                            <strong>Standard Outcomes & Advice:</strong>
                            <ul>
                                {symptomResults.possibleCondition.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                            </ul>
                        </div>
                    </div>
                )}

                <div className="result-grid-3">
                  <div className="info-card">
                    <h4>👨‍⚕️ Specialists to Consult</h4>
                    <ul className="simple-list">
                      {symptomResults.doctors.map(d => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                  <div className="info-card">
                    <h4>🧪 Recommended Tests</h4>
                    <ul className="simple-list">
                      {symptomResults.tests.slice(0, 6).map(t => <li key={t}>{t}</li>)}
                    </ul>
                  </div>
                  <div className="info-card full">
                    <h4>🛡️ Care & Precautions</h4>
                    <div className="precautions-grid">
                      {symptomResults.precautions.map((p, i) => (
                          <div key={i} className="tick-item">✓ {p}</div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="print-actions no-print">
                    <button className="print-btn" onClick={handlePrint}>🖨️ Print / Save PDF</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== LAB TAB ==================== */}
        {activeTab === 'lab' && (
          <div className="tab-content fade-in">
            <div className="lab-intro no-print">
              <h3>Low Value Analyzer</h3>
              <p>We specifically scan your report for values that are <strong>below the standard reference range</strong> to provide dietary and medical suggestions.</p>
            </div>

            <div className="input-section no-print">
              <div className="file-upload-wrapper">
                 <label className="custom-file-upload">
                    <input type="file" accept=".txt,.pdf" onChange={handleFileUpload} />
                    📂 Upload Report (Text/PDF)
                 </label>
              </div>
              
              <textarea
                className="lab-textarea"
                placeholder="Paste your lab report content here...
Example:
Hemoglobin: 10.5
Vitamin B12: 150
Platelets: 130000"
                value={labInputText}
                onChange={(e) => setLabInputText(e.target.value)}
              />
              
              <button 
                className="analyze-btn primary"
                onClick={analyzeLabText}
                disabled={isProcessing || !labInputText}
              >
                {isProcessing ? 'Processing Data...' : 'Analyze for Low Values'}
              </button>
            </div>

            {labAnalysis && (
              <div className="lab-results">
                 <div className="result-header-row">
                    <h2>Lab Report Findings</h2>
                    <span className="timestamp">{labAnalysis.timestamp}</span>
                </div>

                {labAnalysis.findings.length === 0 ? (
                  <div className="good-news">
                    <div style={{fontSize: '3rem', marginBottom: '1rem'}}>✨</div>
                    <h4>No Low Values Detected</h4>
                    <p>We analyzed the text and did not find any of our tracked biomarkers below the minimum reference threshold.</p>
                  </div>
                ) : (
                  <div className="findings-container">
                    <div className="warning-banner">
                        ⚠️ Found {labAnalysis.findings.length} biomarker(s) below normal range.
                    </div>
                    
                    {labAnalysis.findings.map((item, idx) => (
                      <div key={idx} className="finding-card">
                        <div className="fc-header">
                          <div className="fc-title">{item.test}</div>
                          <div className="fc-value-box">
                             <span className="val">{item.value}</span>
                             <span className="unit">{item.unit}</span>
                             <span className="ref">(Min: {item.min})</span>
                          </div>
                        </div>
                        
                        <div className="fc-body">
                          <div className="fc-row">
                            <strong>Possible Indication</strong> {item.indication}
                          </div>
                          
                          <div className="fc-row">
                            <strong>Dietary & Lifestyle Advice</strong>
                            <ul>
                              {item.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                            </ul>
                          </div>
                          
                          <div className="fc-row">
                            <strong>Consult</strong> {item.specialist}
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="print-actions no-print">
                        <button className="print-btn" onClick={handlePrint}>🖨️ Print Results</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <footer className="footer no-print">
        <p><strong>HealthAI System v1.0</strong></p>
        <p>Privacy First: No data leaves your browser. All analysis is local.</p>
        <p>Designed by Sahil Dhiman.</p>
        <p style={{fontSize: '0.8rem', marginTop: '0.5rem'}}>Disclaimer: Not a substitute for professional medical advice.</p>
      </footer>
    </div>
  );
}

export default App;