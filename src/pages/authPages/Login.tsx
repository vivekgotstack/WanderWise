import { useState, useEffect } from "react";
import { AnimatedListDemo } from "@/components/ui/AnimatedListDemo";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";

export function Login() {
  const firebase = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.authenticated) {
      navigate("/flights", { replace: true });
    }
  }, [firebase.authenticated]);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await firebase.loginUser(email, password);
    if (ok) navigate("/flights", { replace: true });
  };

  const handleGoogle = async () => {
    const ok = await firebase.googleSignup();
    if (ok) navigate("/flights", { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-background p-4">
      <div className="w-full max-w-5xl flex items-center gap-10">

        <div className="w-full md:w-1/2 justify-center items-center hidden md:block">
          <AnimatedListDemo />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
              </CardDescription>
              <CardAction>
                <Button variant="link" onClick={() => navigate("/signup")}>Sign Up</Button>
              </CardAction>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleEmailLogin}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={firebase.loading}>
                    {firebase.loading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
              <Button variant="outline" className="w-full" onClick={handleGoogle}>
                Login with Google
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
