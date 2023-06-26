import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import { ideiaTheme } from './themes/IdeiaTheme.tsx'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import './assets/default.css'
import { MainLayout } from './layouts/MainLayout.tsx'

dayjs.locale('es');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={ideiaTheme}>
      <MainLayout>
        <App />
      </MainLayout>
    </ThemeProvider>
  </React.StrictMode>,
)
