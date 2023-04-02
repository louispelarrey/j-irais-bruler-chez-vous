import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterComponent } from "../../components/Register/RegisterComponent";

export interface RegisterData {
  email: string;
  password: string;
  username: string;
}

export const Register = () => {
  const { register, handleSubmit } = useForm<RegisterData>();
  const navigate = useNavigate();

  const onSubmit = async ({ email, password, username }: RegisterData) => {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username
      }),
    });
    //check status code
    if(response.status === 201) {
      navigate("/login");
    }
  }

  return <RegisterComponent handleSubmit={handleSubmit(onSubmit)} register={register} />;
}
