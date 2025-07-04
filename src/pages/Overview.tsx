import { useState } from "react";
import MasonryLayout from "../components/masonry-layout";
import Sidebar from "../components/sidebar";
import styles from "../css/overview.module.css";

// icons
import editIcon from "../assets/icons/edit-grey-333.svg"
import doneIcon from "../assets/icons/done-green.svg"
import securityEnabledIcon from "../assets/icons/security-enabled-black.svg";
import securityDisabledIcon from "../assets/icons/security-disabled-black.svg";


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
                            <img src={security ? securityEnabledIcon : securityDisabledIcon} alt={`security ${security ? "on" : "off"}`} />
                            Security
                        </span>
                        <p className="center-flex">12 Devices</p>
                    </div>
                </div>
                <button aria-pressed={onEdit} aria-label={onEdit ? "Editing done" : "Edit"} onClick={() => setOnEdit(prev => !prev)}>
                    <img src={onEdit ? doneIcon : editIcon} alt="edit" />
                </button>
            </header>
            <MasonryLayout onEdit={onEdit} /> // TODO: pass overview page cards as json
            </main>
        </div>
    );
}