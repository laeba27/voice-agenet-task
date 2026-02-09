import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '' }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`relative backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8 overflow-hidden ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyber-blue/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyber-purple/30 rounded-full blur-3xl" />
            <div className="relative z-10 h-full flex flex-col">
                {children}
            </div>
        </motion.div>
    );
};

export default GlassCard;
