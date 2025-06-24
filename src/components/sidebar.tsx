import styles from '../css/sidebar.module.css';
import personPlaceholder from '../assets/person-placeholder-256x149.jpg';
import dotsIcon from '../assets/icons/dots-black.svg';

// page icons
import logo from '/public/logo-dark.svg';
import configurationIcon from '/public/icons/configuration.svg';
import monitoringIcon from '/public/icons/monitoring.svg';
import notificationsIcon from '/public/icons/notifications-and-alerts.svg';
import systemIcon from '/public/icons/system.svg';
import settingsIcon from '/public/icons/settings.svg';

// TODO: add color fill to icons on active and hover states
const links = [
  { path: "", label: "Dashboard", icon: logo },
  { path: "configuration", label: "Configuration", icon: configurationIcon },
  { path: "monitoring", label: "Monitoring", icon: monitoringIcon },
  { path: "notifications", label: "Notifications", icon: notificationsIcon },
  { path: "system", label: "System", icon: systemIcon },
  { path: "settings", label: "Settings", icon: settingsIcon },
];


export default function Sidebar(){
    return (
        <aside className={[styles.sidebar, "center-flex column"].join(' ')}>
            <ul className='flex column'>
                {links.map((link) => (
                    <li key={link.path}>
                        <a href={`/${link.path}`}>
                            {link.icon && <img src={link.icon} alt={link.label} />}
                        </a>
                    </li>
                ))}
            </ul>
                
            <div className={[styles.profile, "center-flex column"].join(' ')}>
                <img className={styles.dots} src={dotsIcon} alt="dots" />
                <img className={styles.profileImage} src={personPlaceholder} alt="profile image" />
            </div>
        </aside>
    )
}