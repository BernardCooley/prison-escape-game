import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Controls from "../components/Controls/Controls";
import Popup from "../components/Popup/Popup";
import Prison from "../components/Prison/Prison";
import Statistics from "../components/Statistics/Statistics";
import styles from "../styles/Home.module.css";

interface ISplicedLoop {
    prisoner: number;
    loop: number[];
}

const Home: NextPage = () => {
    const [boxes, setBoxes] = useState<number[]>([]);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameCompleted, setGameCompleted] = useState<boolean>(false);
    const numOfprisoners = 100;
    const [loops, setLoops] = useState<number[][] | []>([]);
    const [failed, setFailed] = useState<boolean>(false);
    const [gamesPassed, setGamesPassed] = useState<number>(0);
    const [gamesFailed, setGamesFailed] = useState<number>(0);

    useEffect(() => {
        generatePrison();
    }, []);

    useEffect(() => {
        if (gameStarted) {
            let pri = 0;
            let loops: number[][] = [];

            for (let j = 0; j < numOfprisoners; j++) {
                const newLoop: number[] = [];
                let newCurrentBox = pri;

                for (let i = 0; i < numOfprisoners; i++) {
                    newLoop.push(boxes[newCurrentBox]);
                    newCurrentBox = boxes[newCurrentBox];
                }

                loops.push(newLoop);
                pri++;
            }
            setLoops(loops);

            setGameStarted(false);
            setGameCompleted(true);
        }
    }, [gameStarted]);

    useEffect(() => {
        if (gameCompleted) {
            const slicedLoops: ISplicedLoop[] = [];

            loops.forEach((loop, index) => {
                const slicedLoop = loop.slice(0, loop.indexOf(index) + 1);

                slicedLoops.push({
                    prisoner: index,
                    loop: slicedLoop,
                });
            });

            const longest = Math.max(...slicedLoops.map((a) => a.loop.length));

            if (longest <= numOfprisoners / 2) {
                setGamesPassed((gamesPassed) => gamesPassed + 1);
            } else {
                setFailed(true);
                setGamesFailed((gamesFailed) => gamesFailed + 1);
            }
        }
    }, [loops]);

    const generatePrison = () => {
        console.log("New prison generated");
        setLoops([]);
        setGameCompleted(false);
        setGameStarted(false);
        setFailed(false);

        const nums = Array.from(Array(numOfprisoners).keys());
        const shuffledArray = nums.sort((a, b) => 0.5 - Math.random());
        const b = shuffledArray.map((num) => {
            return num;
        });
        setBoxes(b);
    };

    const reset = () => {
        generatePrison();
    };

    return (
        <div className={styles.container}>
            <div className={styles.controlPanel}>
                <Controls
                    gameStarted={gameStarted}
                    loops={loops}
                    onResetClick={reset}
                    onStartClick={() => setGameStarted(!gameStarted)}
                ></Controls>

                <Popup failed={failed} gameCompleted={gameCompleted}></Popup>
                <Statistics
                    gamesFailed={gamesFailed}
                    gamesPassed={gamesPassed}
                ></Statistics>
            </div>

            <Prison boxes={boxes}></Prison>
        </div>
    );
};

export default Home;
