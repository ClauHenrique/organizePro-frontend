import { Navigate } from 'react-router-dom'

export function CheckAuthenticity({element}: any) {
  const token = localStorage.getItem('token');  

  if (!token) {
    return Navigate({to: '/'})
  }

  return element

};


