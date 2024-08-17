import React from 'react'
import ReactDOM from 'react-dom/client'
// import Home from './screens/home.tsx'
import './index.css'
import AppRoutes from './routers.tsx'
// teste

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
)
