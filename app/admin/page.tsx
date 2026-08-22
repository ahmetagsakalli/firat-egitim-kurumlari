import { requireAdmin } from "./auth";
import { AdminContentForm } from "./admin-content-form";
import { getSiteContent } from "../cms/content";

export const metadata = {
  title: {
    absolute: "Admin Panel | Fırat Eğitim Kurumları"
  },
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: "/admin"
  }
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdmin();

  const content = await getSiteContent();

  return (
    <main className="adminPage">
      <div className="adminShell">
        <AdminContentForm initialContent={content} />
      </div>
    </main>
  );
}
