import { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const Register = () => {
  const signUp = useAuthStore((state) => state.signUp);
  const loading = useAuthStore((state) => state.loading);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(nome, email, password);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 pt-16">
      {/* LEFT / BRANDING */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="hidden lg:flex flex-col justify-center px-16 bg-primary text-primary-content"
      >
        <h1 className="text-4xl font-bold leading-tight">
          Comece hoje <br /> seu treino diário
        </h1>

        <p className="mt-6 text-lg opacity-90 max-w-md">
          Crie sua conta e comece a memorizar palavras com foco e consistência.
        </p>

        <div className="mt-10 text-sm opacity-80">
          Language Cards © {new Date().getFullYear()}
        </div>
      </motion.div>

      {/* RIGHT / REGISTER */}
      <div className="flex items-center justify-center bg-base-200 px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body gap-6">
              {/* Header */}
              <div className="text-center">
                <h2 className="text-2xl font-bold">Criar conta</h2>
                <p className="text-sm opacity-70">Leva menos de 1 minuto 🚀</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nome</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Seu Nome"
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="seu@email.com"
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Senha</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Crie uma senha segura"
                    className="input input-bordered focus:outline-none focus:ring-2 focus:ring-primary/40"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary mt-2"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    "Criar conta"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="text-center text-sm opacity-70">
                Já tem conta?{" "}
                <a href="/login" className="link link-primary font-medium">
                  Entrar
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
