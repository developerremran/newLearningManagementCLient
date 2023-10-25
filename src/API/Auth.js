export const saveUser = user => {
  const currentUser = { email: user.email, }

  fetch(`${import.meta.env.VITE_lOCAL_Server}/newUser`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  })
    .then(res => res.json())
    .then(data => console.log(data))
}


// become a host
export const becomeHost = id => {
  const currentUser = {
    role: 'host',
  }
  return fetch(`${import.meta.env.VITE_lOCAL_Server}/newUser/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(currentUser),
  }).then(res => res.json())
}


// Get role
export const getRole = async email => {
  const response = await fetch(`${import.meta.env.VITE_lOCAL_Server}/newUser/${email}`)
  const user = await response.json()
  return user?.role
}

//   delete Host 

export const deleteHost = id => {
  return fetch(`${import.meta.env.VITE_lOCAL_Server}/newUser/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())
}


// delete user 
export const deleteUser = id =>{
  return fetch(`${import.meta.env.VITE_lOCAL_Server}/users/${id}`, {
    method: 'DELETE',
  }).then(res => res.json())
}