import Sidebar from "../components/sidebar";
import styles from "../css/dashboard.module.css"

export default function DashboardPage(){
    return (
        <div className="flex row">
            <Sidebar />
            <main className={styles.dashboardMain}>
                <h1>Dashboard</h1>
            </main>
        </div>
    );
}