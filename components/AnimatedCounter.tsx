"use client"
import React from 'react';
import CountUp from "react-countup";

const AnimatedCounter = ({end,prefix="",duration=2,start=0}:AnimatedCounterProps) => {
    return (
        <CountUp
            prefix={prefix}
            duration={duration}
            end={end}
            start={start}
        />
    );
};

export default AnimatedCounter;
