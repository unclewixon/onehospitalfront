import socketIOClient from 'socket.io-client';

export const DEBUG = process.env.REACT_APP_DEBUG;
export const APP_NAME = process.env.REACT_APP_NAME;
export const BASE_API = process.env.REACT_APP_API;

export const API_URI = `${BASE_API}`;
export const TOKEN_COOKIE = 'EMR:TOKEN_COOKIE';
export const MODE_COOKIE = 'EMR:MODE_COOKIE';
export const FULLSCREEN_COOKIE = 'EMR:FULLSCREEN_COOKIE';
export const USER_RECORD = 'EMR:USER_RECORD';
export const socket = socketIOClient(API_URI, { transports: ['websocket'] });

export const hmoAPI = '/hmos';
export const inventoryAPI = '/inventory/stocks';
export const inventoryUpdateQuantityAPI = '/inventory/stocks/update-quantity';
export const stocksAPI = '/stocks';
export const inventoryCatAPI = '/inventory/categories';
export const inventoryDownloadAPI = '/inventory/download';
export const inventoryUploadAPI = '/inventory/stocks/bulk-upload';
export const inventorySubCatAPI = '/inventory/sub-categories';
export const rolesAPI = '/settings/roles';
export const staffAPI = '/hr/staffs';
export const leaveMgtAPI = '/hr/leave-management';
export const rosterAPI = '/hr/housekeeping';
export const searchAPI = '/patient/find';
export const vitalsAPI = '/patient/save-vitals';
export const departmentAPI = '/departments';
export const utilityAPI = '/utility';
export const payrollAPI = '/hr/payroll';
export const patientAPI = '/patient';
export const transactionsAPI = '/transactions';
export const vouchersAPI = '/vouchers';
export const serviceAPI = '/services';
export const settingsAPI = '/settings/';
export const diagnosisAPI = '/settings/diagnosis';

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

export const relationships = [
	{ value: 'Father', label: 'Father' },
	{ value: 'Mother', label: 'Mother' },
	{ value: 'Sister', label: 'Sister' },
	{ value: 'Brother', label: 'Brother' },
	{ value: 'Aunt', label: 'Aunt' },
	{ value: 'Others', label: 'Others' },
];

export const ethnicities = [
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
];

export const gender = [
	{ value: 'Male', label: 'Male' },
	{ value: 'Female', label: 'Female' },
];

export const maritalStatus = [
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
	'Others',
];

export const requestTypes = [
	{
		value: 'Physiotherapy',
		label: 'Physiotherapy',
	},
	{
		value: 'Dentistry',
		label: 'Dentistry',
	},
	{
		value: 'Opthalmology',
		label: 'Opthalmology',
	},
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
	'Physical Examination Summary',
	'Diagnosis',
	'Investigations',
	'Plan',
	'Consumable',
];

export const reviewOfSystem = [
	{
		label: 'Musculoskeletal',
		children: [
			'Muscle of join pain',
			'Stiffness',
			'Back pain',
			'Redness of joints',
			'Swelling of joints',
			'Trauma'
		]
	},
	{
		label: 'Endocrine',
		children: [
			'Heat or cold intolerance',
			'Sweating',
			'Frequent urination',
			'Thirst',
			'Change in appetite'
		]
	},{
		label: 'Neurologic',
		children: [
			'Dizziness',
			'Fainting',
			'Seizures',
			'Weakness',
			'Numbness',
			'Tingling',
			'Tremor'
		]
	},{
		label: 'Skin',
		children: [
			'Rashness',
			'Lumbps',
			'Itching',
			'Dryness',
			'Color Changes',
			'Hair and nail changes'
		]
	},{
		label: 'Head',
		children: [
			'Headache',
			'Head Injury',
			'Neck Pain'
		]
	},{
		label: 'Neck',
		children: [
			'Lumps',
			'Swollen glands',
			'Pain',
			'Stiffness'
		]
	},{
		label: 'Vascular',
		children: [
			'Calf pain with walking',
			'Leg cramping'
		]
	},{
		label: 'Eyes',
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
			'Last eye Exam'
		]
	},{
		label: 'Ears',
		children: [
			'Decreased Hearing',
			'Ringing in Ears',
			'Earache',
			'Drainage'
		]
	},{
		label: 'Gastrointestinal',
		children: [
			'Swallowing difficulties',
			'Heartburn',
			'Change in appetite',
			'Nausea',
			'Change in Bowel Habits',
			'Rectal bleeding',
			'Constipatiopn',
			'Diarrhea',
			'Yellow eyes or skin'
		]
	},{
		label: 'General',
		children: [
			'Weight loss or gain',
			'Fatigue',
			'Fever or Chills',
			'Weakness',
			'Trouble sleeping'
		]
	},{
		label: 'Haematologic',
		children: [
			'Ease of Bruising',
			'Ease of bleeding'
		]
	},{
		label: 'Urinary',
		children: [
			'Frequency',
			'Urgency',
			'Burning or pain',
			'Blood in urine',
			'Incontinence',
			'Change in urinart strength'
		]
	},{
		label: 'Respiratory',
		children: [
			'Cough',
			'Sputum',
			'Coughing up blood',
			'Shortness of breath',
			'Wheezing',
			'Painful breathing'
		]
	},{
		label: 'Nose',
		children: [
			'Stuffiness',
			'Discharge',
			'Itching',
			'Hay fever',
			'Nosebleeds',
			'Sinus pain'
		]
	},{
		label: 'Cardiovascular',
		children: [
			'Chest pain or discomfort',
			'Tightness',
			'Palpitations',
			'Shortness of breath with activity',
			'Difficult breathing lying down',
			'Swelling',
			'Sudden awakening from sleeps with shortness of breath'
		]
	},{
		label: 'Throat',
		children: [
			'Bleeding',
			'Dentures',
			'Sore tongue',
			'Dry mouth',
			'Sore throat',
			'Hoarseness',
			'Thrush',
			'Non-healing sores',
		]
	},{
		label: 'Breasts',
		children: [
			'Lumps',
			'Pain',
			'Discharge',
			'Self exams',
			'Breast feeding'
		]
	},{
		label: 'Psychiatric',
		children: [
			'Nervousness',
			'Stress',
			'Depression',
			'Memory loss'
		]
	}
];

export const physicalExamination = [
	{
		label: 'Neurologic',
		children: [
			'Cranial Nerve II through XII intact',
			'Focal Delicity'
		]
	},{
		label: 'Pelvic',
		children: [
			'Rashes',
			'Normal Bartholin Gland',
			'Vaginal Mucosa of Norma Constitency Without Atrophy or Discharge',
			'Cervical Os Without Discharge',
			'Bimanual: Cervical motion tenderness',
			'Bimanual: no vaginal Bleeding',
			'Discharge',
			'Masses'
		]
	},{
		label: 'Psychiatric',
		children: [
			'Normal affect',
			'Hallucinations',
			'Normal Speech',
			'Dysarthria'
		]
	},{
		label: 'Extremities',
		children: [
			'Cyanosis/Clubbing or Edema'
		]
	},{
		label: 'Rectal',
		children: [
			'Bright red blood per rectum',
			'Melena',
			'Masses',
			'Normal Sphincter Tone',
			'External or Internal hermorrhoids',
			'Prostate Walnut Size Without Nodularity or Hypertrophy',
			'Prostate tenderness'
		]
	},{
		label: 'Head',
		children: [
			'Headache',
			'Head Injury',
			'Neck Pain'
		]
	},{
		label: 'Cardiovascular',
		children: [
			'Regular rate and rhythm',
			'S1 and S2 are normal',
			'Murmurs/rubs/or gallops',
			'Point of maximal intensity non displaced and non sustained',
			'Hapatojugular Reflux',
			'Capillary Refill Less Than 2 Seconds'
		]
	},{
		label: 'Genitourinary',
		children: [
			'Rashes',
			'Penile Discharge',
			'Penile Shaft Without Masses of Lesions',
			'Inguinal Hernia',
			'Inguinal Lymphadenopathy',
			'Bilateral Testicles Normal In Consistency Without Hydrocele or Vancocele',
			'Hypospadias or Epispadias'
		]
	},{
		label: 'Lungs',
		children: [
			'Clear to auscultation bilaterally',
			'Rales/Rhonci/Wheezes',
			'Egophany',
			'Tactice Fremitus',
			'Normal Percussion'
		]
	}, {
		label: 'Neck',
		children: [
			'Suppke',
			'Jugular Venous Distention',
			'Lymphadenopathy',
			'Carotid bruit'
		]
	},{
		label: 'Head',
		children: [
			'Headache',
			'Head Injury',
			'Neck Pain'
		]
	},{
		label: 'Musculoskeletal',
		children: [
			'Normal range of motion',
			'Joint swelling or errythema'
		]
	},{
		label: 'Abdomen',
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
		]
	},{
		label: 'Lymphatic',
		children: [
			'Lymphadenopathy'
		]
	},{
		label: 'General',
		children: [
			'Acute Distress',
			'Alert, Awake, and Oriented Times 4 Tot Name, Place, Time, Purpose',
			'Well developed well nourished African American Male',
			'Well developed well nourished African American Female',
			'Well developed well nourished African White Male',
			'Well developed well nourished African White Female'
		]
	},{
		label: 'Head, Eyes, Ears, Nose, Throat',
		children: [
			'Normocephalic atraumatic',
			'Mucous Membranes Moist',
			'Extraocular Muscles Intact',
			'Pupils equally round and reactive to light and acommodation',
			'Bilateral tympanic membrane intact and reactive to light',
			'Bilateral sclera anicteric',
			'Conjunctival Injection'
		]
	},{
		label: 'Skin',
		children: [
			'Intact',
			'Rashness',
			'Lesions',
			'Errythema'
		]
	}
];

export const patientHx = [
	{
		label: 'Social Hx',
		children: [
			{ name: 'marital_status', label: 'Marital Status' },
			{ name: 'occupation', label: 'Occupation'},
			{ name: 'house_environment', label: 'House Environment'},
			{ name: 'daily_routine', label: 'Daily Routine'},
			{ name: 'dietary_patterns', label: 'Dietary Patterns'},
			{ name: 'exercise_patterns', label: 'Exercise Patterns'},
			{ name: 'sleep_patterns', label: 'Sleep Patterns'},
			{ name: 'coffee_consuption', label: 'Coffee Consumption'},
			{ name: 'tobacco_use', label: 'Tobacco Use'},
			{ name: 'alcohol_use', label: 'Alcohol Use'},
			{ name: 'drug_use', label: 'Drug Use'},
		]
	},{
		label: 'Family Hx',
		children: [
			{ name: 'child_health_history', label: 'Child Health History' },
			{ name: 'adult_health_history', label: 'Adult Health History'},
			{ name: 'hereditary_disease', label: 'Hereditary Disease'},
			{ name: 'mother_health_status', label: 'Mother Health Status'},
			{ name: 'mother_age_of_death', label: 'Mother Age of Death'},
			{ name: 'mother_cause_of_death', label: 'Mother Cause of Death'},
			{ name: 'father_health_status', label: 'Father Health Status'},
			{ name: 'father_age_of_death', label: 'Father Age of Death'},
			{ name: 'father_cause_of_death', label: 'Father Cause of Death'},
			{ name: 'siblings_age_of_death', label: 'Siblings Age of Death'},
			{ name: 'siblings_cause_of_death', label: 'Siblings Cause of Death'},
		]
	},{
		label: 'Gynae Hx',
		children: [
			{ name: 'merarche', label: 'Merarche' },
			{ name: 'menstral_cycle', label: 'Menstral Cycle'},
			{ name: 'lmp', label: 'LMP'},
			{ name: 'contraception', label: 'Contraception'},
			{ name: 'method_of_contraception', label: 'Method/Type of Contraception'},
			{ name: 'dysmenorrhea', label: 'Dysmenorrhea'},
			{ name: 'abnormal_menstrual_bleeding', label: 'Abnormal Menstrual Bleeding'}
		]
	},{
		label: 'Sexual Hx',
		children: [
			{ name: 'coitarche', label: 'Coitarche' },
			{ name: 'no_sexual_partner', label: 'No of Sexual Partner'},
			{ name: 'method_of_sex', label: 'Method of Sex'},
			{ name: 'current_partner', label: 'Current Partner'},
			{ name: 'Dyspareunia', label: 'Dyspareunia'},
			{ name: 'satisfaction', label: 'Satisfaction'},
			{ name: 'history_of_assault', label: 'History of Assault or Abuse'}
		]
	},{
		label: 'Gynae Pap-Smear Hx',
		children: [
			{ name: 'abnormal_pap_smear', label: 'Abnormal Pap-smear' },
			{ name: 'follow_up', label: 'Follow Up & Treatment'}
		]
	},{
		label: 'FGM Hx',
		children: [
			{ name: 'fgm', label: 'FGM' },
			{ name: 'type', label: 'Type'}
		]
	},{
		label: 'Past Ocular Hx',
		children: [
			{ name: 'ocular_trauma', label: 'History of Ocular Trauma' },
			{ name: 'spectacle_correction', label: 'History of Spectacle Correction'},
			{ name: 'ocular_surgery', label: 'History of Ocular Surgery'},
			{ name: 'ocular_medication', label: 'History of Ocular Medication'},
			{ name: 'traditional_medication', label: 'Including Traditional Medication'},
			{ name: 'eye_examination', label: 'Last eye examination'},
		]
	},{
		label: 'Antenatal General/Physical Examination',
		children: [
			{ name: 'oedma', label: 'Oedma' },
			{ name: 'breasts', label: 'Breasts'},
			{ name: 'goitre', label: 'Goitre'},
			{ name: 'teeth', label: 'Teeth'},
			{ name: 'nutrition', label: 'Nutrition'},
			{ name: 'amenia', label: 'Amenia'},
			{ name: 'cvs', label: 'CVS'},
			{ name: 'comment', label: 'Comment'}
		]
	},{
		label: 'Antenatal Initial Assesment',
		children: [
			{ name: 'menarche', label: 'menarche' },
			{ name: 'menstral_cycle', label: 'Menstral Cycle'},
			{ name: 'first_movement', label: 'Date of first Movement'},
			{ name: 'w_r', label: 'W.R'},
			{ name: 'height', label: 'Height'},
			{ name: 'weight', label: 'Weight'},
			{ name: 'hieght_of_fundus', label: 'Height of Fundus'},
			{ name: 'position', label: 'Position'},
			{ name: 'engaged', label: 'Engaged'}
		]
	},{
		label: 'Antenatal Lab Observations',
		children: [
			{ name: 'h_b', label: 'H.B' },
			{ name: 'h_b_s_a_g', label: 'HBSAG'},
			{ name: 'hiv', label: 'HIV'},
			{ name: 'vdrl', label: 'VDRL'},
			{ name: 'urinalysis', label: 'Urinalysis'},
			{ name: 'urin', label: 'urine'},
			{ name: 'comment', label: 'Comment'}
		]
	},{
		label: 'Antenatal Routre Assesment',
		children: [
			{ name: 'gestational_date', label: 'Gestational Date' },
			{ name: 'height_of_fundus', label: 'Height of Funds'},
			{ name: 'presentation', label: 'Presentation/Position'},
			{ name: 'realtion_to_brim', label: 'Relation of Presentation Part of Brim'},
			{ name: 'fetal_heart', label: 'Fetal Heart'},
			{ name: 'weight', label: 'Weight'},
			{ name: 'oedema', label: 'Oedema'}
		]
	},
];
