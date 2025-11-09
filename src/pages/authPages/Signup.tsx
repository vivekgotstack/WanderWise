import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export function Signup() {
  const navigate = useNavigate();
  const firebase = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (firebase.authenticated) {
      navigate("/flights", { replace: true });
    }
  }, [firebase.authenticated]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const ok = await firebase.signupUser(name, email, password);
    if (ok) navigate("/flights", { replace: true });
  };

  const handleGoogle = async () => {
    const ok = await firebase.googleSignup();
    if (ok) navigate("/flights", { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-background p-4 flex justify-center items-center translate-y-10">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        <div className="w-full flex justify-center">
          <Card className="w-full max-w-sm">
            <CardHeader className="text-center">
              <CardTitle>Create your account</CardTitle>
              <CardDescription>Fill the details to get started</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSignup}>
                <div className="flex flex-col gap-6">

                  <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

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
                      placeholder="Create a password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Re-enter password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-3">
              <Button variant="outline" className="w-full" onClick={handleGoogle}>
                Sign up with Google
              </Button>
              <Button variant="link" className="text-sm" onClick={() => navigate("/login")}>
                Already have an account? Login
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="w-full justify-center hidden lg:block">
          <div className="w-full max-w-xl rounded-xl overflow-hidden shadow">
            <div className="relative w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0"
                title="Demo video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
