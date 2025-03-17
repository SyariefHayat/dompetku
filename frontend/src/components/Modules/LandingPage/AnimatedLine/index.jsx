import React, { useEffect, useRef } from "react";

const AnimatedLine = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;

        canvas.width = width;
        canvas.height = height;

        const path = [
            { x: 610, y: 0 },
            { x: 610, y: 130 },
            { x: 300, y: 130 },
            { x: 300, y: 280 },
            { x: 1150, y: 280 },
            { x: 1150, y: 435 },
            { x: 100, y: 435 },
            { x: 100, y: 1035 },
        ];

        const totalPathLength = path.reduce((length, point, index) => {
            if (index === 0) return 0;
            
            const prev = path[index - 1];
            return (
                length +
                Math.sqrt(
                    Math.pow(point.x - prev.x, 2) + Math.pow(point.y - prev.y, 2)
                )
            );
        }, 0);

        const drawLine = (progress) => {
            ctx.clearRect(0, 0, width, height);
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);

            let coveredLength = 0;

            for (let i = 1; i < path.length; i++) {
                const prevPoint = path[i - 1];
                const currentPoint = path[i];
                const segmentLength = Math.sqrt(
                    Math.pow(currentPoint.x - prevPoint.x, 2) +
                    Math.pow(currentPoint.y - prevPoint.y, 2)
                );

                if (coveredLength + segmentLength < progress) {
                    ctx.lineTo(currentPoint.x, currentPoint.y);
                    coveredLength += segmentLength;
                } else {
                    const remaining = progress - coveredLength;
                    const t = remaining / segmentLength;
                    const interpolatedX =
                    prevPoint.x + t * (currentPoint.x - prevPoint.x);
                    const interpolatedY =
                    prevPoint.y + t * (currentPoint.y - prevPoint.y);
                    ctx.lineTo(interpolatedX, interpolatedY);
                    break;
                }       
            }

                ctx.strokeStyle = "#facc15";
                ctx.lineWidth = 15;
                ctx.stroke();
        };

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const parallaxFactor = 1;

            // Periksa apakah posisi scroll berada dalam rentang 300-630
            if (scrollY >= 150 && scrollY <= 630) {
                // Normalisasi progres relatif terhadap rentang
                const progress = ((scrollY - 150) / (700 - 150)) * totalPathLength * parallaxFactor;
                drawLine(progress);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute w-full h-full"></canvas>;
};

export default AnimatedLine;
