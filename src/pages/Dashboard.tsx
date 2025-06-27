import { useState } from "react";
import MasonryLayout from "../components/masonry-layout";
import Sidebar from "../components/sidebar";
import styles from "../css/dashboard.module.css"

// icons
import editIcon from "../assets/icons/edit-grey-333.svg"
import doneIcon from "../assets/icons/done-green.svg"
import securityEnabledIcon from "../assets/icons/security-enabled-black.svg";
import securityDisabledIcon from "../assets/icons/security-disabled-black.svg";

export default function DashboardPage(){
    const [onEdit, setOnEdit] = useState(false);
    const [security, setSecurityState] = useState(false) // TODO: implement security state handler

    return (
        <div className={`${styles.dashboardContainer} flex row`}>
            <Sidebar />
            <main className={styles.dashboardMain}>
                <header className="center-flex">
                    <div className={styles.text}>
                        <h1>John’s House</h1>
                        <div className={`${styles.subtitle} flex`}>
                            <span className={`${styles.securityBadge} center-flex`} style={{background: security ? "#AAE1C9" : undefined}}>
                                <img src={security ? securityEnabledIcon : securityDisabledIcon} alt={`security ${security ? "on" : "off"}`} />
                                Security
                            </span>
                            <p>12 Devices</p>
                        </div>
                    </div>
                    <button aria-pressed={onEdit} aria-label={onEdit ? "Editing done" : "Edit"} onClick={() => setOnEdit(prev => !prev)}>
                        <img src={onEdit ? doneIcon : editIcon} alt="edit" />
                    </button>
                </header>

                <MasonryLayout onEdit={onEdit} />
            </main>
        </div>
    );
}