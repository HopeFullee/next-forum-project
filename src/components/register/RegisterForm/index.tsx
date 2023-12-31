"use client";
import { useEffect, useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import Link from "next/link";
import { useRegister } from "@/hooks/useRegister";

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const nameRe = /^([a-z|A-Z|0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,12}$/;
const passwordRe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

export interface RegisterData {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const { isFetching, register, duplicateError } = useRegister();

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [regexWarning, setRegexWarning] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    duplicateEmail: "",
    duplicateName: "",
  });

  useEffect(() => {
    setRegexWarning((prevState) => ({ ...prevState, ...duplicateError }));
  }, [duplicateError]);

  const regexErrorSet = (formKey: string, errorMsg: string) => {
    setRegexWarning((prev) => ({
      ...prev,
      [formKey]: errorMsg,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    // if input field is null -> trigger regexState to show warning
    if (value.trim() === "") {
      return regexErrorSet(name, "*필수 항목입니다.");
    }

    if (name === "email") {
      if (regexWarning.duplicateEmail) regexErrorSet("duplicateEmail", "");
      if (!emailRe.exec(value)) regexErrorSet(name, "*이메일 형식이 아닙니다.");
      else regexErrorSet(name, "");
    }

    if (name === "name") {
      if (regexWarning.duplicateName) regexErrorSet("duplicateName", "");
      if (!nameRe.exec(value)) regexErrorSet(name, "*2~12, 영문, 한글, 숫자");
      else regexErrorSet(name, "");
    }

    if (name === "password") {
      if (!passwordRe.exec(value))
        regexErrorSet(name, "*8~15, 영문, 숫자, 특수기호 포함.");
      else regexErrorSet(name, "");
    }

    if (name === "confirmPassword") {
      if (value !== registerData.password)
        regexErrorSet(name, "*비밀번호가 일치하지 않습니다.");
      else setRegexWarning((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const formValidator = () => {
    const emptyFormKeyList: string[] = [];
    const warningFormKeyList: string[] = [];

    Object.entries(registerData).forEach(([key, value]) => {
      if (value.trim() === "") emptyFormKeyList.push(key);
    });

    Object.entries(regexWarning).forEach(([key, value]) => {
      if (value) warningFormKeyList.push(key);
    });

    return { emptyFormKeyList, warningFormKeyList };
  };

  const handleSubmitClick = () => {
    const { emptyFormKeyList, warningFormKeyList } = formValidator();

    emptyFormKeyList.forEach((formKey) =>
      regexErrorSet(formKey, "*필수 항목입니다.")
    );

    if (emptyFormKeyList.length !== 0) return;
    if (warningFormKeyList.length !== 0) return;

    register(registerData);
  };

  return (
    <div className="mx-auto max-w-1400 flex-center">
      <form
        onSubmit={(e) => e.preventDefault}
        className="gap-30 mt-100 flex-col-center"
      >
        <p className="font-semibold text-18">Credentials Register</p>
        <div>
          <label
            htmlFor="register-email"
            className="font-semibold text-15 text-cyan-400"
          >
            Email
          </label>
          <CustomInput
            id="register-email"
            type="email"
            name="email"
            placeholder="이메일"
            onChange={(e) => handleChange(e)}
            value={registerData.email}
            regexWarning={regexWarning.email || regexWarning.duplicateEmail}
          />
        </div>
        <div>
          <label
            htmlFor="register-name"
            className="font-semibold text-15 text-cyan-400"
          >
            Nick name
          </label>
          <CustomInput
            id="register-name"
            type="text"
            name="name"
            placeholder="닉네임"
            onChange={(e) => handleChange(e)}
            value={registerData.name}
            regexWarning={regexWarning.name || regexWarning.duplicateName}
          />
        </div>
        <div>
          <label
            htmlFor="register-pw"
            className="font-semibold text-15 text-cyan-400"
          >
            Password
          </label>
          <CustomInput
            id="register-pw"
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={(e) => handleChange(e)}
            value={registerData.password}
            regexWarning={regexWarning.password}
          />
        </div>
        <div>
          <label
            htmlFor="register-cpw"
            className="font-semibold text-15 text-cyan-400"
          >
            Confirm Password
          </label>
          <CustomInput
            id="register-cpw"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={(e) => handleChange(e)}
            value={registerData.confirmPassword}
            regexWarning={regexWarning.confirmPassword}
          />
        </div>
        <div className="flex justify-between w-full mt-10 font-semibold under:w-full gap-15 text-14 under:p-6 under:bg-cyan-500/25 under:rounded-sm">
          <Link href="/" className="text-center hover:text-cyan-400">
            Cancel
          </Link>
          <button
            disabled={isFetching}
            className="hover:text-cyan-400"
            type="button"
            onClick={handleSubmitClick}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
