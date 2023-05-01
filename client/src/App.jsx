import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Homepage } from './components/pages/HomePage'
import CustomThemeProvider from './components/theme/CustomThemeProvider'
import LoginPage from './components/pages/LoginPage'
import Signup from './components/pages/SignupPage'
import UserContextProvider from './components/context/UserContext'
import GameInfoByIdPage from './components/pages/GameInfoByIdPage'
import NotFoundPage from './components/pages/NotFoundPage'
import GameContextProvider from './components/context/GameContext'
import MyFavoriteGamesPage from './components/pages/MyFavoriteGamesPage'
import { SpecialOffersPage } from './components/pages/SpecialOffersPage'
import { SearchPage } from './components/pages/SearchPage'
import GamesPage from './components/pages/GamesPage'

function App() {

  return (
    <CustomThemeProvider>
      <UserContextProvider>
        <GameContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/favorite' element={<MyFavoriteGamesPage />} />
              <Route path='/special' element={<SpecialOffersPage />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/:gameId' element={<GameInfoByIdPage />} />
              <Route path='/:platform?/:category?' element={<GamesPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </GameContextProvider>
      </UserContextProvider>
    </CustomThemeProvider>
  )
}

export default App
