import { useState } from "react";
import MasonryLayout from "../components/masonry-layout";
import Sidebar from "../components/sidebar";
import styles from "../css/dashboard.module.css"
import editIcon from "../assets/icons/edit-grey-333.svg"
import doneIcon from "../assets/icons/done-green.svg"

export default function DashboardPage(){
    const [onEdit, setOnEdit] = useState(false);

    return (
        <div className={`${styles.dashboardContainer} flex row`}>
            <Sidebar />
            <main className={styles.dashboardMain}>
                <header className="center-flex">
                    <div className="text">
                        <h1>John’s House</h1>
                        <p>12 Devices</p>
                    </div>
                    <button onClick={() => setOnEdit(prev => !prev)}> <img src={onEdit ? doneIcon : editIcon} alt="edit" /> </button>
                </header>

                <MasonryLayout onEdit={onEdit} />
            </main>
        </div>
    );
}