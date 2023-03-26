import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginComponent } from "../../components/Login/LoginComponent";

export interface LoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const { register, handleSubmit } = useForm<LoginData>();
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
      localStorage.setItem("token", data.access_token);
    }

    navigate("/");
  }

  return (
    <LoginComponent handleSubmit={handleSubmit(onSubmit)} register={register} />
  );
};
