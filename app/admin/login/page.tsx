import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "../auth";
import { LoginForm } from "./login-form";

export const metadata = {
  title: {
    absolute: "Admin Giriş | Fırat Eğitim Kurumları"
  },
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/admin/login"
  }
};

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  return (
    <main className="adminLoginPage">
      <LoginForm />
    </main>
  );
}
