import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Cat({ selectedAnswer }: any) {
    const [playAnimation, setPlayAnimation] = useState<boolean>(false);

    const variantsLeft = {
        normal: { transform: 'rotate(0deg) translate(0px)' },
        angry: { transform: 'rotate(40deg) translate(10px)' }
    }

    const variantsRight = {
        normal: { transform: 'rotate(0deg) translate(0px)' },
        angry: { transform: 'rotate(-40deg) translate(-10px)'}
    }

    useEffect(() => {
        if (selectedAnswer) {
            setPlayAnimation(true);
        } else {
            setPlayAnimation(false);
        }
    }, [selectedAnswer]);

    return (
        <svg width="442" height="413" viewBox="0 0 442 413" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Desktop - 1" clipPath="url(#clip0_2_2)">
                <motion.path
                    animate={{
                        rotate: [0, 0, -10, 0, 0],
                    }}

                    transition={{
                        type: 'spring',
                        repeat: Infinity,
                        duration: 2
                    }}
                    id="Polygon 2" d="M77.5275 71.3137C75.881 63.0384 84.1736 56.2992 91.9373 59.6033L196.614 104.151C203.891 107.248 205.261 116.973 199.124 121.961L116.646 188.988C110.509 193.975 101.269 190.644 99.7263 182.888L77.5275 71.3137Z" fill="#FFB950" stroke="black" />
                <motion.path
                    animate={{
                        rotate: [0, 0, 10, 0, 0],
                    }}

                    transition={{
                        type: 'spring',
                        repeat: Infinity,
                        duration: 2
                    }}
                    id="Polygon 3" d="M357.954 59.1939C364.999 56.2547 372.459 62.4053 370.916 69.8817L347.204 184.774C345.758 191.781 337.377 194.735 331.856 190.183L247.298 120.459C241.778 115.907 243.081 107.116 249.684 104.361L357.954 59.1939Z" fill="#FFB950" stroke="black" />
                <motion.g
                    animate={{
                        rotate: [0, 0, -10, 0, 0],
                    }}

                    transition={{
                        type: 'spring',
                        repeat: Infinity,
                        duration: 2
                    }}
                    id="Polygon 4">
                    <g filter="url(#filter0_i_2_2)">
                        <path d="M94.007 86.56C92.7893 79.1535 100.639 73.5985 107.219 77.2107L163.423 108.067C169.251 111.266 169.718 119.463 164.291 123.303L118.488 155.715C113.061 159.555 105.487 156.388 104.408 149.828L94.007 86.56Z" fill="#FFD0D0" />
                    </g>
                    <path d="M94.5004 86.4789C93.3504 79.4838 100.764 74.2375 106.978 77.649L163.183 108.505C168.687 111.527 169.127 119.268 164.002 122.895L118.199 155.306C113.074 158.933 105.92 155.943 104.902 149.747L94.5004 86.4789Z" stroke="black" />
                </motion.g>
                <motion.g
                    animate={{
                        rotate: [0, 0, 10, 0, 0],
                    }}

                    transition={{
                        type: 'spring',
                        repeat: Infinity,
                        duration: 2
                    }}
                    id="Polygon 5">
                    <g filter="url(#filter1_i_2_2)">
                        <path d="M337.817 80.3672C345.521 77.1734 353.519 84.2586 351.278 92.2918L335.032 150.532C333.047 157.647 324.298 160.228 318.769 155.33L279.161 120.244C273.631 115.346 275.138 106.35 281.962 103.521L337.817 80.3672Z" fill="#FFD0D0" />
                    </g>
                    <path d="M338.008 80.829C345.327 77.795 352.926 84.5259 350.797 92.1575L334.55 150.397C332.665 157.157 324.353 159.609 319.1 154.956L279.492 119.87C274.239 115.217 275.671 106.67 282.154 103.983L338.008 80.829Z" stroke="black" />
                </motion.g>
                <path id="Head" d="M350.5 224.5C350.5 293.526 293.426 349.5 223 349.5C152.574 349.5 95.5 293.526 95.5 224.5C95.5 155.474 152.574 99.5 223 99.5C293.426 99.5 350.5 155.474 350.5 224.5Z" fill="#FFB950" stroke="black" />
                <g id="Polygon 8">
                    <path d="M227.722 149.535C226.393 152.917 221.607 152.917 220.278 149.535L203.346 106.486C202.397 104.074 203.957 101.407 206.53 101.098C220.325 99.4365 229.32 99.4727 241.539 101.052C244.088 101.381 245.619 104.032 244.678 106.425L227.722 149.535Z" fill="#DF972A" />
                    <path d="M227.722 149.535C226.393 152.917 221.607 152.917 220.278 149.535L203.346 106.486C202.397 104.074 203.957 101.407 206.53 101.098C220.325 99.4365 229.32 99.4727 241.539 101.052C244.088 101.381 245.619 104.032 244.678 106.425L227.722 149.535Z" fill="#DF972A" />
                    <path d="M227.722 149.535C226.393 152.917 221.607 152.917 220.278 149.535L203.346 106.486C202.397 104.074 203.957 101.407 206.53 101.098C220.325 99.4365 229.32 99.4727 241.539 101.052C244.088 101.381 245.619 104.032 244.678 106.425L227.722 149.535Z" fill="#DF972A" />
                    <path d="M227.722 149.535C226.393 152.917 221.607 152.917 220.278 149.535L203.346 106.486C202.397 104.074 203.957 101.407 206.53 101.098C220.325 99.4365 229.32 99.4727 241.539 101.052C244.088 101.381 245.619 104.032 244.678 106.425L227.722 149.535Z" fill="#DF972A" />
                </g>
                <g id="Polygon 9">
                    <path d="M227.722 183.535C226.393 186.917 221.607 186.917 220.278 183.535L203.346 140.486C202.397 138.074 203.957 135.407 206.53 135.098C220.325 133.437 229.32 133.473 241.539 135.052C244.088 135.381 245.619 138.032 244.678 140.425L227.722 183.535Z" fill="#DF972A" />
                    <path d="M227.722 183.535C226.393 186.917 221.607 186.917 220.278 183.535L203.346 140.486C202.397 138.074 203.957 135.407 206.53 135.098C220.325 133.437 229.32 133.473 241.539 135.052C244.088 135.381 245.619 138.032 244.678 140.425L227.722 183.535Z" fill="#DF972A" />
                    <path d="M227.722 183.535C226.393 186.917 221.607 186.917 220.278 183.535L203.346 140.486C202.397 138.074 203.957 135.407 206.53 135.098C220.325 133.437 229.32 133.473 241.539 135.052C244.088 135.381 245.619 138.032 244.678 140.425L227.722 183.535Z" fill="#DF972A" />
                    <path d="M227.722 183.535C226.393 186.917 221.607 186.917 220.278 183.535L203.346 140.486C202.397 138.074 203.957 135.407 206.53 135.098C220.325 133.437 229.32 133.473 241.539 135.052C244.088 135.381 245.619 138.032 244.678 140.425L227.722 183.535Z" fill="#DF972A" />
                </g>
                <g id="Polygon 10">
                    <path d="M227.722 213.535C226.393 216.917 221.607 216.917 220.278 213.535L203.346 170.486C202.397 168.074 203.957 165.407 206.53 165.098C220.325 163.437 229.32 163.473 241.539 165.052C244.088 165.381 245.619 168.032 244.678 170.425L227.722 213.535Z" fill="#DF972A" />
                    <path d="M227.722 213.535C226.393 216.917 221.607 216.917 220.278 213.535L203.346 170.486C202.397 168.074 203.957 165.407 206.53 165.098C220.325 163.437 229.32 163.473 241.539 165.052C244.088 165.381 245.619 168.032 244.678 170.425L227.722 213.535Z" fill="#DF972A" />
                    <path d="M227.722 213.535C226.393 216.917 221.607 216.917 220.278 213.535L203.346 170.486C202.397 168.074 203.957 165.407 206.53 165.098C220.325 163.437 229.32 163.473 241.539 165.052C244.088 165.381 245.619 168.032 244.678 170.425L227.722 213.535Z" fill="#DF972A" />
                    <path d="M227.722 213.535C226.393 216.917 221.607 216.917 220.278 213.535L203.346 170.486C202.397 168.074 203.957 165.407 206.53 165.098C220.325 163.437 229.32 163.473 241.539 165.052C244.088 165.381 245.619 168.032 244.678 170.425L227.722 213.535Z" fill="#DF972A" />
                </g>
                <g id="Eye2" filter="url(#filter2_d_2_2)">
                    <ellipse cx="275.5" cy="196" rx="26.5" ry="26" fill="black" />
                    <path d="M301.5 196C301.5 210.074 289.868 221.5 275.5 221.5C261.132 221.5 249.5 210.074 249.5 196C249.5 181.926 261.132 170.5 275.5 170.5C289.868 170.5 301.5 181.926 301.5 196Z" stroke="black" />
                </g>
                <g id="Eye1" filter="url(#filter3_d_2_2)">
                    <ellipse cx="170.5" cy="196" rx="26.5" ry="26" fill="black" />
                    <path d="M196.5 196C196.5 210.074 184.868 221.5 170.5 221.5C156.132 221.5 144.5 210.074 144.5 196C144.5 181.926 156.132 170.5 170.5 170.5C184.868 170.5 196.5 181.926 196.5 196Z" stroke="black" />
                </g>
                <ellipse id="Ellipse 1" cx="168.5" cy="186.5" rx="10.5" ry="9.5" fill="white" />
                <ellipse id="Ellipse 2" cx="268.5" cy="186.5" rx="10.5" ry="9.5" fill="white" />
                <ellipse id="Ellipse 3" cx="184.5" cy="191" rx="5.5" ry="5" fill="white" />
                <ellipse id="Ellipse 4" cx="284.5" cy="191" rx="5.5" ry="5" fill="white" />
                <g id="Polygon 1" filter="url(#filter4_d_2_2)">
                    <path d="M226.035 246.335C223.672 249.954 218.373 249.962 215.998 246.351L208.901 235.558C206.28 231.571 209.134 226.268 213.905 226.261L228.066 226.239C232.837 226.232 235.708 231.526 233.099 235.52L226.035 246.335Z" fill="#FFD0D0" />
                    <path d="M216.416 246.076L209.319 235.283C206.916 231.629 209.533 226.768 213.906 226.761L228.067 226.739C232.44 226.732 235.072 231.585 232.68 235.247L225.616 246.062C223.45 249.379 218.593 249.386 216.416 246.076Z" stroke="black" />
                </g>
                <path id="Vector 1" d="M170 258.5C190.626 281.654 201.811 282.257 221 258.5C241.649 284.583 252.789 283.655 272 258.5" stroke="black" />
                <g id="Polygon 6" filter="url(#filter5_d_2_2)">
                    <path d="M197.961 284.564C197.348 286.361 194.811 286.374 194.181 284.583L192.192 278.931C191.639 277.358 193.157 275.84 194.815 276.023C195.634 276.113 196.413 276.113 197.209 276.025C198.873 275.842 200.422 277.346 199.882 278.931L197.961 284.564Z" fill="white" />
                    <path d="M194.653 284.417L192.664 278.765C192.459 278.182 192.628 277.6 193.039 277.16C193.456 276.715 194.097 276.447 194.76 276.52C195.615 276.614 196.431 276.614 197.263 276.522C197.932 276.449 198.584 276.715 199.011 277.161C199.432 277.601 199.608 278.182 199.408 278.77L197.488 284.403C197.028 285.751 195.126 285.76 194.653 284.417Z" stroke="black" />
                </g>
                <g id="Polygon 7" filter="url(#filter6_d_2_2)">
                    <path d="M248.961 285.564C248.348 287.361 245.811 287.374 245.181 285.583L243.142 279.788C242.597 278.24 244.054 276.741 245.685 276.918C246.58 277.015 247.438 277.015 248.332 276.916C249.97 276.735 251.461 278.23 250.929 279.79L248.961 285.564Z" fill="white" />
                    <path d="M245.653 285.417L243.614 279.622C243.411 279.047 243.572 278.474 243.967 278.044C244.365 277.608 244.983 277.344 245.631 277.415C246.562 277.516 247.456 277.516 248.387 277.413C249.04 277.341 249.67 277.604 250.079 278.042C250.485 278.475 250.654 279.05 250.456 279.629L248.488 285.403C248.028 286.751 246.126 286.76 245.653 285.417Z" stroke="black" />
                </g>
                <ellipse id="Ellipse 5" cx="221" cy="232.5" rx="5" ry="2.5" fill="#FEE5E5" />
                <g id="Ellipse 6" filter="url(#filter7_f_2_2)">
                    <ellipse cx="170" cy="211" rx="14" ry="11" fill="#0D2167" />
                </g>
                <g id="Ellipse 7" filter="url(#filter8_f_2_2)">
                    <ellipse cx="276" cy="211" rx="14" ry="11" fill="#0D2167" />
                </g>
                <g id="Ellipse 8" filter="url(#filter9_f_2_2)">
                    <ellipse cx="170.5" cy="212.5" rx="11.5" ry="7.5" fill="#1D4E88" />
                </g>
                <g id="Ellipse 9" filter="url(#filter10_f_2_2)">
                    <ellipse cx="276.5" cy="212.5" rx="11.5" ry="7.5" fill="#1D4E88" />
                </g>
                <g id="Vector 2" filter="url(#filter11_d_2_2)">
                    <path d="M258 235C258 235 285.338 217.435 316 220C346.662 222.565 375.93 220.678 374 205M261.5 249.5C261.5 249.5 284.5 260.5 317.75 256.75C351 253 374 264 374 264M284 241.5C284 241.5 335.5 249.5 365.5 236.176C395.5 222.852 383.5 235 383.5 235" stroke="black" />
                </g>
                <g id="Vector 3" filter="url(#filter12_d_2_2)">
                    <path d="M189.87 234C189.87 234 162.533 216.435 131.87 219C101.208 221.565 71.94 219.678 73.8704 204M186.37 248.5C186.37 248.5 163.37 259.5 130.12 255.75C96.8704 252 73.8704 263 73.8704 263M163.87 240.5C163.87 240.5 112.37 248.5 82.3704 235.176C52.3704 221.852 64.3704 234 64.3704 234" stroke="black" />
                </g>
                <motion.g
                    variants={variantsLeft}
                    animate={playAnimation ? 'angry' : 'normal'}
                    id="Vector 4" filter="url(#filter13_d_2_2)">
                    <path d="M140 171C153.392 145.323 165.432 141.129 195.5 153C167.706 148.99 155.131 152.169 140 171Z" fill="#D27620" />
                    <path d="M140 171C153.392 145.323 165.432 141.129 195.5 153C167.706 148.99 155.131 152.169 140 171Z" stroke="black" />
                </motion.g>
                <motion.g
                    variants={variantsRight}
                    animate={playAnimation ? 'angry' : 'normal'}
                    id="Vector 5" filter="url(#filter14_d_2_2)">
                    <path d="M304.5 173.328C291.108 147.652 279.068 143.457 249 155.328C276.794 151.319 289.369 154.497 304.5 173.328Z" fill="#D27620" />
                    <path d="M304.5 173.328C291.108 147.652 279.068 143.457 249 155.328C276.794 151.319 289.369 154.497 304.5 173.328Z" stroke="black" />
                </motion.g>
            </g>
            <defs>
                <filter id="filter0_i_2_2" x="93.881" y="76.0794" width="74.2112" height="85.2973" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_2" />
                </filter>
                <filter id="filter1_i_2_2" x="275.789" y="79.5836" width="75.872" height="82.2674" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_2_2" />
                </filter>
                <filter id="filter2_d_2_2" x="245" y="170" width="61" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter3_d_2_2" x="140" y="170" width="61" height="60" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter4_d_2_2" x="203.904" y="226.239" width="34.181" height="30.8149" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter5_d_2_2" x="188.076" y="276.008" width="15.9148" height="17.9115" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter6_d_2_2" x="239.026" y="276.901" width="16.0134" height="18.0177" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter7_f_2_2" x="152" y="196" width="36" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2_2" />
                </filter>
                <filter id="filter8_f_2_2" x="258" y="196" width="36" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2_2" />
                </filter>
                <filter id="filter9_f_2_2" x="155" y="201" width="31" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2_2" />
                </filter>
                <filter id="filter10_f_2_2" x="261" y="201" width="31" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                    <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2_2" />
                </filter>
                <filter id="filter11_d_2_2" x="253.73" y="204.939" width="136.64" height="67.5122" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter12_d_2_2" x="57.4999" y="203.939" width="136.64" height="67.5122" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter13_d_2_2" x="135.557" y="146.172" width="64.1269" height="33.1414" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <filter id="filter14_d_2_2" x="244.816" y="148.5" width="64.1269" height="33.1414" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_2" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_2" result="shape" />
                </filter>
                <clipPath id="clip0_2_2">
                    <rect width="442" height="413" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export default Cat;