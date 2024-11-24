"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

const Mode = {
  LOGIN: "login",
  REGISTER: "register",
};
Object.freeze(Mode);

const FORM_VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MIN_USERNAME_LENGTH: 3,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};

export default function Account() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = useState(Mode.LOGIN);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user.role === 'admin') {
        router.push('/dashboard');
      }
    }
  }, [router]);

  const handleSubmit = useCallback(async (e, isAuto = false) => {
    if (!isAuto && e) {
      e.preventDefault();
    }

    setIsLoading(true);
    setError("");

    try {
      if (mode === Mode.LOGIN) {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        }

        // บันทึกข้อมูลผู้ใช้
        localStorage.setItem('user', JSON.stringify(data.user));

        // redirect ตาม role
        if (data.user.role === 'admin') {
          router.push('/dashboard');
        } else {
          router.push('/');
        }
      } else {
        const response = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username.trim(),
            email: formData.email.trim().toLowerCase(),
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "เกิดข้อผิดพลาดในการลงทะเบียน");
        }

        alert("ลงทะเบียนสำเร็จ กรุณาเข้าสู่ระบบ");
        setMode(Mode.LOGIN);
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  }, [formData, mode, router]);

  useEffect(() => {
    // ตรวจสอบ URL parameters สำหรับ auto login
    const autoLogin = searchParams.get('autoLogin');
    const username = searchParams.get('username');
    const password = searchParams.get('password');

    if (autoLogin === 'true' && username && password) {
      setFormData({
        username: username,
        password: password
      });
      // ทำการ login อัตโนมัติ
      handleSubmit(null, true);
    }
  }, [searchParams, handleSubmit]);

  const validateForm = () => {
    setError("");

    if (mode === Mode.REGISTER) {
      if (formData.username.length < FORM_VALIDATION.MIN_USERNAME_LENGTH) {
        setError(
          `ชื่อผู้ใช้ต้องมีความยาวอย่างน้อย ${FORM_VALIDATION.MIN_USERNAME_LENGTH} ตัวอักษร`
        );
        return false;
      }

      if (!FORM_VALIDATION.EMAIL_REGEX.test(formData.email)) {
        setError("รูปแบบอีเมลไม่ถูกต้อง");
        return false;
      }
    }

    if (formData.password.length < FORM_VALIDATION.MIN_PASSWORD_LENGTH) {
      setError(
        `รหัสผ่านต้องมีความยาวอย่างน้อย ${FORM_VALIDATION.MIN_PASSWORD_LENGTH} ตัวอักษร`
      );
      return false;
    }

    if (mode === Mode.REGISTER && formData.password !== formData.confirmPassword) {
      setError("รหัสผ่านไม่ตรงกัน");
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
    setError(""); // Clear error when user types
  };

  const toggleMode = () => {
    setMode(mode === Mode.LOGIN ? Mode.REGISTER : Mode.LOGIN);
    setError("");
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const renderFormField = (label, name, type, placeholder) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        autoComplete={
          type === "password"
            ? name === "password"
              ? "current-password"
              : "new-password"
            : type === "email"
            ? "email"
            : "username"
        }
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
      />
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-6 p-8 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            {mode === Mode.LOGIN ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {mode === Mode.LOGIN
            ? renderFormField(
                "ชื่อผู้ใช้งาน",
                "username",
                "text",
                "กรุณากรอกชื่อผู้ใช้"
              )
            : renderFormField(
                "ชื่อผู้ใช้งาน",
                "username",
                "text",
                "กรุณากรอกชื่อผู้ใช้"
              )}

          {mode === Mode.REGISTER &&
            renderFormField("อีเมล", "email", "email", "กรุณากรอกอีเมล")}

          {renderFormField(
            "รหัสผ่าน",
            "password",
            "password",
            "กรุณากรอกรหัสผ่าน"
          )}

          {mode === Mode.REGISTER &&
            renderFormField(
              "ยืนยันรหัสผ่าน",
              "confirmPassword",
              "password",
              "กรุณายืนยันรหัสผ่าน"
            )}

          {mode === Mode.LOGIN && (
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <Link
                  href="/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  ลืมรหัสผ่าน?
                </Link>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${
                  isLoading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            >
              {isLoading ? (
                <span>กำลังดำเนินการ...</span>
              ) : mode === Mode.LOGIN ? (
                "เข้าสู่ระบบ"
              ) : (
                "สมัครสมาชิก"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          <button
            onClick={toggleMode}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {mode === Mode.LOGIN
              ? "ยังไม่มีบัญชี? สมัครสมาชิกใหม่"
              : "มีบัญชีอยู่แล้ว? เข้าสู่ระบบ"}
          </button>
        </div>
      </div>
    </div>
  );
}
