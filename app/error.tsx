"use client";

type ErrorPageProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className="routeError">
      <div>
        <p>Bir sorun oluştu.</p>
        <h1>Sayfa yüklenemedi</h1>
        <span>{error.message}</span>
        <button onClick={reset} type="button">
          Tekrar Dene
        </button>
      </div>
    </main>
  );
}
