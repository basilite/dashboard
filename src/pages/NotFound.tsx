import styles from '../css/notFound.module.css';
import { useNavigate } from 'react-router-dom';

export default function notFoundPage(){
    const navigate = useNavigate();

    return (
        <section className={styles.notFound}>
            <h1 className={styles.notFoundText}>404 Not Found</h1>
            <button className={styles.goBack} onClick={() => navigate(-1)}> Go Back </button>
        </section>
    );
}