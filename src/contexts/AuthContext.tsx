import { createContext, ReactNode, useState } from 'react'
import Cookies from 'js-cookie'

interface AuthState {
    userName: string
    name: string
    avatarUrl: string
}

interface AuthContextData {
    user: AuthState
    login: (userFunction: AuthState) => void
}

interface AuthProviderProps {
    children: ReactNode
    user: AuthState
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children, ...rest }: AuthProviderProps) {
    const [user, setUser] = useState<AuthState>(() => {
        if(rest) {
            return {
                userName: rest.user.userName,
                avatarUrl: rest.user.avatarUrl,
                name: rest.user.name
            }
        }
        const user = Cookies.get('user')

        if(user) {
            return JSON.parse(user)
        }

        return {} as AuthState
    })

    async function login(userFunction: AuthState) {
        setUser(userFunction)
    }

    return (
        <AuthContext.Provider value={{
            user,
            login
        }}>
            {children}
        </AuthContext.Provider>
    )
}