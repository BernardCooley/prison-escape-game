import React from "react";
import styles from "./styles.module.scss";

interface Props {
    gameCompleted: boolean;
    failed: boolean;
}

const Popup = ({ gameCompleted, failed }: Props) => {
    return (
        <div className={styles.popupContainer}>
            {gameCompleted && (
                <div
                    className={`${styles.message} ${styles.popup} ${
                        failed ? styles.failed : styles.passed
                    }`}
                >
                    {failed ? "Failed" : "Passed"}
                </div>
            )}
        </div>
    );
};

export default Popup;
