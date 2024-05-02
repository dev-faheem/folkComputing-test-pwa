import { ChangeEvent, FC, ReactElement, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { Button, Card, CheckBox, Container } from "../../components";
import { cn, isEmailValid } from "../../utils";
import { AUTH_INITIAL_STATE } from "../../constants";
import TextInput from "../../components/inputs/text-input";

type RegisterDt = {
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterErrorWithTerms = {
  agreedToTerms: boolean;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register: FC = (): ReactElement => {
  const navigate = useNavigate();
  const [data, setData] = useState<RegisterDt>({
    ...AUTH_INITIAL_STATE,
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<RegisterErrorWithTerms>({
    ...AUTH_INITIAL_STATE,
    agreedToTerms: false,
    confirmPassword: "",
  });
  const [doesAgreedToTerms, setDoesAgreedToTerms] = useState<boolean>(false);

  const handleForm =
    (type: keyof RegisterDt) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const id = event.target.id;

      console.log("eventer", type);

      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));

      setErrors({ ...errors, ...AUTH_INITIAL_STATE, confirmPassword: "" });
    };

  const signIn = () => {
    const errorObj = {} as RegisterErrorWithTerms;

    if (!doesAgreedToTerms) {
      errorObj.agreedToTerms = true;
    }
    if (!data.email.trim()) {
      errorObj.email = "Email is required";
    }
    if (data.email.trim() && !isEmailValid(data.email)) {
      errorObj.email = "Invalid email format.";
    }

    if (!data.password.trim()) {
      errorObj.password = "Password is required.";
    }

    if (!data.confirmPassword.trim()) {
      errorObj.confirmPassword = "Confirm password is required.";
    }

    if (data.password.trim() !== data.confirmPassword.trim()) {
      errorObj.confirmPassword = "Confirm password is not matched.";
    }

    if (Object.keys(errorObj).length > 0) {
      setErrors({ ...errors, ...errorObj });
      return;
    } else {
      navigate("/chat");
    }
  };

  return (
    <div className="login-page">
      <Container className="py-20 sm:max-w-md max-sm:p-0">
        <Card className="p-6 overflow-hidden shadow border">
          {/* <div className="p-6 max-sm:px-3"> */}
          <div className="flex justify-center">
            <div className="h-14 w-14 rounded-full bg-[#E11934]" />
          </div>

          <h1 className="text-center text-black text-xl font-semibold my-8">
            prototypev1
          </h1>
          <h1 className="text-center text-black text-xl font-semibold my-8">
            REGISTER
          </h1>

          <TextInput
            inputType="email"
            placeholder="Email"
            required={false}
            id="email"
            labelClass="mb-4"
            onInvalidMessage="Email"
            inputClass="inputfield mt-6 rounded-3xl "
            onChange={handleForm("email")}
            value={data.email}
            helperText={errors.email}
            error={!!errors.email}
          />

          <TextInput
            inputType="password"
            placeholder="Password"
            required={false}
            id="password"
            labelClass=""
            inputClass="inputfield mt-6 rounded-3xl "
            onInvalidMessage="Password"
            onChange={handleForm("password")}
            value={data.password}
            helperText={errors.password}
            error={!!errors.password}
          />
          <TextInput
            inputType="password"
            placeholder="Confirm Password"
            required={false}
            id="confirmPassword"
            labelClass=""
            inputClass="inputfield mt-6 rounded-3xl "
            onInvalidMessage="Password"
            onChange={handleForm("confirmPassword")}
            value={data.confirmPassword}
            helperText={errors.confirmPassword}
            error={!!errors.confirmPassword}
          />
          <div className="flex items-center gap-2 my-10 mx-2">
            <CheckBox
              id="conditions"
              selected={doesAgreedToTerms}
              error={errors.agreedToTerms}
              onSelection={(status) => {
                if (status) {
                  setErrors({ ...errors, agreedToTerms: false });
                }
                setDoesAgreedToTerms(status);
              }}
            />
            <label
              htmlFor="conditions"
              className="text-sm text-black font-medium text-start select-none cursor-pointer"
            >
              I accept the privacy policy and terms and conditions
            </label>
          </div>
          <span
            className={cn("min-h-4 block text-xs text-red-700 mt-1 mb-3", {
              invisible: !errors.agreedToTerms,
            })}
          >
            Please accept the Terms and Conditions to continue
          </span>
          <Button type="button" className="w-full mt-10" onClick={signIn}>
            Register
          </Button>
          {/* </div> */}

          <div className="p-7 pt-5 bg-primary-light">
            <p className="text-sm text-black text-center font-medium select-none">
              Login existing user
              <Link to="/login">
                <span className="text-primary"> Login</span>
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
