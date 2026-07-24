CREATE TABLE patients (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER,
  gender TEXT,
  diagnosis TEXT,
  assigned_doctor TEXT,
  status TEXT,
  room TEXT,
  admitted_date TEXT,
  last_updated TEXT
);

CREATE TABLE appointments (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  time TEXT,
  duration TEXT,
  room TEXT,
  status TEXT,
  last_updated TEXT,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE medications (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  current_stock INTEGER,
  low_stock_threshold INTEGER,
  unit TEXT,
  status TEXT
);

CREATE TABLE prescriptions (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  medication_id TEXT,
  quantity INTEGER,
  status TEXT,
  created_at TEXT,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (medication_id) REFERENCES medications(id)
);

CREATE TABLE check_ins (
  id TEXT PRIMARY KEY,
  patient_id TEXT NOT NULL,
  check_in_time TEXT,
  appointment_time TEXT,
  appointment_type TEXT,
  status TEXT,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE TABLE pending_results (
  id TEXT PRIMARY KEY,
  patient_name TEXT,
  test_type TEXT,
  priority TEXT,
  submitted_at TEXT
);
