import React from "react";
import styles from "./Prison.module.scss";

interface Props {
    boxes: number[];
}

const Prison = ({ boxes }: Props) => {
    const open = true;
    return (
        <div className={styles.prisonContainer}>
            {boxes?.map((box: number, index: number) => (
                <div
                    className={`${styles.box} ${
                        box % 2 == 0 ? styles.open : styles.closed
                    }`}
                    key={box}
                >
                    {box % 2 == 0 && (
                        <div
                            className={`${styles.paperNumber} ${styles.number}`}
                        >
                            {box + 1}
                        </div>
                    )}

                    <div className={`${styles.number}`}>{index + 1}</div>
                </div>
            ))}
        </div>
    );
};

export default Prison;
