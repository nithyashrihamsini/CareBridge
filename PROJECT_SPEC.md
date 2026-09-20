# CareBridge AI — Product Specification Document

**Project Name:** CareBridge AI

**Theme:** Tech for a Better Tomorrow

**Document Status:** Final MVP Specification

---

## 1. The Problem

Patients managing chronic conditions frequently experience a breakdown in care continuity between clinic visits. Managing medications, tracking fluctuating symptoms, and reporting daily wellness levels manually often leads to fragmented data. When clinicians review a patient's progress weeks or months later, they lack clear, chronological context regarding medication adherence, symptom spikes, and patient-reported observations.

Furthermore, digital healthcare solutions frequently stumble by trying to automate triage or offer unverified advice, creating patient risk and liability. CareBridge AI addresses this by providing a structured, privacy-conscious care-continuity tool that aggregates patient-reported tracking and AI-summarized data without attempting clinical decision-making.

---

## 2. Target Users

* **Patients:** Individuals managing chronic conditions (e.g., diabetes, hypertension, chronic fatigue, asthma) who need an intuitive daily tool to record medication compliance, symptom trends, notes, and appointments.
* **Healthcare Providers / Doctors:** Attending physicians or care managers who need an at-a-glance dashboard to evaluate patient adherence, inspect chronological logs, identify patient-reported risk flags, and export clean, date-filtered progress reports.

---

## 3. Main User Journey

### Patient Journey

1. **Access Dashboard:** Patient opens the application and views "Today’s Care Tasks."
2. **Log Daily Activities:** Patient marks assigned medications as *Taken* or *Missed*.
3. **Record Symptoms & Mood:** Patient logs current symptom severity (0–10 scale), selects how they are feeling, and enters optional notes.
4. **Review & Request Help:** Patient reviews upcoming appointments and, if feeling unwell, triggers a "Request Help" signal.

### Doctor Journey

1. **Review Roster:** Doctor views assigned patients and filters by those flagged as **Requires Professional Review**.
2. **Inspect Patient Timeline:** Doctor opens an individual profile to view an exact chronological feed of patient-reported activities, missed doses, and severity trends.
3. **Generate Progress Report:** Doctor sets a date range, generates an AI-summarized summary of existing data, and exports or prints the report as a PDF.

---

## 4. Exact MVP Features

### Core & Safety Guardrails

* **Role Switcher:** Mock authentication to toggle seamlessly between **Patient** and **Doctor** roles.
* **Global Safety Disclaimer:** Continuous banner stating the app does not diagnose, prescribe, or replace emergency care.

### Patient Dashboard

* **Daily Task Checklist:** View scheduled medication and mark each as *Taken* or *Missed*.
* **Patient-Reported Symptom Logger:** Numeric input slider/buttons (0–10 scale) paired with mood selection.
* **Qualitative Notes:** Free-text input to log specific daily notes or context.
* **Appointment Overview:** List view of scheduled clinical appointments.
* **Personal Progress View:** Basic graphical trend line of recent patient-reported symptom scores.
* **Request Help Trigger:** One-click action to raise an escalation flag on the doctor roster.

### Doctor Dashboard

* **Patient Roster & Filtering:** Table view of patients with status indicators and a "Requires Professional Review" filter.
* **Chronological Activity Feed:** Detailed timeline displaying exact time-stamped actions, notes, and missed doses.
* **Symptom & Severity Analytics:** Visual trends showing symptom changes over selected date ranges.
* **Factual AI Data Summarizer:** AI component that summarizes logged notes and adherence without inferring conclusions or generating new data.
* **Date-Filtered Progress Report Engine:** Configurable report view ready for printing or saving as PDF.

---

## 5. Features to Postpone (Non-MVP)

* Live multi-tenant authentication and OAuth/SAML single sign-on.
* Real-time chat, video consultation, or direct messaging.
* EHR/EMR standards integration (FHIR / HL7 APIs).
* Automated push, SMS, or email notifications.
* Hardware integrations (Bluetooth glucometers, blood pressure cuffs, wearables).
* Prescription automated refills or pharmacy dispatch.

---

## 6. Page and Route List

| Route | View Name | Primary Function |
| --- | --- | --- |
| `/` | **Landing / Role Switcher** | Entry point to select between Patient and Doctor prototype views. |
| `/patient` | **Patient Overview** | "Today's Tasks" checklist, medication tracking, and quick logger. |
| `/patient/progress` | **Patient History** | Historical symptom trends, logged notes, and appointments. |
| `/patient/help` | **Help Request** | Escalation submission view with emergency disclaimers. |
| `/doctor` | **Doctor Roster** | Multi-patient overview with priority filtering. |
| `/doctor/patient/[id]` | **Patient Detail** | Chronological logs, adherence stats, and AI data summaries. |
| `/doctor/patient/[id]/report` | **Printable Report** | Clean, date-filtered report formatted for PDF download or printing. |

---

## 7. Component List

### Shared / Global

* `AppHeader`: Navigation bar with role switcher and safety disclaimers.
* `SafetyDisclaimerBanner`: Persistent alert bar explaining diagnostic limitations.
* `StatusBadge`: Color-coded pill badge (e.g., "Patient-Reported", "Requires Professional Review").

### Patient View

* `TaskList`: Container for today's care tasks.
* `MedicationTaskCard`: Actionable card for marking medications as taken or missed.
* `SymptomLogger`: Input component with a 0–10 scale slider for symptom recording.
* `MoodSelector`: Quick-select tags for daily feelings (e.g., Calm, Anxious, Fatigued).
* `AppointmentList`: Card list display of upcoming clinical visits.
* `SymptomTrendChart`: Visual line chart depicting symptom severity over time.

### Doctor View

* `PatientTable`: Table listing patients, compliance scores, and review flags.
* `ActivityTimeline`: Chronological stream showing time-stamped patient logs.
* `AISummaryCard`: Box rendering fact-checked AI text derived strictly from patient entries.
* `DateRangeFilter`: Date inputs to narrow down timeline data and report scope.
* `PrintableReportLayout`: Clean print CSS layout for generating PDF outputs.

---

## 8. Data Model

### `User`

```typescript
interface User {
  id: string;
  name: string;
  role: 'patient' | 'doctor';
  email: string;
}

```

### `PatientProfile`

```typescript
interface PatientProfile {
  id: string;
  userId: string;
  conditionName: string;
  assignedDoctorId: string;
  requiresReview: boolean;
}

```

### `Medication`

```typescript
interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosageText: string;
  scheduleTime: string;
}

```

### `TaskLog`

```typescript
interface TaskLog {
  id: string;
  patientId: string;
  medicationId: string;
  date: string; // YYYY-MM-DD
  status: 'taken' | 'missed';
  timestamp: string;
}

```

### `SymptomLog`

```typescript
interface SymptomLog {
  id: string;
  patientId: string;
  date: string;
  severity: number; // 0-10
  feeling: string;
  noteText: string;
  label: 'Patient-Reported';
  timestamp: string;
}

```

### `Appointment`

```typescript
interface Appointment {
  id: string;
  patientId: string;
  doctorName: string;
  scheduledAt: string;
  location: string;
}

```

### `HelpRequest`

```typescript
interface HelpRequest {
  id: string;
  patientId: string;
  timestamp: string;
  message: string;
  status: 'pending' | 'reviewed';
}

```

---

## 9. Report Structure

The generated date-filtered **Patient Progress Report** follows this layout:

1. **Header & Safety Block:**
* App Branding (*CareBridge AI*).
* Synthetic Patient ID, Condition, Assigned Doctor, and Selected Date Range.
* Mandatory Disclaimer: *"This report compiles patient-reported logs for clinical review. It does not contain automated diagnoses or treatment plans."*


2. **Executive AI Summary:**
* Fact-based text summarizing existing records (e.g., *"Over the last 14 days, the patient logged 12/14 prescribed medication doses. Symptom severity averaged 4.2 out of 10, with a peak score of 8 logged on Oct 12."*).


3. **Adherence Breakdown:**
* Total doses taken vs. missed.
* List of missed medication dates/times.


4. **Patient-Reported Symptom Trajectory:**
* Chart/table of 0–10 severity ratings alongside recorded feeling states.


5. **Patient Notes & Escalations:**
* Unedited written patient entries and help requests submitted within the timeframe.


6. **Flagged Items Block:**
* Section explicitly labeled **Requires Professional Review** highlighting severe symptom scores (≥ 7) or missed medication clusters.


7. **Signature Block:**
* Space for reviewing clinician signature and date.



---

## 10. Safety and Privacy Rules

### Safety Constraints

* **No Diagnosis / Prescription:** The application interface and AI features must never suggest medical diagnoses, recommend drugs, or modify existing dosages.
* **Emergency Service Disclaimer:** Clear text placement stating that the app is not for emergency use. The "Request Help" button explicitly reminds users to call local emergency services if experiencing a crisis.
* **Explicit Labeling:**
* All logs entered by the user are explicitly labeled **Patient-Reported**.
* All clinical flags, high symptom warnings, or escalations are labeled **Requires Professional Review**.


* **AI Guardrails:** AI prompts must strictly prohibit inventing medical facts, inferring unstated symptoms, or drawing clinical conclusions. AI is restricted to summarizing existing user-logged data.

### Privacy Constraints

* **Synthetic Prototype Data:** All demonstration data (patient names, medical histories, notes) must be entirely synthetic.
* **Local In-Memory Scope:** For the hackathon build, data remains local to client state / local storage without sending telemetry or unauthorized external network requests.

---

## 11. Eight-Hour Build Sequence

1. **Hour 1: Architecture & Data Schema Setup:** Establish core project structure and synthetic data models.
Initialize the project repository, set up utility helper classes, define TypeScript interfaces for all data models, and construct mock data objects representing synthetic patients, medications, and historical logs.


2. **Hour 2: Global Shell & Role Switcher:** Build navigation layout and role context.
Create the application layout with global state management for switching between Patient and Doctor roles. Add the persistent safety disclaimer banner across all routes.


3. **Hour 3: Patient Dashboard — Daily Tasks & Logger:** Implement core patient logging UI.
Build the Patient View routes (`/patient`), including the task list checklist for medication adherence (taken/missed), the 0–10 symptom severity slider, mood selector, and written notes module.


4. **Hour 4: Patient Dashboard — History & Help Requests:** Finalize patient features.
Construct the patient appointment list, symptom trend chart, and the "Request Help" escalation modal with explicit emergency guidance text.


5. **Hour 5: Doctor Roster & Filtering Engine:** Build primary clinician view.
Develop the Doctor View (`/doctor`) featuring a patient table, adherence statistics, and filtering logic for patients tagged as **Requires Professional Review**.


6. **Hour 6: Doctor Detailed View & Chronological Feed:** Implement patient inspection UI.
Build the detailed patient route (`/doctor/patient/[id]`). Display the exact chronological activity timeline, missed doses, patient notes, and symptom trend graphs.


7. **Hour 7: AI Data Summarizer & Report Engine:** Integrate strict factual AI summaries and PDF output.
Integrate the AI summarization service with strict prompt guardrails. Build the date-filtered report layout (`/doctor/patient/[id]/report`) with print-ready CSS for PDF generation.


8. **Hour 8: Safety Audit, UX Polish & Demo Prep:** Final verification and presentation polish.
Verify all required labels ("Patient-Reported", "Requires Professional Review"), test edge-case data scenarios, confirm zero diagnostic text presence, and prepare demo walkthrough scripts.


---