import MasonryLayout from "../components/masonry-layout";
import Sidebar from "../components/sidebar";
import styles from "../css/dashboard.module.css"

export default function DashboardPage(){
    return (
        <div className={`${styles.dashboardContainer} flex row`}>
            <Sidebar />
            <main className={styles.dashboardMain}>
                <header>
                    <h1>John’s House</h1>
                    <p>12 Devices</p>
                </header>

                <MasonryLayout />
            </main>
        </div>
    );
}