import '../styles/global.css'
import { AuthProvider } from '../contexts/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider
      user={pageProps?.user}
    >
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
