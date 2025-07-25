import { useState } from "react";
import MasonryLayout from "../components/masonry-layout";
import Sidebar from "../components/sidebar";
import styles from "../css/overview.module.css";

// icons
import EditIcon from "../assets/icons/edit-grey-333.svg?react"
import DoneIcon from "../assets/icons/done-green.svg?react"
import SecurityEnabledIcon from "../assets/icons/security-enabled-black.svg?react";
import SecurityDisabledIcon from "../assets/icons/security-disabled-black.svg?react";


export default function OverviewPage(){
    const [onEdit, setOnEdit] = useState(false);
    const [security] = useState(false) // TODO: implement security state handler

    return (
        <div className={`pageContainer flex row`}>
            <Sidebar />
            <main>
            <header className="center-flex">
                <div className="text">
                    <h1>John’s House</h1>
                    <div className="subtitle flex">
                        <span className={`${styles.securityBadge} ${security ? styles.active : undefined} center-flex`}>
                            {security ? <SecurityEnabledIcon className={styles.securityEnabled} /> : <SecurityDisabledIcon className={styles.securityDisabled} />}
                            Security
                        </span>
                        <p className="center-flex">12 Devices</p>
                    </div>
                </div>
                <button aria-pressed={onEdit} aria-label={onEdit ? "Editing done" : "Edit"} onClick={() => setOnEdit(prev => !prev)}>
                    {!onEdit ? <EditIcon className={styles.edit} /> : <DoneIcon className={styles.done} />}
                </button>
            </header>
            <MasonryLayout onEdit={onEdit} /> {/* TODO: pass overview page cards as json */}
            </main>
        </div>
    );
}