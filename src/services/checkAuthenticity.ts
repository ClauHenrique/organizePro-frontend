import { Navigate } from 'react-router-dom'

export function CheckAuthenticity(props: {element: any}) {
  const token = localStorage.getItem('token');  

  if (!token) {
    return Navigate({to: '/login'})
  }

  return props.element

};


