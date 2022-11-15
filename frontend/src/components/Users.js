import axios from 'axios'
import { useState, useEffect } from 'react'
const API = process.env.REACT_APP_API_URL

function Users() {
   const [users, setUsers] = useState([])

   useEffect(() => {
     axios.get(`${API}/users`).then((res) => {
       setUsers(res.data.payload)
     })
   }, [])
    
    const allUsers = users.map((user,index) => {
        return (<div key={index}>{user.user_name}</div>)
    })

    return (<div>{allUsers}</div>)
}

export default Users