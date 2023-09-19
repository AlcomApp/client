import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AppView from './pages/app/app'
import { AuthenticationView } from './pages/auth/app'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/*" element={<AppView/>}/>
        <Route exact path="auth/*" element={<AuthenticationView/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
