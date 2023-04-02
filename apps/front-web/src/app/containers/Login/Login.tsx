import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginComponent } from "../../components/Login/LoginComponent";
import { UserContext } from "../../contexts/UserContext";

export interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>();
  const { token, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: LoginData) => {
    const response = await fetch("/api/authentication/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        password
      }),
    });
    const data = await response.json();
    if(data.access_token) {
      setToken(data.access_token);
    }

    navigate("/");
  }

  if(token) return <Navigate to="/" replace />;

  return <LoginComponent handleSubmit={handleSubmit(onSubmit)} register={register} />;
};
