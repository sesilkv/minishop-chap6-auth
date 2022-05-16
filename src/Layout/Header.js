import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

const Header = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        try {
            const jwtToken = localStorage.getItem('token')
            setUser(jwtDecode(jwtToken))
        } catch {
    
        }
    }, [])

  return (
    <div className="bg-green-700 text-white">
        <div className="container py-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-4xl font-extrabold"><Link to="/">MiniShop</Link></h2>
                </div>
                <div>
                    <ul className="flex space-x-4">
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/shopping-cart">Cart</Link></li>
                        {user !== null && <li><Link to="/order-history">My  Order</Link></li>}
                        {user === null && <li><Link to="/login">Login</Link></li>}
                    </ul>
                    {user !== null && <div>{user.email}</div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header