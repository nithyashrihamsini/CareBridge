/** Synthetic demo identities only — not real people. */
export const demoDoctor = {
  id: 'doc_demo_1',
  displayName: 'Dr. Priya Shah',
};

export const demoPatients = [
  { id: 'pat_alex', displayName: 'Alex Rivera', status: 'active' },
  { id: 'pat_janan', displayName: 'Janan Persana', status: 'active' },
  { id: 'pat_sam', displayName: 'Sam Chen', status: 'active' },
];

export function getDemoPatient(patientId) {
  return demoPatients.find((patient) => patient.id === patientId) ?? null;
}
