import { motion } from "framer-motion";
import ThemeSelector from "../components/ThemeSelector";

const Settings = () => {
  return (
    <div className="min-h-screen pt-24 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-2">⚙️ Configurações</h1>
        <p className="text-base-content/70 mb-6">
          Personalize a aparência do aplicativo
        </p>

        <div className="card bg-base-100 shadow-md">
          <ThemeSelector />
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
