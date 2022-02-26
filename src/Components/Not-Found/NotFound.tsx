import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Cat from '../../resources/images/Cat.png';

function NotFound() {
    return (
        <div>
            <h1 className='header mt-10 mb-10'>Not Found <FontAwesomeIcon icon={faExclamationTriangle} className='text-amber-500' /></h1>
            <div className="">
                <motion.img
                    animate={{
                        rotateY: [0, 0, -180, 0, 0],
                    }}

                    transition={{
                        type: 'spring',
                        repeat: Infinity,
                        duration: 2
                    }}
                    src={Cat} className='w-[20rem] m-auto bg-red-300 p-3 rounded-lg shadow-md shadow-black' />
            </div>
            <small className='header'>Look how i Dance.</small>

            <div className='mt-20'>
                <h5 className='header text-red-600 text-2xl'>If you want to go back click <Link to={'/'} className='text-blue-300'>here.</Link></h5>
            </div>

        </div>
    )
}

export default NotFound;