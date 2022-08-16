import React from "react";
import styles from "./styles.module.scss";

interface Props {
    gamesPassed: number;
    gamesFailed: number;
}

const Statistics = ({ gamesPassed, gamesFailed }: Props) => {
    return (
        <div className={styles.statisticsContainer}>
            {gamesPassed > 0 || gamesFailed > 0 ? (
                <div>
                    <div>Games played: {gamesPassed + gamesFailed}</div>
                    <div>Games passed: {gamesPassed}</div>
                    <div>Games failed: {gamesFailed}</div>

                    <div>
                        Percentage passed:
                        {(
                            (gamesPassed / (gamesPassed + gamesFailed)) *
                            100
                        ).toFixed(4)}
                        %
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Statistics;
