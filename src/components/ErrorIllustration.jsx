// Animated illustration component for displaying visual feedback on error pages.
import { motion } from "framer-motion";

export default function ErrorIllustration({ code }) {
  const getIcon = () => {
    switch (code) {
      case "403":
        return "fa-solid fa-lock";
      case "404":
        return "fa-solid fa-map-signs";
      case "500":
        return "fa-solid fa-triangle-exclamation";
      default:
        return "fa-solid fa-circle-exclamation";
    }
  };
  return (
    <motion.div
      className="error-illustration"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.6,
      }}
    >
      <motion.i
        className={getIcon()}
        animate={{
          y: [0, -10, 0],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />
      {code && <span>{code}</span>}
    </motion.div>
  );
}
