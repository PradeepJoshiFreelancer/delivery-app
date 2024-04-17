import SigninForm from "@/components/forms/signin-form";
import { Card, CardTitle } from "@/components/ui/card";

const Signin = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <Card className="w-full md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <CardTitle>Sign in to your account</CardTitle>
          <SigninForm />
        </div>
      </Card>
    </div>
  );
};

export default Signin;
