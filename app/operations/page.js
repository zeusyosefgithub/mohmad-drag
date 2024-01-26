'use client'

import { PageOne } from "../Page Components/PageOne";
import { PageTwo } from "../Page Components/PageTwo";
import { PageThree } from "../Page Components/PageThree";
import { PageFour } from "../Page Components/PageFour";
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import { Button } from "@nextui-org/button";
import { PageFive } from "../Page Components/PageFive";

export default function Operations(){

    const componentRefOne = useRef();
    
    const handlePrint = useReactToPrint({
        pageStyle: `@page {
            size: A4;
            margin: 0;
        }`,
        content: () => componentRefOne.current,
    });

    return (
        <div>
            124
        </div>
    )
}