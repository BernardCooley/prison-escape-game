import React from "react";
import styles from "./styles.module.scss";

interface Props {
    boxes: number[];
}

const Prison = ({ boxes }: Props) => {
    return (
        <div className={styles.prisonContainer}>
            {boxes?.map((box: number, index: number) => (
                <div className={`${styles.box}`} key={box}>
                    <div className={`${styles.number}`}>{index + 1}</div>
                    <div className={`${styles.number}`}>{box + 1}</div>
                </div>
            ))}
        </div>
    );
};

export default Prison;
