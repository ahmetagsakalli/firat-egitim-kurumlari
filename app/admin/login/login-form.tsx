"use client";

import { useActionState } from "react";
import { loginAction, type AdminActionState } from "../actions";

const initialState: AdminActionState = {};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="adminLoginCard">
      <div>
        <p className="adminKicker">Fırat CMS</p>
        <h1>Yönetim Paneli</h1>
        <p>Site içeriklerini düzenlemek için giriş yapın.</p>
      </div>

      <label className="adminField">
        <span>Şifre</span>
        <input autoComplete="current-password" name="password" required type="password" />
      </label>

      {state.error ? <p className="adminError">{state.error}</p> : null}

      <button className="adminPrimaryButton" disabled={isPending} type="submit">
        {isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
      </button>
    </form>
  );
}
