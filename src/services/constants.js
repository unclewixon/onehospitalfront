export const DEBUG = process.env.REACT_APP_DEBUG;
export const APP_NAME = process.env.REACT_APP_NAME;
export const API_URI = process.env.REACT_APP_API;

export const TOKEN_COOKIE = 'EMR:TOKEN_COOKIE';
export const MODE_COOKIE = 'EMR:MODE_COOKIE';
export const FULLSCREEN_COOKIE = 'EMR:FULLSCREEN_COOKIE';
export const MENU_COOKE = 'EMR:MENU_COOKIE';
export const USER_RECORD = 'EMR:USER_RECORD';

export const CK_ENCOUNTER = 'E:ENCOUNTER';

export const CK_COMPLAINTS = 'E:COMPLAINTS';
export const CK_REVIEW_OF_SYSTEMS = 'E:REVIEW_OF_SYSTEMS';
export const CK_HX_FORMS = 'E:HX_FORMS';
export const CK_DIAGNOSIS = 'E:DIAGNOSIS';
export const CK_PAST_DIAGNOSIS = 'E:PAST_DIAGNOSIS';
export const CK_PAST_HISTORY = 'E:PAST_HISTORY';
export const CK_TREATMENT_PLAN = 'E:TREATMENT_PLAN';

export const hmoAPI = 'hmos';
export const cafeteriaAPI = 'cafeteria';
export const inventoryAPI = 'inventory/stocks';
export const inventoryUpdateQuantityAPI = 'inventory/stocks/update-quantity';
export const stocksAPI = 'stocks';
export const inventoryCatAPI = 'inventory/categories';
export const vendorAPI = 'inventory/vendors';
export const inventoryDownloadAPI = 'inventory/download';
export const inventoryUploadAPI = 'inventory/stocks/bulk-upload';
export const stockByCategoryAPI = 'inventory/stocks-by-category-name';
export const inventorySubCatAPI = 'inventory/sub-categories';
export const rolesAPI = 'settings/roles';
export const staffAPI = 'hr/staffs';
export const appraisalAPI = 'hr/appraisal';
export const leaveMgtAPI = 'hr/leave-management';
export const rosterAPI = 'hr/housekeeping';
export const searchAPI = 'patient/find';
export const vitalsAPI = 'patient/save-vitals';
export const departmentAPI = 'departments';
export const utilityAPI = 'utility';
export const payrollAPI = 'hr/payroll';
export const patientAPI = 'patient';
export const transactionsAPI = 'transactions';
export const vouchersAPI = 'vouchers';
export const serviceAPI = 'services';
export const settingsAPI = 'settings/';
export const diagnosisAPI = 'settings/diagnosis';
export const labourAPI = 'labour-managements';
export const consultationAPI = 'consultation/';
export const ivfEnroll = 'ivf/enroll';
export const antenatalAPI = 'patient/antenatal';
export const admissionAPI = 'patient/admissions';

export const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];
export const severities = [
	{
		value: 'Mild',
		label: 'Mild',
	},
	{ value: 'Moderate', label: 'Moderate' },
	{ value: 'Severe', label: 'Severe' },
	{ value: 'Intolerance', label: 'Intolerance' },
];
export const serviceCenter = [
	{
		value: 'lab',
		label: 'LAB',
	},
];
export const planServiceCenter = [
	{
		value: 'Pharmacy',
		label: 'Pharmacy',
	},
];
export const diagnosisType = [
	{
		value: 'Query',
		label: 'Query',
	},
	{ value: 'Differential', label: 'Differential' },
	{ value: 'Confirmed', label: 'Confirmed' },
	{ value: 'Suspected', label: 'Suspected' },
];

export const allergyCategories = [
	{ value: 'Drug', label: 'Drug' },
	{ value: 'Food', label: 'Food' },
	{ value: 'Environment', label: 'Environment' },
	{ value: 'Other', label: 'Other' },
];

export const relationships = [
	{ value: 'Father', label: 'Father' },
	{ value: 'Mother', label: 'Mother' },
	{ value: 'Sister', label: 'Sister' },
	{ value: 'Brother', label: 'Brother' },
	{ value: 'Aunt', label: 'Aunt' },
	{ value: 'Spouse', label: 'Spouse' },
	{ value: 'Others', label: 'Others' },
];

export const ethnicities = [
	{ value: '', label: 'Select Ethnicity' },
	{ value: 'Igbo', label: 'Igbo' },
	{ value: 'Hausa', label: 'Hausa' },
	{ value: 'Hausa-Fulani', label: 'Hausa-Fulani' },
	{ value: 'Yoruba', label: 'Yoruba' },
	{ value: 'Fula', label: 'Fula' },
	{ value: 'Ijaw', label: 'Ijaw' },
	{ value: 'Tiv', label: 'Tiv' },
	{ value: 'Ibibio', label: 'Ibibio' },
	{ value: 'Ogoni', label: 'Ogoni' },
	{ value: 'Kunari', label: 'Kunari' },
	{ value: 'Urhobo', label: 'Urhobo' },
	{ value: 'Efik', label: 'Efik' },
	{ value: 'Edo', label: 'Edo' },
	{ value: 'Idoma', label: 'Idoma' },
	{ value: 'Itsekiri', label: 'Itsekiri' },
	{ value: 'Nupe', label: 'Nupe' },
	{ value: 'Igala', label: 'Igala' },
	{ value: 'Gbagyi', label: 'Gbagyi' },
	{ value: 'Ebira', label: 'Ebira' },
	{ value: 'Egba', label: 'Egba' },
	{ value: 'Anaang', label: 'Anaang' },
	{ value: 'Berom', label: 'Berom' },
	{ value: 'Ekoi', label: 'Ekoi' },
	{ value: 'Chamba', label: 'Chamba' },
	{ value: 'Afusari', label: 'Afusari' },
	{ value: 'Esan', label: 'Esan' },
	{ value: 'Saro', label: 'Saro' },
	{ value: 'Anioma', label: 'Anioma' },
	{ value: 'Zarma', label: 'Zarma' },
	{ value: 'Mambila', label: 'Mambila' },
	{ value: 'Atyap', label: 'Atyap' },
	{ value: 'Longuda', label: 'Longuda' },
	{ value: 'Kuteb', label: 'Kuteb' },
	{ value: 'Bajju', label: 'Bajju' },
	{ value: 'Mumuye', label: 'Mumuye' },
	{ value: 'Tarok', label: 'Tarok' },
	{ value: 'Isoko', label: 'Isoko' },
	{ value: 'Kirdi', label: 'Kirdi' },
	{ value: 'Fon', label: 'Fon' },
	{ value: 'Ikwere', label: 'Ikwere' },
	{ value: 'Anlo', label: 'Anlo' },
	{ value: 'Iwellemmedan', label: 'Iwellemmedan' },
	{ value: 'Bariba', label: 'Bariba' },
	{ value: 'Ibani', label: 'Ibani' },
	{ value: 'Kotoko', label: 'Kotoko' },
	{ value: 'Eloyi', label: 'Eloyi' },
	{ value: 'Kamuku', label: 'Kamuku' },
	{ value: 'Mandara', label: 'Mandara' },
	{ value: 'Others', label: 'Others' },
];

export const genders = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
];

export const maritalStatuses = [
	{ value: 'Single', label: 'Single' },
	{ value: 'Married', label: 'Married' },
];

export const yesNO = [
	{ value: 'Yes', label: 'Yes' },
	{ value: 'No', label: 'No' },
];

export const documentType = [
	{ id: 'Case notes', name: 'Case notes' },
	{ id: 'Admissions', name: 'Admissions' },
	{ id: 'Financial', name: 'Financial' },
	{ id: 'Labs', name: 'Labs' },
	{ id: 'Imaging', name: 'Imaging' },
	{ id: 'Procedures', name: 'Procedures' },
	{ id: 'Antenatal', name: 'Antenatal' },
	{ id: 'Prescription', name: 'Prescription' },
];

export const paymentTypeExtra = [
	{ value: 'POS', label: 'POS' },
	{ value: 'Cash', label: 'Cash' },
	{ value: 'Cheque', label: 'Cheque' },
	{ value: 'Transfer', label: 'Transfer' },
	{ value: 'Hmo', label: 'Hmo' },
];

export const paymentType = [
	{ value: 'POS', label: 'POS' },
	{ value: 'Cash', label: 'Cash' },
	{ value: 'Cheque', label: 'Cheque' },
	{ value: 'Transfer', label: 'Transfer' },
];

export const transactionPaymentType = [
	{ id: 'POS', name: 'POS' },
	{ id: 'Cash', name: 'Cash' },
	{ id: 'Cheque', name: 'Cheque' },
	{ id: 'Transfer', name: 'Transfer' },
	{ id: 'Voucher', name: 'Voucher' },
	{ id: 'Hmo', name: 'Hmo' },
];

export const insuranceStatus = [
	{ value: 'HMO', label: 'HMO' },
	{ value: 'Cooperate', label: 'Cooperate' },
	{ value: 'Private', label: 'Private' },
];

export const vitalItems = [
	'Blood Pressure',
	'BMI',
	'BSA',
	'Dilation',
	'Fetal Heart Rate',
	'Fundus Height',
	'Glucose',
	'Head Circumference',
	'Height',
	'Length of Arm',
	'MUAC',
	'Mid-Arm Circumference',
	'Pain Scale',
	'PCV',
	'Protein',
	'Pulse',
	'Respiration',
	'SpO2',
	'Surface Area',
	'Temperature',
	'Urine',
	'Weight',
];

export const allVitalItems = [
	{ name: 'Blood Pressure', unit: 'mmHg' },
	{ name: 'BMI', unit: 'kg/m²' },
	{ name: 'BSA', unit: 'kg/m²' },
	{ name: 'Dilation', unit: 'cm' },
	{ name: 'Fetal Heart Rate', unit: 'bps' },
	{ name: 'Fundus Height', unit: 'cm' },
	{ name: 'Glucose', unit: 'mg/dL' },
	{ name: 'Head Circumference', unit: 'cm' },
	{ name: 'Height', unit: 'm' },
	{ name: 'Length of Arm', unit: 'cm' },
	{ name: 'MUAC', unit: '' },
	{ name: 'Mid-Arm Circumference', unit: 'cm' },
	{ name: 'Pain Scale', unit: '' },
	{ name: 'PCV', unit: '%' },
	{ name: 'Protein', unit: '' },
	{ name: 'Pulse', unit: 'beats/min' },
	{ name: 'Respiration', unit: 'breaths/min' },
	{ name: 'SpO2', unit: '%' },
	{ name: 'Surface Area', unit: 'cm²' },
	{ name: 'Temperature', unit: '°C' },
	{ name: 'Urine', unit: '' },
	{ name: 'Weight', unit: 'kg' },
];

export const requestTypes = [
	{
		value: 'Imaging',
		label: 'Imaging',
	},
	{
		value: 'Pharmacy',
		label: 'Pharmacy',
	},
	{
		value: 'Clinical lab',
		label: 'Clinical lab',
	},
];

export const encounters = [
	'Presenting Complaints',
	'Review of Systems',
	'Hx',
	'Past Medical History',
	'Allergies',
	'Physical Examination',
	'Diagnosis',
	'Investigations',
	'Plan',
	'Consumable',
];

export const soap = [
	'Current Complaints',
	'Review Of Systems',
	'Physical Examination Summary',
	'Diagnosis',
	'Plan',
];

export const assessmentMenu = [
	'Note',
	'General Assessment',
	'Lab',
	'Radiology',
	'Prescription',
	'Next Appointment',
];

export const bookingPeriod = [
	{
		id: 'Routine',
		name: 'Routine',
	},
	{
		id: 'Complication',
		name: 'Complication',
	},
];

export const lmpSource = [
	{
		id: 'Patient',
		name: 'Patient',
	},
	{
		id: 'Scan',
		name: 'Scan',
	},
];

export const gravida = [
	{
		id: 'Primi Gravida (G1)',
		name: 'Primi Gravida (G1)',
	},
	{
		id: 'Second Gravida (G2)',
		name: 'Second Gravida (G2)',
	},

	{
		id: 'Third Gravida (G3)',
		name: 'Third Gravida (G3)',
	},

	{
		id: 'Fourth Gravida (G4)',
		name: 'Fourth Gravida (G4)',
	},
	{
		id: 'Fifth Gravida (G5)',
		name: 'Fifth Gravida (G5)',
	},

	{
		id: 'Sixth Gravida (G6)',
		name: 'Sixth Gravida (G6)',
	},

	{
		id: 'Seventh Gravida (G7)',
		name: 'Seventh Gravida (G7)',
	},

	{
		id: 'Eighth Gravida (G8)',
		name: 'Eighth Gravida (G8)',
	},

	{
		id: 'Ninth Gravida (G9)',
		name: 'Ninth Gravida (G9)',
	},
	{
		id: 'Tenth Gravida (10)',
		name: 'Tenth Gravida (10)',
	},
	{
		id: 'Eleventh Gravida (G11)',
		name: 'Eleventh Gravida (G11)',
	},
	{
		id: 'Twelveth Gravida (G12)',
		name: 'Twelveth Gravida (G12)',
	},
];

export const para = [
	{
		id: 'Zero (P0)',
		name: 'Zero (P0)',
	},
	{
		id: 'Primi Para (P1)',
		name: 'Primi Para (P1)',
	},
	{
		id: 'Second Para (P2)',
		name: 'Second Para (P2)',
	},

	{
		id: 'Third Para (G3)',
		name: 'Third Para (G3)',
	},

	{
		id: 'Fourth Para (G4)',
		name: 'Fourth Para (G4)',
	},
	{
		id: 'Fifth Para (G5)',
		name: 'Fifth Para (G5)',
	},

	{
		id: 'Sixth Para (G6)',
		name: 'Sixth Para (G6)',
	},

	{
		id: 'Seventh Para (G7)',
		name: 'Seventh Para (G7)',
	},

	{
		id: 'Ninth Para (G9)',
		name: 'Ninth Para (G9)',
	},
	{
		id: 'Tenth Para (10)',
		name: 'Tenth Para (10)',
	},
	{
		id: 'Eleventh Para (G11)',
		name: 'Eleventh Para (G11)',
	},
];

export const previousPregnancies = [...Array(12).keys()].map(i => ({
	id: i,
	name: i,
}));

export const obstericHistory = [
	{
		id: 'Family History',
		name: 'Family History',
	},
	{
		id: 'Social History',
		name: 'Social History',
	},
	{
		id: 'Gynae History',
		name: 'Gynae History',
	},
	{
		id: 'Obsteric History',
		name: 'Obsteric History',
	},
	{
		id: 'Sexual History',
		name: 'Sexual History',
	},
	{
		id: 'Gynae Pap-Mear History',
		name: 'Gynae Pap-Mear History',
	},
	{
		id: 'FGM',
		name: 'FGM',
	},
	{
		id: 'Past Ocular History',
		name: 'Past Ocular History',
	},
	{
		id: 'Antenatal General/Physical Examination',
		name: 'Antenatal General/Physical Examination',
	},
	{
		id: 'Antenatal Initial Assessment',
		name: 'Antenatal Initial Assessment',
	},

	{
		id: 'Antenatal Lab Observations',
		name: 'Antenatal Lab Observations',
	},
	{
		id: 'Antenatal Routine Assessments',
		name: 'Antenatal Routine Assessments',
	},
];

export const reviewOfSystem = [
	{
		label: 'Musculoskeletal',
		value: 'Musculoskeletal',
		children: [
			'Muscle of join pain',
			'Stiffness',
			'Back pain',
			'Redness of joints',
			'Swelling of joints',
			'Trauma',
		],
	},
	{
		label: 'Endocrine',
		value: 'Endocrine',
		children: [
			'Heat or cold intolerance',
			'Sweating',
			'Frequent urination',
			'Thirst',
			'Change in appetite',
		],
	},
	{
		label: 'Neurologic',
		value: 'Neurologic',
		children: [
			'Dizziness',
			'Fainting',
			'Seizures',
			'Weakness',
			'Numbness',
			'Tingling',
			'Tremor',
		],
	},
	{
		label: 'Skin',
		value: 'Skin',
		children: [
			'Rashness',
			'Lumps',
			'Itching',
			'Dryness',
			'Color Changes',
			'Hair and nail changes',
		],
	},
	{
		label: 'Head',
		value: 'Head',
		children: ['Headache', 'Head Injury', 'Neck Pain'],
	},
	{
		label: 'Neck',
		value: 'Neck',
		children: ['Lumps', 'Swollen glands', 'Pain', 'Stiffness'],
	},
	{
		label: 'Vascular',
		value: 'Vascular',
		children: ['Calf pain with walking', 'Leg cramping'],
	},
	{
		label: 'Eyes',
		value: 'Eyes',
		children: [
			'Vision Los/Changes',
			'Glasses or Contacts',
			'Pain',
			'Redness',
			'Blurry or double vision',
			'Flashing lights',
			'Specks',
			'Glaucoma',
			'Cataracts',
			'Last eye Exam',
		],
	},
	{
		label: 'Ears',
		value: 'Ears',
		children: ['Decreased Hearing', 'Ringing in Ears', 'Earache', 'Drainage'],
	},
	{
		label: 'Gastrointestinal',
		value: 'Gastrointestinal',
		children: [
			'Swallowing difficulties',
			'Heartburn',
			'Change in appetite',
			'Nausea',
			'Change in Bowel Habits',
			'Rectal bleeding',
			'Constipatiopn',
			'Diarrhea',
			'Yellow eyes or skin',
		],
	},
	{
		label: 'General',
		value: 'General',
		children: [
			'Weight loss or gain',
			'Fatigue',
			'Fever or Chills',
			'Weakness',
			'Trouble sleeping',
		],
	},
	{
		label: 'Haematologic',
		value: 'Haematologic',
		children: ['Ease of Bruising', 'Ease of bleeding'],
	},
	{
		label: 'Urinary',
		value: 'Urinary',
		children: [
			'Frequency',
			'Urgency',
			'Burning or pain',
			'Blood in urine',
			'Incontinence',
			'Change in urinart strength',
		],
	},
	{
		label: 'Respiratory',
		value: 'Respiratory',
		children: [
			'Cough',
			'Sputum',
			'Coughing up blood',
			'Shortness of breath',
			'Wheezing',
			'Painful breathing',
		],
	},
	{
		label: 'Nose',
		value: 'Nose',
		children: [
			'Stuffiness',
			'Discharge',
			'Itching',
			'Hay fever',
			'Nosebleeds',
			'Sinus pain',
		],
	},
	{
		label: 'Cardiovascular',
		value: 'Cardiovascular',
		children: [
			'Chest pain or discomfort',
			'Tightness',
			'Palpitations',
			'Shortness of breath with activity',
			'Difficult breathing lying down',
			'Swelling',
			'Sudden awakening from sleeps with shortness of breath',
		],
	},
	{
		label: 'Throat',
		value: 'Throat',
		children: [
			'Bleeding',
			'Dentures',
			'Sore tongue',
			'Dry mouth',
			'Sore throat',
			'Hoarseness',
			'Thrush',
			'Non-healing sores',
		],
	},
	{
		label: 'Breasts',
		value: 'Breasts',
		children: ['Lumps', 'Pain', 'Discharge', 'Self exams', 'Breast feeding'],
	},
	{
		label: 'Psychiatric',
		value: 'Psychiatric',
		children: ['Nervousness', 'Stress', 'Depression', 'Memory loss'],
	},
];

export const physicalExamination = [
	{
		label: 'Neurologic',
		value: 'Neurologic',
		children: ['Cranial Nerve II through XII intact', 'Focal Delicity'],
	},
	{
		label: 'Pelvic',
		value: 'Pelvic',
		children: [
			'Rashes',
			'Normal Bartholin Gland',
			'Vaginal Mucosa of Norma Constitency Without Atrophy or Discharge',
			'Cervical Os Without Discharge',
			'Bimanual: Cervical motion tenderness',
			'Bimanual: no vaginal Bleeding',
			'Discharge',
			'Masses',
		],
	},
	{
		label: 'Psychiatric',
		value: 'Psychiatric',
		children: [
			'Normal affect',
			'Hallucinations',
			'Normal Speech',
			'Dysarthria',
		],
	},
	{
		label: 'Extremities',
		value: 'Extremities',
		children: ['Cyanosis/Clubbing or Edema'],
	},
	{
		label: 'Rectal',
		value: 'Rectal',
		children: [
			'Bright red blood per rectum',
			'Melena',
			'Masses',
			'Normal Sphincter Tone',
			'External or Internal hermorrhoids',
			'Prostate Walnut Size Without Nodularity or Hypertrophy',
			'Prostate tenderness',
		],
	},
	{
		label: 'Head',
		value: 'Head',
		children: ['Headache', 'Head Injury', 'Neck Pain'],
	},
	{
		label: 'Cardiovascular',
		value: 'Cardiovascular',
		children: [
			'Regular rate and rhythm',
			'S1 and S2 are normal',
			'Murmurs/rubs/or gallops',
			'Point of maximal intensity non displaced and non sustained',
			'Hapatojugular Reflux',
			'Capillary Refill Less Than 2 Seconds',
		],
	},
	{
		label: 'Genitourinary',
		value: 'Genitourinary',
		children: [
			'Rashes',
			'Penile Discharge',
			'Penile Shaft Without Masses of Lesions',
			'Inguinal Hernia',
			'Inguinal Lymphadenopathy',
			'Bilateral Testicles Normal In Consistency Without Hydrocele or Vancocele',
			'Hypospadias or Epispadias',
		],
	},
	{
		label: 'Lungs',
		value: 'Lungs',
		children: [
			'Clear to auscultation bilaterally',
			'Rales/Rhonci/Wheezes',
			'Egophany',
			'Tactice Fremitus',
			'Normal Percussion',
		],
	},
	{
		label: 'Neck',
		value: 'Neck',
		children: [
			'Suppke',
			'Jugular Venous Distention',
			'Lymphadenopathy',
			'Carotid bruit',
		],
	},
	{
		label: 'Musculoskeletal',
		value: 'Musculoskeletal',
		children: ['Normal range of motion', 'Joint swelling or errythema'],
	},
	{
		label: 'Abdomen',
		value: 'Abdomen',
		children: [
			'Obese no pulsatile masses',
			'Pulsatile Masses',
			'Normal Bowel Sounds Normal in All Four Quadrants',
			'High Pitched or Tinkling Sounds',
			'Resonant to Percussion',
			'Soft',
			'Non-Distrended/Non-Tender',
			'Rebound or Guarding',
			'Castovertebral Angle Tenderness',
			'Hypatospienomegaly',
		],
	},
	{
		label: 'Lymphatic',
		value: 'Lymphatic',
		children: ['Lymphadenopathy'],
	},
	{
		label: 'General',
		value: 'General',
		children: [
			'Acute Distress',
			'Alert, Awake, and Oriented Times 4 Tot Name, Place, Time, Purpose',
			'Well developed well nourished African American Male',
			'Well developed well nourished African American Female',
			'Well developed well nourished African White Male',
			'Well developed well nourished African White Female',
		],
	},
	{
		label: 'Head, Eyes, Ears, Nose, Throat',
		value: 'Head, Eyes, Ears, Nose, Throat',
		children: [
			'Normocephalic atraumatic',
			'Mucous Membranes Moist',
			'Extraocular Muscles Intact',
			'Pupils equally round and reactive to light and acommodation',
			'Bilateral tympanic membrane intact and reactive to light',
			'Bilateral sclera anicteric',
			'Conjunctival Injection',
		],
	},
	{
		label: 'Skin',
		value: 'Skin',
		children: ['Intact', 'Rashness', 'Lesions', 'Errythema'],
	},
];

export const patientHx = [
	{
		label: 'Social Hx',
		children: [
			{ name: 'marital_status', label: 'Marital Status' },
			{ name: 'occupation', label: 'Occupation' },
			{ name: 'house_environment', label: 'House Environment' },
			{ name: 'daily_routine', label: 'Daily Routine' },
			{ name: 'dietary_patterns', label: 'Dietary Patterns' },
			{ name: 'exercise_patterns', label: 'Exercise Patterns' },
			{ name: 'sleep_patterns', label: 'Sleep Patterns' },
			{ name: 'coffee_consuption', label: 'Coffee Consumption' },
			{ name: 'tobacco_use', label: 'Tobacco Use' },
			{ name: 'alcohol_use', label: 'Alcohol Use' },
			{ name: 'drug_use', label: 'Drug Use' },
		],
	},
	{
		label: 'Family Hx',
		children: [
			{ name: 'child_health_history', label: 'Child Health History' },
			{ name: 'adult_health_history', label: 'Adult Health History' },
			{ name: 'hereditary_disease', label: 'Hereditary Disease' },
			{ name: 'mother_health_status', label: 'Mother Health Status' },
			{ name: 'mother_age_of_death', label: 'Mother Age of Death' },
			{ name: 'mother_cause_of_death', label: 'Mother Cause of Death' },
			{ name: 'father_health_status', label: 'Father Health Status' },
			{ name: 'father_age_of_death', label: 'Father Age of Death' },
			{ name: 'father_cause_of_death', label: 'Father Cause of Death' },
			{ name: 'siblings_age_of_death', label: 'Siblings Age of Death' },
			{ name: 'siblings_cause_of_death', label: 'Siblings Cause of Death' },
		],
	},
	{
		label: 'Gynae Hx',
		children: [
			{ name: 'merarche', label: 'Merarche' },
			{ name: 'menstral_cycle', label: 'Menstral Cycle' },
			{ name: 'lmp', label: 'LMP' },
			{ name: 'contraception', label: 'Contraception' },
			{
				name: 'method_of_contraception',
				label: 'Method/Type of Contraception',
			},
			{ name: 'dysmenorrhea', label: 'Dysmenorrhea' },
			{
				name: 'abnormal_menstrual_bleeding',
				label: 'Abnormal Menstrual Bleeding',
			},
		],
	},
	{
		label: 'Sexual Hx',
		children: [
			{ name: 'coitarche', label: 'Coitarche' },
			{ name: 'no_sexual_partner', label: 'No of Sexual Partner' },
			{ name: 'method_of_sex', label: 'Method of Sex' },
			{ name: 'current_partner', label: 'Current Partner' },
			{ name: 'Dyspareunia', label: 'Dyspareunia' },
			{ name: 'satisfaction', label: 'Satisfaction' },
			{ name: 'history_of_assault', label: 'History of Assault or Abuse' },
		],
	},
	{
		label: 'Gynae Pap-Smear Hx',
		children: [
			{ name: 'abnormal_pap_smear', label: 'Abnormal Pap-smear' },
			{ name: 'follow_up', label: 'Follow Up & Treatment' },
		],
	},
	{
		label: 'FGM Hx',
		children: [
			{ name: 'fgm', label: 'FGM' },
			{ name: 'type', label: 'Type' },
		],
	},
	{
		label: 'Past Ocular Hx',
		children: [
			{ name: 'ocular_trauma', label: 'History of Ocular Trauma' },
			{
				name: 'spectacle_correction',
				label: 'History of Spectacle Correction',
			},
			{ name: 'ocular_surgery', label: 'History of Ocular Surgery' },
			{ name: 'ocular_medication', label: 'History of Ocular Medication' },
			{
				name: 'traditional_medication',
				label: 'Including Traditional Medication',
			},
			{ name: 'eye_examination', label: 'Last eye examination' },
		],
	},
	{
		label: 'Antenatal General/Physical Examination',
		children: [
			{ name: 'oedma', label: 'Oedma' },
			{ name: 'breasts', label: 'Breasts' },
			{ name: 'goitre', label: 'Goitre' },
			{ name: 'teeth', label: 'Teeth' },
			{ name: 'nutrition', label: 'Nutrition' },
			{ name: 'amenia', label: 'Amenia' },
			{ name: 'cvs', label: 'CVS' },
			{ name: 'comment', label: 'Comment' },
		],
	},
	{
		label: 'Antenatal Initial Assesment',
		children: [
			{ name: 'menarche', label: 'menarche' },
			{ name: 'menstral_cycle', label: 'Menstral Cycle' },
			{ name: 'first_movement', label: 'Date of first Movement' },
			{ name: 'w_r', label: 'W.R' },
			{ name: 'height', label: 'Height' },
			{ name: 'weight', label: 'Weight' },
			{ name: 'hieght_of_fundus', label: 'Height of Fundus' },
			{ name: 'position', label: 'Position' },
			{ name: 'engaged', label: 'Engaged' },
		],
	},
	{
		label: 'Antenatal Lab Observations',
		children: [
			{ name: 'h_b', label: 'H.B' },
			{ name: 'h_b_s_a_g', label: 'HBSAG' },
			{ name: 'hiv', label: 'HIV' },
			{ name: 'vdrl', label: 'VDRL' },
			{ name: 'urinalysis', label: 'Urinalysis' },
			{ name: 'urin', label: 'urine' },
			{ name: 'comment', label: 'Comment' },
		],
	},
	{
		label: 'Antenatal Routre Assesment',
		children: [
			{ name: 'gestational_date', label: 'Gestational Date' },
			{ name: 'height_of_fundus', label: 'Height of Funds' },
			{ name: 'presentation', label: 'Presentation/Position' },
			{
				name: 'realtion_to_brim',
				label: 'Relation of Presentation Part of Brim',
			},
			{ name: 'fetal_heart', label: 'Fetal Heart' },
			{ name: 'weight', label: 'Weight' },
			{ name: 'oedema', label: 'Oedema' },
		],
	},
];

export const bloodGroup = [
	{
		id: 'A+',
		name: 'A+',
	},
	{
		id: 'A-',
		name: 'A-',
	},
	{
		id: 'B+',
		name: 'B+',
	},
	{
		id: 'B-',
		name: 'B-',
	},
	{
		id: 'AB+',
		name: 'AB+',
	},
	{
		id: 'O+',
		name: 'O+',
	},
	{
		id: 'O-',
		name: 'O-',
	},
];
export const genotype = [
	{
		id: 'AA',
		name: 'AA',
	},
	{
		id: 'AS',
		name: 'AS',
	},
	{
		id: 'AC',
		name: 'AC',
	},
	{
		id: 'SS',
		name: 'SS',
	},
];

export const caput = [
	{
		id: '0: No capot',
		name: '0: No capot',
	},
	{
		id: '+: Small capot',
		name: '+: Small capot',
	},
	{
		id: '++: Moderate',
		name: '++: Moderate',
	},
	{
		id: '+++: Large Capot',
		name: '+++: Large Capot',
	},
];

export const moulding = [
	{
		id: '0: no moulding',
		name: '0: no moulding',
	},
	{
		id: '+: Suture are apposed',
		name: '+: Suture are apposed',
	},
	{
		id: '++: Sutures overlapped but reducible',
		name: '++: Sutures overlapped but reducible',
	},
	{
		id: '+++: Sutures overlapped and not reducible',
		name: '+++: Sutures overlapped and not reducible',
	},
];

export const cervicalPosition = [
	{
		id: 'Anterior',
		name: 'Anterior',
	},
	{
		id: 'Posterior',
		name: 'Posterior',
	},
	{
		id: 'Midline',
		name: 'Midline',
	},
];

export const descent = [
	{
		id: '5: Completely above',
		name: '5: Completely above',
	},
	{
		id: '4: Sinciput high, occiput easily felt',
		name: '4: Sinciput high, occiput easily felt',
	},
	{
		id: '3: Sinciput easily felt, occiput felt',
		name: '3: Sinciput easily felt, occiput felt',
	},
	{
		id: '2: Sinciput felt, Occiput just felt',
		name: '2: Sinciput felt, Occiput just felt',
	},
	{
		id: '1: Sinciput felt, occiput not felt',
		name: '1: Sinciput felt, occiput not felt',
	},
	{
		id: '0: None of head palpable',
		name: '0: None of head palpable',
	},
];

export const religions = [
	{ value: 'Atheist', label: 'Atheist' },
	{ value: 'Buddhism', label: 'Buddhism' },
	{ value: 'Christianity', label: 'Christianity' },
	{ value: 'Hinduism', label: 'Hinduism' },
	{ value: 'Islam', label: 'Islam' },
];

export const contracts = [
	{ value: 'Full time', label: 'Full time' },
	{ value: 'Part time', label: 'Part time' },
];

export const paginate = {
	lastPage: 0,
	itemsPerPage: 0,
	totalPages: 0,
	currentPage: 0,
};

export const alphabets = [
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W',
	'X',
	'Y',
	'Z',
];

export const defaultEncounter = {
	complaints:
		'<p><u>Presenting Complaints/History of complains:</u>&nbsp;</p><p><br></p><p><br></p><p><br></p><p><u><br></p>',
	reviewOfSystem: [],
	patientHistorySelected: [],
	medicalHistory:
		'<p><u>Past Medical History:</u>&nbsp;</p><p><br></p><p><br></p><p><br></p><p><u><br></p>',
	allergies: [],
	pastAllergies: [],
	physicalExamination: [],
	physicalExaminationNote: '',
	diagnosis: [],
	pastDiagnosis: [],
	investigations: {
		labRequest: null,
		radiologyRequest: null,
		pharmacyRequest: null,
		procedureRequest: null,
	},
	treatmentPlan: '<p><u>Treatment Plan:</u>&nbsp;</p><p><br></p>',
	nextAppointment: null,
	instruction: '',
	consumables: null,
};

export const allUnitOfMeasures = [
	'Ampoule',
	'Bag',
	'Basket',
	'Bottle',
	'Bowl',
	'Card',
	'Caplet',
	'Capsule',
	'Carton',
	'Cartridge',
	'Device',
	'Dose',
	'Injection',
	'Jar',
	'Kg',
	'Medical Device',
	'Mudu',
	'Nebules',
	'Packet',
	'Patch',
	'Pen',
	'Pieces',
	'Plaster',
	'Prefilled Syringe',
	'Pressurized Container / Aerosol',
	'Pump Spray',
	'Sachet',
	'Suppositories',
	'Tablet',
	'Tin',
	'Tube',
	'Vial',
];

export const specialties = [
	{ value: 'General Medicine', label: 'General Medicine' },
	{ value: 'Anaesthesiology', label: 'Anaesthesiology' },
	{ value: 'Paediatrics', label: 'Paediatrics' },
	{ value: 'Obstetrics & Gynaecology', label: 'Obstetrics & Gynaecology' },
	{ value: 'IVF', label: 'IVF' },
	{ value: 'Scrub Nurse', label: 'Scrub Nurse' },
];

export const noteTypes = [
	{ value: 'Findings', label: 'Findings' },
	{ value: 'Post-Procedure', label: 'Post-Procedure' },
	{ value: 'Pre-Procedure', label: 'Pre-Procedure' },
];

export const brims = [
	{ id: '0/5', name: '0/5' },
	{ id: '1/5', name: '1/5' },
	{ id: '2/5', name: '2/5' },
	{ id: '3/5', name: '3/5' },
	{ id: '4/5', name: '4/5' },
	{ id: '5/5', name: '5/5' },
];

export const fetalPositions = [
	{ id: 'Cephalic', name: 'Cephalic' },
	{ id: 'Breech', name: 'Breech' },
];

export const fetalLies = [
	{ id: 'Longitudinal', name: 'Longitudinal' },
	{ id: 'Oblique', name: 'Oblique' },
	{ id: 'Transaverse', name: 'Transaverse' },
];
