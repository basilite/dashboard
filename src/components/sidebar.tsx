import { useLocation } from 'react-router-dom';
import styles from '../css/sidebar.module.css';
import personPlaceholder from '../assets/person-placeholder-256x149.jpg';
import dotsIcon from '../assets/icons/dots-black.svg';

// page icons
import logo from '../assets/icons/logo-dark.svg?react';
import configurationIcon from '../assets/icons/configuration.svg?react';
import monitoringIcon from '../assets/icons/monitoring.svg?react';
import notificationsIcon from '../assets/icons/notifications-and-alerts.svg?react';
import systemIcon from '../assets/icons/system.svg?react';
import settingsIcon from '../assets/icons/settings.svg?react';

const links = [
  { path: "", label: "Dashboard", Icon: logo },
  { path: "configuration", label: "Configuration", Icon: configurationIcon },
  { path: "monitoring", label: "Monitoring", Icon: monitoringIcon },
  { path: "notifications", label: "Notifications", Icon: notificationsIcon },
  { path: "system", label: "System", Icon: systemIcon },
  { path: "settings", label: "Settings", Icon: settingsIcon },
];


export default function Sidebar(){
    const location = useLocation();
    
    return (
        <aside className={[styles.sidebar, "center-flex column"].join(' ')}>
            <ul className='flex column'>
                {links.map(({ path, label, Icon }) => {
                    const isActive = location.pathname === `/${path}`;

                    return (<li key={path}>
                        <a className='flex' href={`/${path}`}>
                            <Icon className={`${styles.icon} ${isActive ? styles.active : ""}`} />
                            <span>{label}</span>
                        </a>
                    </li>);
                })}
            </ul>
                
            <div className={[styles.profile, "center-flex column"].join(' ')}>
                <img className={styles.dots} src={dotsIcon} alt="dots" />
                <span className={styles.profileUsername}>John</span>
                <img className={styles.profileImage} src={personPlaceholder} alt="profile image" />
            </div>
        </aside>
    )
}