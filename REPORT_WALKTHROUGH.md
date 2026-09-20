# CareBridge AI Report Walkthrough

## Scope
This update extends the existing About Prototype content and doctor progress report without changing the framework, routes, shared activity model, or external integrations.

## Existing data flow
- Patient actions are stored as shared activity events in `CareContext`.
- Reports filter those events by patient and selected 7, 14, or 30-day range.
- Appointment records continue to come from the existing synthetic appointment state.
- Report summaries use deterministic JavaScript counts from the filtered data.

## Walkthrough

### 1. Patient activity entry
1. Open the Patient View from the role selector.
2. Mark a medication as missed.
3. Open the symptom check-in page.
4. Record a headache with severity 7/10.
5. Select Worse than usual.
6. Add a patient note.
7. Submit the check-in or request professional attention.

Expected result: the symptom and any help request appear as patient-reported activity events with severity, duration, comparison, note, and professional-review status.

### 2. Doctor patient timeline
1. Switch to the Doctor Workspace.
2. Open Alex Rivera from the roster.
3. Select a date range.
4. Review medication activity, symptom trend, appointment history, escalation history, and the exact chronological timeline.

Expected result: the timeline displays the underlying event date, time, type, title, status, source, and original patient note.

### 3. Generated report
1. Select `Generate Progress Report` from the patient-detail page.
2. Choose the 14-day report.
3. Review the report metadata and care activity overview.
4. Review medication activity, appointment history, symptom details, symptom trend, escalation history, original notes, and the exact timeline.
5. Review `Automated activity summary`.

Expected result: the report uses only filtered synthetic activity data and clearly labels symptoms as patient-reported and flags as requiring professional review.

### 4. Date ranges and empty state
- Switch between 7-day, 14-day, and 30-day report ranges.
- Use a period with no events to verify the empty activity and symptom states.
- Verify the report does not invent data for an empty period.

### 5. Print preview
1. Select `Print Report`.
2. Use the browser print dialog to print or save as PDF.

Expected result: navigation and buttons are hidden, report cards remain readable, charts are preserved, and the disclaimer remains visible.

## Browser targets
- Mobile: 390x844
- Tablet: 768x1024
- Desktop: 1440x900

## Validation completed
- `npm run build` passed.
- Source diagnostics reported no errors in changed files.
- Doctor report route loaded at `/doctor/patients/pat_alex/report?range=14`.
- Report screenshot verified the patient metadata, generated date, reporting period, navigation, and print action.
- Required About Prototype and report headings were verified in source.

## Safety boundaries
The prototype continues to use synthetic data and local deterministic logic. It does not use Firebase, Gemini API, external API keys, diagnosis, prescription, treatment recommendations, or medical predictions.
