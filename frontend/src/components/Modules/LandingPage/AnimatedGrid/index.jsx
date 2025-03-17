import {  motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const AnimatedGridPattern = () => {
    const gridAnimation = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: { delay: i * 0.05, duration: 0.3, ease: "easeInOut" },
        }),
    };

    const canvasRef = useRef(null);
    const [startAnimation, setStartAnimation] = useState(false); // Untuk delay animasi

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const width = (canvas.width = canvas.offsetWidth);
        const height = (canvas.height = canvas.offsetHeight);

        let progress = 0; // Posisi ular sepanjang lintasan
        const snakeLength = 100; // Panjang ular (konstan)

        // Lintasan path yang telah dibuat
        const path = [
            { x: 0, y: 0 },
            { x: 137, y: 0 },
            { x: 137, y: 100 },
            { x: 273, y: 100 },
            { x: 273, y: 200 },
            { x: 547, y: 200 },
            { x: 685, y: 200 },
            { x: 820, y: 200 },
            { x: 957, y: 200 },
            { x: 1080, y: 200 },
            { x: 1080, y: 100 },
            { x: 1217, y: 100 },
            { x: 1217, y: 0 },
            { x: 1360, y: 0 },
        ];

        // Hitung panjang total lintasan
        const getPathLength = (path) => {
            let length = 0;
            for (let i = 1; i < path.length; i++) {
                const dx = path[i].x - path[i - 1].x;
                const dy = path[i].y - path[i - 1].y;
                length += Math.sqrt(dx * dx + dy * dy);
            }
            return length;
        };

        const totalPathLength = getPathLength(path);

        // Fungsi untuk menghitung posisi interpolasi di antara dua titik
        const interpolate = (start, end, t) => {
            return {
                x: start.x + (end.x - start.x) * t,
                y: start.y + (end.y - start.y) * t,
            };
        };

        // Fungsi untuk menggambar ular dengan efek neon
        const drawSnake = (progress) => {
            ctx.clearRect(0, 0, width, height); // Bersihkan canvas

            let distanceCovered = 0; // Total jarak yang telah dilalui oleh ular
            let snakeStart = progress;
            let snakeEnd = progress + snakeLength;

            ctx.beginPath();
            for (let i = 1; i < path.length; i++) {
                const prevPoint = path[i - 1];
                const currentPoint = path[i];

                const segmentLength = Math.sqrt(
                    Math.pow(currentPoint.x - prevPoint.x, 2) +
                    Math.pow(currentPoint.y - prevPoint.y, 2)
                );

                // Jika ular belum melewati segmen ini, lanjutkan ke segmen berikutnya
                if (distanceCovered + segmentLength < snakeStart) {
                    distanceCovered += segmentLength;
                    continue;
                }

                // Jika bagian akhir ular sudah melewati segmen ini, berhenti menggambar
                if (distanceCovered > snakeEnd) {
                    break;
                }

                // Hitung posisi awal ular pada segmen ini
                if (snakeStart > distanceCovered && snakeStart <= distanceCovered + segmentLength) {
                    const t = (snakeStart - distanceCovered) / segmentLength;
                    const start = interpolate(prevPoint, currentPoint, t);
                    ctx.moveTo(start.x, start.y);
                }

                // Hitung posisi akhir ular pada segmen ini
                if (snakeEnd > distanceCovered && snakeEnd <= distanceCovered + segmentLength) {
                    const t = (snakeEnd - distanceCovered) / segmentLength;
                    const end = interpolate(prevPoint, currentPoint, t);
                    ctx.lineTo(end.x, end.y);
                    break;
                }

                // Jika ular melintasi seluruh segmen, lanjutkan menggambar segmen penuh
                ctx.lineTo(currentPoint.x, currentPoint.y);
                distanceCovered += segmentLength;
            }

            // Efek neon menggunakan `shadowBlur` dan `shadowColor`
            ctx.shadowColor = "#00FFFF";    // Warna neon (cyan)
            ctx.shadowBlur = 20;            // Ukuran efek glow
            ctx.strokeStyle = "#0ea5e9";    // Warna ular
            ctx.lineWidth = 5;              // Lebar garis ular
            ctx.stroke();
        };

        // Fungsi animasi
        const animate = () => {
            progress += 2; // Kecepatan pergerakan ular
            if (progress > totalPathLength) {
                progress = 0; // Reset jika ular sudah mencapai ujung lintasan
            }
            drawSnake(progress);
            requestAnimationFrame(animate);
        };

        // Menunggu 1.5 detik sebelum animasi dimulai
        setTimeout(() => {
            setStartAnimation(true);
        }, 4000); // Delay 4 detik

        if (startAnimation) {
            animate();
        }

        return () => cancelAnimationFrame(animate);
    }, [startAnimation]);

    return (
        <div className="grid-container w-full h-[50%] absolute bottom-0 overflow-hidden">
            {/* Grid Pattern */}
            <div className="grid grid-cols-10 gap-0 w-full h-full border-b-[1px] border-gray-300">
                {Array.from({ length: 30 }).map((_, idx) => (
                    <motion.div
                        key={idx}
                        className="outline outline-1 outline-gray-300"
                        initial="hidden"
                        animate="visible"
                        custom={idx}
                        variants={gridAnimation}
                    ></motion.div>
                ))}
                <canvas ref={canvasRef} className="absolute w-full h-full"></canvas>
            </div>
        </div>
    );
};

export default AnimatedGridPattern;