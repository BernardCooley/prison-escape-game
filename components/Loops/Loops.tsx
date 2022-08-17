import React, { useState, useEffect } from "react";
import styles from "./Loops.module.scss";
import { ISlicedLoop } from "../../types";
import Loop from "../Loop/Loop";

interface Props {
    loops: ISlicedLoop[];
}

const Loops = ({ loops }: Props) => {
    const [purgedLoops, setPurgedLoops] = useState<number[][]>([]);

    useEffect(() => {
        const uniqueLoopsSet = new Set(
            loops.map((loop) => {
                const indexOfLowestNumber = loop.loop.indexOf(
                    Math.min(...loop.loop)
                );

                const firstPart = loop.loop.slice(0, indexOfLowestNumber);
                const secondPart = loop.loop.slice(
                    indexOfLowestNumber,
                    loop.loop.length
                );

                return JSON.stringify([...secondPart, ...firstPart]);
            })
        );

        const uniqueLoopsArray: number[][] = [];

        uniqueLoopsSet.forEach((loop) => {
            uniqueLoopsArray.push(JSON.parse(loop));
        });

        setPurgedLoops(uniqueLoopsArray);
    }, []);

    return (
        <div className={styles.container}>
            <Loop></Loop>
        </div>
    );
};

export default Loops;
