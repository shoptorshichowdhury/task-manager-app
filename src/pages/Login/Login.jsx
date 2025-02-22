import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { signInWithGoogle, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Google Signin
  const handleGoogleSignIn = async () => {
    if (user) {
      navigate("/taskboard");
      return;
    }
    try {
      const result = await signInWithGoogle();
      toast.success("Signin Successful");
      if (result?.user) {
        //   send user info to db
        const userInfo = {
          name: result?.user?.displayName,
          email: result?.user?.email,
          photo: result?.user?.photoURL,
        };
        await axios.post(
          `${import.meta.env.VITE_API_URL}/users/${result?.user?.email}`,
          userInfo
        );
        navigate("/taskboard");
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row min-h-svh w-full items-center justify-center gap-8 p-6 md:p-10 font-inter bg-gradient-to-tr from-primary/30 to-secondary">
      {/* text content */}
      <div className="w-auto lg:w-3/5 flex flex-col items-center space-y-2 md:space-y-3">
        <h3 className="text-xl md:text-3xl lg:text-5xl font-bold text-primary">
          Welcome to TaskFlow!
        </h3>
        <p>Step Into Your Task Management App.</p>
      </div>
      <div className="w-auto lg:w-2/5 max-w-sm">
        {/* login card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign in your account</CardTitle>
            <CardDescription>Keep all your credentials safe.</CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Button onClick={handleGoogleSignIn} className="w-full">
                Sign in with Google
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Login;
