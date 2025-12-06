"use client";

import { useState, FormEvent } from "react";
// Imports reais (comentados para o preview)
import { useAuth } from "./AuthProvider";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2 } from "lucide-react";

// --- INÍCIO DOS MOCKS (ATIVADOS PARA O PREVIEW) ---
// Para o preview funcionar, precisamos simular os imports
// const useAuth = () => ({
//   login: async (email, password) => {
//     console.log("Mock Login (Preview):", email);
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         if (password === "senha123") {
//           console.log("Mock Login OK");
//           resolve();
//         } else {
//           console.log("Mock Login Falhou");
//           reject(new Error("Credenciais inválidas"));
//         }
//       }, 1000);
//     });
//   },
// });

// // Simula o framer-motion (motion.div)
// const motion = {
//   div: ({ children, initial, animate, transition, ...props }) => (
//     <div {...props}>{children}</div>
//   ),
// };

// // Simula os ícones Lucide
// const Mail = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
//     <polyline points="22,6 12,13 2,6"></polyline>
//   </svg>
// );
// const Lock = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
//     <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
//   </svg>
// );
// const Loader2 = (props) => (
//   <svg
//     {...props}
//     xmlns="http://www.w3.org/2000/svg"
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     // Adicionamos um style de animação simples para o mock
//     style={{ animation: "spin 1s linear infinite" }}
//   >
//     <path d="M21 12a9 9 0 1 1-6.219-8.56" />
//   </svg>
// );
// --- FIM DOS MOCKS ---

// Exporta como 'App' (default) para o preview funcionar
// Em seu projeto, renomeie de volta para 'AuthForm' e use 'export function AuthForm()'
// export default function App() {
export function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth(); // Usando o hook mockado

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
    } catch (err) {
      setError("Credenciais inválidas. Verifique seu e-mail e senha.");
      setIsLoading(false);
    }
  };

  // Estilo do botão derivado do seu globals.css (.appointment button)
  const buttonStyle = {
    backgroundColor: "var(--accent-color)",
    color: "var(--contrast-color)",
    border: 0,
    borderRadius: "50px",
    padding: "10px 35px",
    transition: "0.4s",
  };

  return (
    // Fundo centralizado (Bootstrap 5)
    <div
      className="container-fluid d-flex min-vh-100 align-items-center justify-content-center"
      style={{ backgroundColor: "#f8f9fa" }} // bg-light
    >
      <div className="row justify-content-center w-100">
        {/* Colunas responsivas do Bootstrap */}
        <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4">
          {/* Card de Login Animado (Bootstrap 5) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card shadow-lg border-0"
            style={{ borderRadius: "1.5rem" }} // rounded-4 ou 5
          >
            <div className="card-body p-4 p-sm-5">
              {/* Logo (Centralizado com Bootstrap) */}
              <div className="text-center">
                <img
                  src="/assets/img/logo_pas.jpeg"
                  alt="Logo PsicoAcolheSer"
                  // width={50} // Um tamanho bom para a tela de login
                  // height={70}
                  className="mb-4 w-75 rounded-3" // w-75, rounded-3
                />
              </div>

              {/* Título (Usa a variável --heading-color do seu CSS) */}
              <h2
                className="text-center h2 fw-bold mb-4"
                style={{ color: "var(--heading-color)" }}
              >
                Acesse sua conta
              </h2>

              {/* Formulário (Bootstrap 5) */}
              <form noValidate onSubmit={handleSubmit}>
                {/* Campo de Email (Input Group) */}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Mail size={18} className="text-muted" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemplo@email.com"
                      className="form-control form-control-lg"
                    />
                  </div>
                </div>

                {/* Campo de Senha (Input Group) */}
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Senha
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <Lock size={18} className="text-muted" />
                    </span>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="form-control form-control-lg"
                    />
                  </div>
                </div>

                {/* Esqueceu a senha? (Usa --accent-color) */}
                <div className="text-end mb-3">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{ color: "var(--accent-color)" }}
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                {/* Mensagem de Erro (Bootstrap Alert) */}
                {error && (
                  <div className="alert alert-danger text-center p-2">
                    {error}
                  </div>
                )}

                {/* Botão de Entrar (Usa estilo de .appointment button) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-lg w-100 d-flex align-items-center justify-content-center"
                  style={buttonStyle}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="me-2" /> Aguarde...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </button>
              </form>

              {/* Link de Cadastro (Usa --accent-color) */}
              <p className="mt-4 text-center text-muted">
                Não tem uma conta?{" "}
                <a
                  href="/signup"
                  className="fw-semibold text-decoration-none"
                  style={{ color: "var(--accent-color)" }}
                >
                  Cadastre-se
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
