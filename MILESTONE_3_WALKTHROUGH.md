# Milestone 3 Walkthrough: Symptom Check-In

## 1. Milestone 3 overview
This milestone adds the patient-facing symptom check-in flow to the existing CareBridge patient experience. It keeps the app’s local demo-data architecture, patient activity feed, and safety language intact while adding a structured symptom form, validation, interface flags, confirmation state, and request-help event handling.

## 2. Features implemented
- Symptom selection interface with required symptom choice
- Severity slider from 0 to 10 with visible current value
- Required duration field with validation
- Required comparison selection with exact options: Better than usual, Same as usual, Worse than usual
- Optional patient note that preserves original wording and is never interpreted
- Request Help action that creates a help/activity event without diagnosis or treatment guidance
- Interface flag logic for display-only status labels
- Confirmation state after successful submission
- Activity/timeline integration using the existing shared event model

## 3. User flow
1. Patient opens the Symptoms screen.
2. Patient selects a symptom from the list.
3. Patient chooses a severity value from 0 to 10.
4. Patient enters a duration such as “2 days” or “1 week”.
5. Patient selects the comparison option.
6. Patient optionally adds a note in their own words.
7. Patient submits the check-in or chooses Request Help.
8. The app records the event in the shared activity feed and shows a confirmation state.

## 4. Files/components changed
- [src/pages/patient/PatientSymptomsPage.jsx](src/pages/patient/PatientSymptomsPage.jsx)
- [src/context/CareContext.jsx](src/context/CareContext.jsx)
- [src/pages/patient/PatientHomePage.jsx](src/pages/patient/PatientHomePage.jsx)

No unrelated pages, routes, or back-end infrastructure were added.

## 5. Validation behavior
The symptom form validates all required inputs before submission:
- symptom is required
- severity must be between 0 and 10
- duration is required
- comparison with usual is required

Validation messages are user-friendly and do not use medical diagnoses or treatment language.

## 6. Interface flag rules
These flags are display-only and are not diagnoses.

- Severity 0–3: Stable
- Severity 4–6: Attention
- Severity 7–10: Requires Professional Review
- If severity is high and the patient selected Worse than usual, display Requires Professional Review

Interface flags are not diagnoses.

Symptoms are always presented as: Patient-Reported.

## 7. Confirmation behavior
After a successful symptom submission, the page shows a clear confirmation card that includes:
- recorded symptom status
- patient-reported label
- severity
- duration
- comparison with usual
- optional note when provided
- interface flag

No diagnosis, treatment plan, or medication recommendation is shown in the confirmation state.

## 8. Activity/timeline event behavior
Symptom submissions and help requests are added to the existing shared activity event feed. Each event includes:
- timestamp
- symptom
- Patient-Reported
- severity
- duration
- comparison with usual
- patient note when supplied
- interface flag

This appears in the patient activity feed and maintains the existing local state model.

## 9. Request Help behavior
Request Help creates a corresponding activity/help event using the same event architecture. The event indicates that the patient requested support, while preserving the project’s safety boundaries:
- no diagnosis
- no medication recommendation
- no dosage guidance
- no treatment advice

## 10. Test scenarios and results
### Test 1: Mild headache
- Symptom: Headache
- Severity: 2
- Duration: 2 days
- Comparison: Same as usual
- Result: submitted successfully, Stable flag, Patient-Reported visible, confirmation displayed, activity event created

### Test 2: High-severity headache
- Symptom: Headache
- Severity: 8
- Duration: 1 week
- Comparison: Same as usual
- Result: submitted successfully, Requires Professional Review flag, Patient-Reported visible, confirmation displayed, activity event created, no diagnosis or treatment recommendation

### Test 3: Patient note
- Symptom: Fatigue
- Severity: 5
- Duration: 3 days
- Comparison: Worse than usual
- Note: custom wording preserved exactly
- Result: submitted successfully; exact wording is retained; note appears in confirmation and activity event without interpretation

### Test 4: Request Help
- Triggered from the symptom form
- Result: help activity event created, confirmation appears, no diagnosis, no medication recommendation, no dosage recommendation

### Test 5: Timeline event creation
- Submitted a symptom check-in
- Result: a new patient activity item appears with timestamp, symptom, Patient-Reported marker, severity, duration, comparison, notes, and interface flag

## 11. Safety boundaries
This milestone does not:
- diagnose
- prescribe medication
- recommend dosage changes
- infer disease from a symptom
- provide medical treatment recommendations
- fabricate health data

The app continues to use local synthetic/mock data and the existing CareBridge architecture only.
