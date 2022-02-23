import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Dog({ selectedAnswer }: any) {
    const [playAnimation, setPlayAnimation] = useState<boolean>(false);

    const variantsLeftEar = {
        normal: { transform: 'rotate(0deg) translateX(0rem)' },
        rotate: { transform: 'rotate(45deg) translateX(-3.2rem)' }
    }

    const variantsRightEar = {
        normal: { transform: 'rotate(0deg) translateX(0rem)' },
        rotate: { transform: 'rotate(-45deg) translateX(3.2rem)' }
    }

    useEffect(() => {
        if (selectedAnswer) {
            setPlayAnimation(true);
        } else {
            setPlayAnimation(false);
        }
    }, [selectedAnswer]);

    return (
        <svg width="442" height="413" viewBox="0 -70 250 380" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group 1">
                <path id="Head" d="M255.5 125.5C255.5 194.526 198.426 250.5 128 250.5C57.5744 250.5 0.5 194.526 0.5 125.5C0.5 56.4737 57.5744 0.5 128 0.5C198.426 0.5 255.5 56.4737 255.5 125.5Z" fill="#AF8A6F" stroke="black" />
            </g>
            <rect id="Rectangle 1" x="105" y="119" width="46" height="35" rx="11" fill="#FFB4B4" />
            <ellipse id="Ellipse 1" cx="161.5" cy="85" rx="8.5" ry="13" fill="black" />
            <ellipse id="Ellipse 2" cx="94.5" cy="85" rx="8.5" ry="13" fill="black" />
            <g id="Ellipse 3">
                <ellipse cx="93.5" cy="93.5" rx="2.5" ry="3.5" fill="white" />
                <ellipse cx="93.5" cy="93.5" rx="2.5" ry="3.5" fill="white" />
                <ellipse cx="93.5" cy="93.5" rx="2.5" ry="3.5" fill="white" />
            </g>
            <g id="Ellipse 4">
                <ellipse cx="160.5" cy="93.5" rx="2.5" ry="3.5" fill="white" />
                <ellipse cx="160.5" cy="93.5" rx="2.5" ry="3.5" fill="white" />
                <ellipse cx="160.5" cy="93.5" rx="2.5" ry="3.5" fill="white" />
            </g>
            <g id="Ellipse 5">
                <ellipse cx="97" cy="88.5" rx="2" ry="2.5" fill="white" />
                <ellipse cx="97" cy="88.5" rx="2" ry="2.5" fill="white" />
                <ellipse cx="97" cy="88.5" rx="2" ry="2.5" fill="white" />
            </g>
            <g id="Ellipse 6">
                <ellipse cx="164" cy="88.5" rx="2" ry="2.5" fill="white" />
                <ellipse cx="164" cy="88.5" rx="2" ry="2.5" fill="white" />
                <ellipse cx="164" cy="88.5" rx="2" ry="2.5" fill="white" />
            </g>
            <path id="Ellipse 9" d="M139 169C139 177.837 134.299 185 128.5 185C122.701 185 118 177.837 118 169C118 160.163 122.701 157 128.5 157C134.299 157 139 160.163 139 169Z" fill="#FF8686" />
            <path id="Ellipse 7" d="M128 153.5C128 156.192 127.366 158.858 126.135 161.345C124.904 163.832 123.099 166.092 120.824 167.996C118.549 169.899 115.848 171.409 112.876 172.44C109.903 173.47 106.717 174 103.5 174C100.283 174 97.0967 173.47 94.1243 172.44C91.1518 171.409 88.4509 169.899 86.1759 167.996C83.9008 166.092 82.0962 163.832 80.865 161.345C79.6337 158.858 79 156.192 79 153.5L103.5 153.5H128Z" fill="#D0B099" />
            <path id="Ellipse 8" d="M176 153.5C176 156.192 175.366 158.858 174.135 161.345C172.904 163.832 171.099 166.092 168.824 167.996C166.549 169.899 163.848 171.409 160.876 172.44C157.903 173.47 154.717 174 151.5 174C148.283 174 145.097 173.47 142.124 172.44C139.152 171.409 136.451 169.899 134.176 167.996C131.901 166.092 130.096 163.832 128.865 161.345C127.634 158.858 127 156.192 127 153.5L151.5 153.5H176Z" fill="#D0B099" />
            <circle id="Ellipse 10" cx="139.5" cy="151.5" r="1.5" fill="black" />
            <circle id="Ellipse 11" cx="118.5" cy="151.5" r="1.5" fill="black" />
            <motion.path
                variants={variantsLeftEar}
                animate={playAnimation ? 'rotate' : 'normal'}
                id="Ellipse 12" d="M54.5 104C54.5 153.429 46.6649 193.5 37 193.5C27.335 193.5 19.5 153.429 19.5 104C19.5 54.5705 45 29.5 51 27C56.9999 24.5 54.5 54.5705 54.5 104Z" fill="#473212" />
            <motion.path 
            variants={variantsRightEar}
            animate={playAnimation ? 'rotate' : 'normal'}
            id="Ellipse 13" d="M202.016 104C202.016 153.429 209.851 193.5 219.516 193.5C229.181 193.5 237.016 153.429 237.016 104C237.016 54.5705 211.516 29.5 205.516 27C199.517 24.5 202.016 54.5705 202.016 104Z" fill="#473212" />
            <path id="Polygon 1" d="M137.611 202.5L128.5 218.967L119.389 202.5H137.611Z" fill="#A85353" stroke="black" />
            <path id="Polygon 2" d="M128.5 220.831L148.452 247.301L148.5 247.364L148.565 247.41L149.625 248.15L128.499 250.497L107.096 248.171L108.395 247.435L108.485 247.384L108.548 247.301L128.5 220.831Z" fill="#A85353" stroke="black" />
            <path id="Rectangle 2" d="M134.93 209.828L137.828 204.446L239.208 184.97L235.665 192.051L134.93 209.828Z" fill="#A85353" stroke="black" />
            <path id="Rectangle 3" d="M122.232 209.824L119.336 204.446L16.5316 184.707L20.8066 191.547L122.232 209.824Z" fill="#A85353" stroke="black" />
        </svg>

    )
}

export default Dog;