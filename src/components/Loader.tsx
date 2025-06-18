"use client"
import { type Variants } from "motion/react"
import { motion, } from "motion/react"

function LoadingThreeDotsPulse() {
    const dotVariants = {
        pulse: {
            scale: [1, 1.5, 1],
            transition: {
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="pulse"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
            <motion.div className="dot" variants={dotVariants as Variants} />
            <motion.div className="dot" variants={dotVariants as Variants} />
            <motion.div className="dot" variants={dotVariants as Variants} />
            <StyleSheet />
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
            .container {
                width: 100vw;
                height: fit-content;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 20px;
            }

            .dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: #7e3af2;
                will-change: transform;
            }
            `}
        </style>
    )
}

export default LoadingThreeDotsPulse
