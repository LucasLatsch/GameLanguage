import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const Login = () => {
  const signIn = useAuthStore((state) => state.signIn);
  const loading = useAuthStore((state) => state.loading);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(email, password);
    navigate("/");
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
          Treine idiomas <br /> de forma inteligente
        </h1>

        <p className="mt-6 text-lg opacity-90 max-w-md">
          Memorize palavras e frases através de repetição ativa, foco e
          constância.
        </p>

        <div className="mt-10 text-sm opacity-80">
          Language Cards © {new Date().getFullYear()}
        </div>
      </motion.div>

      {/* RIGHT / LOGIN */}
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
                <h2 className="text-2xl font-bold">Bem-vindo(a)</h2>
                <p className="text-sm opacity-70">
                  Entre para continuar seu treino
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    placeholder="••••••••"
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
                    "Entrar"
                  )}
                </button>
              </form>

              <div className="text-center text-sm opacity-70">
                Ainda não tem conta?{" "}
                <a href="/register" className="link link-primary font-medium">
                  Crie uma agora
                </a>
              </div>

              {/* Footer */}
              <div className="text-center text-xs opacity-60">
                Uma palavra por dia já muda tudo 🚀
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
