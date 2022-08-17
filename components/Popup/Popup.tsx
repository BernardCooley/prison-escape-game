import React, { useEffect, useState } from "react";
import { ISlicedLoop } from "../../types";
import Loops from "../Loops/Loops";
import styles from "./Popup.module.scss";

interface Props {
    failed: boolean;
    slicedLoops: ISlicedLoop[];
    onClose: () => void;
}

const Popup = ({ failed, slicedLoops, onClose }: Props) => {
    const [loopsWithPercentage, setLoopsWithPercentage] =
        useState<ISlicedLoop[]>(slicedLoops);

    useEffect(() => {
        const slicedLoops1: ISlicedLoop[] = slicedLoops.map(
            (loop: ISlicedLoop) => {
                return {
                    prisoner: loop.prisoner,
                    percentage: (loop.percentage = parseFloat(
                        ((loop.loop.length / 100) * 100).toFixed(0)
                    )),
                    loop: loop.loop,
                };
            }
        );

        setLoopsWithPercentage(slicedLoops1);
    }, []);

    return (
        <div className={styles.popupContainer}>
            <button onClick={onClose} className={styles.closeButton}>
                Close
            </button>
            <div className={`${styles.popup}`}>
                <div className={`${styles.message}`}>
                    {failed ? "Failed" : "Passed"}
                </div>
                <ul className={styles.graphList}>
                    {loopsWithPercentage?.map((loop) => {
                        return (
                            <li key={loop.prisoner} className={styles.row}>
                                <div className={styles.rowLabel}>
                                    Prisoner {loop.prisoner + 1}
                                </div>
                                <div className={styles.totalBar}>
                                    <div
                                        className={`${styles.bar} ${
                                            loop.percentage < 50
                                                ? styles.passed
                                                : styles.failed
                                        }`}
                                        style={{ width: `${loop.percentage}%` }}
                                    ></div>
                                    <div>{loop.percentage}%</div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Loops loops={loopsWithPercentage}></Loops>
        </div>
    );
};

export default Popup;
