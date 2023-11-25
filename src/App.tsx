import { FC } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ProfileContainer from './components/Profile/ProfileContainer'
import DialogsContainer from './components/Dialogs/DialogsContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import UsersContainer from './components/Users/UsersContainer'
import LoginContainer from './components/Login/LoginContainer'
import Settings from './components/Settings/Settings'
import Music from './components/Music/Music'
import News from './components/News/News'
import Nav from './components/Nav/Nav'

const App: FC = () => {

  return (
    <div className='app-wrapper'>
      <HeaderContainer />
      <Nav />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/' element={<News />} />
          <Route path='/profile/:userId?' element={<ProfileContainer />} />
          <Route path='/dialogs/*' element={<DialogsContainer />} />
          <Route path='/music' element={<Music />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/users' element={<UsersContainer />} />
          <Route path='/login' element={<LoginContainer />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
