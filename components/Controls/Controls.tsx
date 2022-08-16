import React from "react";
import styles from "./styles.module.scss";

interface Props {
    loops: number[][] | [];
    gameStarted: boolean;
    onStartClick: (gameStarted: boolean) => void;
    onResetClick: () => void;
}

const Controls = ({
    loops,
    onStartClick,
    gameStarted,
    onResetClick,
}: Props) => {
    const reset = () => {
        onResetClick();
    };

    return (
        <div className={styles.buttonContainer}>
            <button
                className={styles.startButton}
                onClick={() => onStartClick(!gameStarted)}
            >
                Start
            </button>

            {!gameStarted && loops.length > 0 && (
                <button className={styles.startButton} onClick={reset}>
                    Reset
                </button>
            )}
        </div>
    );
};

export default Controls;
