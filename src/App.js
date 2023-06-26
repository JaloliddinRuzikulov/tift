import React from 'react'
import { ThemeProvider } from 'styled-components'
import defaultTheme from './theme/defaultTheme'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Main from './components/Main'
import TeacherDashboard from './components/TeacherDashboard'
import VideoGuide from './components/VideoGuide'
import ClassScheduleTeacher from './components/ClassScheduleTeacher'
import DashboardDetail from './components/TeacherDashboard/DashboardDetail'
import Thesis from "./components/Thesis"
import { ThemeProvider as MuiTheme } from '@mui/material/styles'
import muiTheme from './theme/muiTheme'
import Questionnaire from './components/Questionnaire'
// import {TabsUnstyled} from "@mui/base"
import Profile from './components/Profile/Index'

function App() {
  return (
    <MuiTheme theme={muiTheme}>
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />}>
              <Route index element={<TeacherDashboard />} />
              <Route path="nb" element={<p>NB larni tugirlash</p>} />
              <Route path="filingapplication" element={<p>filing-application</p>} />
              <Route path="sciences" element={<p>sciences</p>} />
              <Route path="classschedule" element={<ClassScheduleTeacher />} />
              <Route path="diploma" element={<Thesis />} />
              <Route path="request" element={<Questionnaire/>} />
              <Route path="coursemanagement" element={<p>coursemanagement</p>} />
              <Route path="videoguide" element={<VideoGuide />} />
              <Route path="profile" element={<Profile />} />
              <Route path="details/:id" element={<DashboardDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </MuiTheme>
  );
}

export default App;
