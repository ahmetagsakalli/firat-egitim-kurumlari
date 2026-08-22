import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Aradığınız sayfa bulunamadı.</h1>
      <p>
        Sayfa taşınmış olabilir. Ana sayfadan okul seviyeleri, kampüs yaşamı ve
        kayıt bilgilerine ulaşabilirsiniz.
      </p>
      <Link className="primaryButton" href="/">
        <ArrowLeft aria-hidden="true" size={18} />
        Ana sayfaya dön
      </Link>
    </main>
  );
}
