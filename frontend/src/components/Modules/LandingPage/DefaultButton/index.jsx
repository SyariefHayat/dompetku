import React from 'react';
import { useAtom } from 'jotai';
import { motion } from 'framer-motion';

import { isLoginAtom, isRightAtom } from '@/jotai/atoms';

const DefaultButton = ({ text, styles, path }) => {
    const [, setIsLogin] = useAtom(isLoginAtom);
    const [, setIsRight] = useAtom(isRightAtom);

    return (
        <motion.a
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => {
                setIsLogin(true);
                setIsRight(true);
            }}
            href={path}  
            className={`px-7 py-3 rounded-full ${styles}`}
        >
            {text}
        </motion.a>
    )
}

export default DefaultButton