import { Routes, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Layout from './components/layout/Layout'
import PatientsList from './pages/patients/PatientsList'
import PatientDetail from './pages/patients/PatientDetail'
import SessionDetail from './pages/sessions/SessionDetail'
import NewSession from './pages/sessions/NewSession'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<PatientsList />} />
          <Route path="patients" element={<PatientsList />} />
          <Route path="patients/:id" element={<PatientDetail />} />
          <Route path="sessions/new" element={<NewSession />} />
          <Route path="sessions/:id" element={<SessionDetail />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App