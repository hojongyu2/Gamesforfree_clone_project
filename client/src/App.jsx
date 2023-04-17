import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './components/pages/HomePage'
import CustomThemeProvider from './components/theme/CustomThemeProvider'
import LoginPage from './components/pages/LoginPage'
import Signup from './components/pages/SignupPage'

function App() {

  return (
    <CustomThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  )
}

export default App
