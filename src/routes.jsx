import { Navigate, Route, Routes } from 'react-router-dom';
import DoctorLayout from './layouts/DoctorLayout.jsx';
import PatientLayout from './layouts/PatientLayout.jsx';
import RoleSelectPage from './pages/RoleSelectPage.jsx';
import DoctorPatientPage from './pages/doctor/DoctorPatientPage.jsx';
import DoctorReportPage from './pages/doctor/DoctorReportPage.jsx';
import DoctorRosterPage from './pages/doctor/DoctorRosterPage.jsx';
import PatientAppointmentsPage from './pages/patient/PatientAppointmentsPage.jsx';
import PatientHomePage from './pages/patient/PatientHomePage.jsx';
import PatientSymptomsPage from './pages/patient/PatientSymptomsPage.jsx';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectPage />} />

      <Route element={<PatientLayout />}>
        <Route path="/patient" element={<PatientHomePage />} />
        <Route path="/patient/appointments" element={<PatientAppointmentsPage />} />
        <Route path="/patient/symptoms" element={<PatientSymptomsPage />} />
      </Route>

      <Route element={<DoctorLayout />}>
        <Route path="/doctor" element={<DoctorRosterPage />} />
        <Route path="/doctor/patients/:patientId" element={<DoctorPatientPage />} />
        <Route path="/doctor/patients/:patientId/report" element={<DoctorReportPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
