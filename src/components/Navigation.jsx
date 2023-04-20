import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../auth/AuthContext'
import { Icon } from '@iconify/react'

function Navigation() {
  const { user, signOut } = useContext(AuthContext)

  const handleLogout = async () => {
    await signOut()
  }

  return (
    <nav style={styles.nav}>
      <ul style={styles.left}>
        <li>
          <Link to="/">
            <Icon style={{ width: "2rem", height: "2rem" }} icon="mdi:music-clef-treble" />
          </Link>
        </li>
        <li>
          <Link to="/" >Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.button}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/sign-up">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

const styles = {
  nav: {
    backgroundColor: '#1d1d1d',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  left: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: '1rem 1rem',
  },
  right: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: '1rem 1rem',
  },
}

export default Navigation