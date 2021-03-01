import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { AuthContext } from '../contexts/AuthContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext)
    const { user } = useContext(AuthContext)

    return (
        <div className={styles.profileContainer}>
            <img src={`${user.avatarUrl}`} alt={user.name}/>
            
            <div>
                <strong>{user.name}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}