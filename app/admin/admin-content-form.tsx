"use client";

import Image from "next/image";
import { useActionState, useEffect, useMemo, useState, type ChangeEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  FilePlus2,
  FileText,
  Home as HomeIcon,
  Image as ImageIcon,
  KeyRound,
  LogOut,
  Trash2,
  Upload,
} from "lucide-react";
import {
  changePasswordAction,
  logoutAction,
  saveContentAction,
  uploadImageAction,
  type AdminActionState,
  type ChangePasswordResult
} from "./actions";
import { resolveImageSrc } from "../cms/image-src";
import type { DetailPage, DetailSection, HomeContent, SiteContent, StatItem } from "../cms/types";

const initialState: AdminActionState = {};

function toLines(items?: string[]) {
  return items?.join("\n") ?? "";
}

function fromLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

type TextFieldProps = {
  hint?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: "email" | "text" | "url";
};

function TextField({ hint, label, onChange, placeholder, type = "text", value }: TextFieldProps) {
  return (
    <label className="adminField">
      <span>{label}</span>
      <input
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

type TextAreaFieldProps = {
  hint?: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
};

function TextAreaField({ hint, label, onChange, placeholder, rows = 4, value }: TextAreaFieldProps) {
  return (
    <label className="adminField">
      <span>{label}</span>
      <textarea
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        value={value}
      />
      {hint ? <small>{hint}</small> : null}
    </label>
  );
}

type ImageFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onUploadStateChange?: (isUploading: boolean) => void;
};

function ImageField({ label, onChange, onUploadStateChange, value }: ImageFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const hasImage = value.trim().length > 0;

  function updateUploadState(nextState: boolean) {
    setIsUploading(nextState);
    onUploadStateChange?.(nextState);
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    updateUploadState(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadImageAction(formData);
      input.value = "";

      if (result.path) {
        onChange(result.path);
      }

      if (result.error) {
        setUploadError(result.error);
      }
    } catch {
      setUploadError("Görsel yüklenirken bir hata oluştu.");
    } finally {
      updateUploadState(false);
    }
  }

  return (
    <div className="adminImageField">
      <div aria-label={`${label} önizleme`} className={hasImage ? "adminImagePreview hasImage" : "adminImagePreview"} role="img">
        {hasImage ? (
          <Image
            alt={`${label} önizleme`}
            fill
            unoptimized
            sizes="(max-width: 760px) 100vw, 32vw"
            src={resolveImageSrc(value)}
          />
        ) : (
          <span className="adminImageEmpty">
            <ImageIcon aria-hidden="true" size={24} />
            Henüz görsel eklenmedi
          </span>
        )}
      </div>

      <div className="adminImageActions">
        <label className="adminUploadButton">
          <Upload aria-hidden="true" size={18} />
          <span>{isUploading ? "Yükleniyor..." : hasImage ? "Görseli Değiştir" : "Görsel Yükle"}</span>
          <input accept="image/*" disabled={isUploading} onChange={handleFileChange} type="file" />
        </label>
        <button
          className="adminImageRemoveButton"
          disabled={!hasImage || isUploading}
          onClick={() => {
            onChange("");
            setUploadError("");
          }}
          type="button"
        >
          <Trash2 aria-hidden="true" size={17} />
          Görseli Kaldır
        </button>
      </div>

      {uploadError ? <p className="adminImageError">{uploadError}</p> : null}
    </div>
  );
}

type AdminContentFormProps = {
  initialContent: SiteContent;
};

type StatsEditorProps = {
  label: string;
  items?: StatItem[];
  onChange: (items: StatItem[]) => void;
};

function StatsEditor({ items = [], label, onChange }: StatsEditorProps) {
  function updateItem(index: number, field: keyof StatItem, value: string) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: value } : item)));
  }

  function addItem() {
    onChange([...items, { value: "", text: "" }]);
  }

  function removeItem(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="adminStatsEditor">
      <div className="adminStatsEditorHeader">
        <span>{label}</span>
        <button onClick={addItem} type="button">
          <FilePlus2 aria-hidden="true" size={16} />
          Yeni sayı ekle
        </button>
      </div>

      {items.length ? (
        <div className="adminStatsGrid">
          {items.map((item, index) => (
            <div className="adminMiniCard" key={`${item.value}-${item.text}-${index}`}>
              <div className="adminMiniCardHeader">
                <h3>Bilgi kutusu {index + 1}</h3>
                <button aria-label="Bilgi kutusunu sil" onClick={() => removeItem(index)} type="button">
                  <Trash2 aria-hidden="true" size={16} />
                </button>
              </div>
              <TextField
                label="Sayı veya kısa ifade"
                onChange={(value) => updateItem(index, "value", value)}
                value={item.value}
              />
              <TextField
                label="Bu sayının açıklaması"
                onChange={(value) => updateItem(index, "text", value)}
                value={item.text}
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="adminEmptyState">Henüz bilgi kutusu eklenmedi.</p>
      )}
    </div>
  );
}

type AdminSectionId = "home" | "details" | "images" | "password";
type HomePanelId = "hero" | "strengths" | "about" | "programs" | "success" | "campus" | "admission";
type PasswordForm = {
  confirmPassword: string;
  currentPassword: string;
  newPassword: string;
};

const adminSections: { id: AdminSectionId; title: string; description: string; icon: LucideIcon }[] = [
  {
    id: "home",
    title: "Ana Sayfa",
    description: "Hero ve kayıt alanı",
    icon: HomeIcon
  },
  {
    id: "details",
    title: "Detay Sayfaları",
    description: "Alt sayfa içerikleri",
    icon: FileText
  },
  {
    id: "images",
    title: "Görseller",
    description: "Site görsel yönetimi",
    icon: ImageIcon
  },
  {
    id: "password",
    title: "Şifre",
    description: "Panel güvenliği",
    icon: KeyRound
  }
];

const homePanels: { id: HomePanelId; title: string; description: string }[] = [
  {
    id: "hero",
    title: "Giriş alanı",
    description: "Ana başlık, açıklama ve buton"
  },
  {
    id: "strengths",
    title: "Öne çıkanlar",
    description: "Kurumun kısa güven mesajları"
  },
  {
    id: "about",
    title: "Hakkımızda",
    description: "Kurum tanıtımı ve maddeler"
  },
  {
    id: "programs",
    title: "Kademeler",
    description: "Anaokulu, ilkokul, ortaokul, lise"
  },
  {
    id: "success",
    title: "Başarı",
    description: "Başarı metni ve sayılar"
  },
  {
    id: "campus",
    title: "Kampüs",
    description: "Kampüs tanıtımı"
  },
  {
    id: "admission",
    title: "Kayıt",
    description: "Kayıt çağrısı ve süreç"
  }
];

export function AdminContentForm({ initialContent }: AdminContentFormProps) {
  const [content, setContent] = useState(initialContent);
  const [activeSection, setActiveSection] = useState<AdminSectionId>("home");
  const [activeHomePanel, setActiveHomePanel] = useState<HomePanelId>("hero");
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeUploadCount, setActiveUploadCount] = useState(0);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    confirmPassword: "",
    currentPassword: "",
    newPassword: ""
  });
  const [passwordState, setPasswordState] = useState<ChangePasswordResult>({});
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialContent));
  const [state, formAction, isPending] = useActionState(saveContentAction, initialState);
  const serializedContent = useMemo(() => JSON.stringify(content), [content]);
  const hasUnsavedChanges = serializedContent !== savedSnapshot;
  const isImageUploading = activeUploadCount > 0;
  const showsContentSave = activeSection !== "password";
  const activePage = content.detailPages[activePageIndex] ?? content.detailPages[0];
  const activeSectionMeta =
    adminSections.find((section) => section.id === activeSection) ?? adminSections[0];

  function handleImageUploadState(isUploading: boolean) {
    setActiveUploadCount((current) => Math.max(0, current + (isUploading ? 1 : -1)));
  }

  function updatePasswordForm(field: keyof PasswordForm, value: string) {
    setPasswordForm((current) => ({
      ...current,
      [field]: value
    }));
    setPasswordState({});
  }

  useEffect(() => {
    if (!adminSections.some((section) => section.id === activeSection)) {
      setActiveSection("home");
    }
  }, [activeSection]);

  useEffect(() => {
    if (state.ok) {
      setSavedSnapshot(serializedContent);
    }
  }, [serializedContent, state.ok, state.savedAt]);

  useEffect(() => {
    function warnBeforeUnload(event: BeforeUnloadEvent) {
      if (!hasUnsavedChanges) {
        return;
      }

      event.preventDefault();
      event.returnValue = "";
    }

    window.addEventListener("beforeunload", warnBeforeUnload);

    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [hasUnsavedChanges]);

  function updateHome<K extends keyof HomeContent>(field: K, value: HomeContent[K]) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        [field]: value
      }
    }));
  }

  function updateHero(field: keyof HomeContent["hero"], value: string | HomeContent["hero"]["images"]) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        hero: {
          ...current.home.hero,
          [field]: value
        }
      }
    }));
  }

  function updateHeroImage(
    index: number,
    field: keyof HomeContent["hero"]["images"][number],
    value: string
  ) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        hero: {
          ...current.home.hero,
          images: current.home.hero.images.map((image, imageIndex) =>
            imageIndex === index ? { ...image, [field]: value } : image
          )
        }
      }
    }));
  }

  function updateAbout(field: keyof HomeContent["about"], value: string | string[]) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        about: {
          ...current.home.about,
          [field]: value
        }
      }
    }));
  }

  function updateProgramIntro(field: keyof HomeContent["programIntro"], value: string) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        programIntro: {
          ...current.home.programIntro,
          [field]: value
        }
      }
    }));
  }

  function updateSuccess(field: keyof HomeContent["success"], value: string | StatItem[]) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        success: {
          ...current.home.success,
          [field]: value
        }
      }
    }));
  }

  function updateCampus(field: keyof HomeContent["campus"], value: string | HomeContent["campus"]["images"]) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        campus: {
          ...current.home.campus,
          [field]: value
        }
      }
    }));
  }

  function updateCampusImage(
    index: number,
    field: keyof HomeContent["campus"]["images"][number],
    value: string
  ) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        campus: {
          ...current.home.campus,
          images: current.home.campus.images.map((image, imageIndex) =>
            imageIndex === index ? { ...image, [field]: value } : image
          )
        }
      }
    }));
  }

  function updateAdmission(field: keyof HomeContent["admission"], value: string | string[]) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        admission: {
          ...current.home.admission,
          [field]: value
        }
      }
    }));
  }

  function updateStrength(index: number, field: keyof HomeContent["strengths"][number], value: string) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        strengths: current.home.strengths.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        )
      }
    }));
  }

  function updateProgram(index: number, field: keyof HomeContent["programs"][number], value: string) {
    setContent((current) => ({
      ...current,
      home: {
        ...current.home,
        programs: current.home.programs.map((item, itemIndex) =>
          itemIndex === index ? { ...item, [field]: value } : item
        )
      }
    }));
  }

  function updateDetailPage<K extends keyof DetailPage>(field: K, value: DetailPage[K]) {
    setContent((current) => ({
      ...current,
      detailPages: current.detailPages.map((page, pageIndex) =>
        pageIndex === activePageIndex ? { ...page, [field]: value } : page
      )
    }));
  }

  function updateDetailPageByIndex<K extends keyof DetailPage>(
    index: number,
    field: K,
    value: DetailPage[K]
  ) {
    setContent((current) => ({
      ...current,
      detailPages: current.detailPages.map((page, pageIndex) =>
        pageIndex === index ? { ...page, [field]: value } : page
      )
    }));
  }

  function updateDetailSection(
    sectionIndex: number,
    field: keyof DetailSection,
    value: string | string[]
  ) {
    setContent((current) => ({
      ...current,
      detailPages: current.detailPages.map((page, pageIndex) => {
        if (pageIndex !== activePageIndex) {
          return page;
        }

        return {
          ...page,
          sections: page.sections.map((section, itemIndex) =>
            itemIndex === sectionIndex ? { ...section, [field]: value } : section
          )
        };
      })
    }));
  }

  async function handlePasswordChange() {
    setIsChangingPassword(true);
    setPasswordState({});

    const formData = new FormData();
    formData.append("currentPassword", passwordForm.currentPassword);
    formData.append("newPassword", passwordForm.newPassword);
    formData.append("confirmPassword", passwordForm.confirmPassword);

    try {
      const result = await changePasswordAction(formData);
      setPasswordState(result);

      if (result.ok) {
        setPasswordForm({
          confirmPassword: "",
          currentPassword: "",
          newPassword: ""
        });
      }
    } catch {
      setPasswordState({ error: "Şifre güncellenemedi." });
    } finally {
      setIsChangingPassword(false);
    }
  }

  return (
    <form action={formAction} className="adminDashboardForm">
      <input name="content" type="hidden" value={serializedContent} />

      <aside className="adminSidebar" aria-label="Düzenleme alanları">
        <div className="adminSidebarBrand">
          <Image
            alt="Fırat Eğitim Kurumları"
            height={120}
            priority
            src="/images/firat-ek-logo.webp"
            width={94}
          />
          <strong>Yönetim Paneli</strong>
        </div>

        <div className="adminMenuBlock">
          <span>Menü</span>
          <nav className="adminSidebarNav">
            {adminSections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  className={section.id === activeSection ? "isActive" : ""}
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  type="button"
                >
                  <Icon aria-hidden="true" size={19} />
                  <span>{section.title}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="adminSidebarFooter">
          <button formAction={logoutAction} type="submit">
            <LogOut aria-hidden="true" size={17} />
            Çıkış yap
          </button>
        </div>
      </aside>

      <section className="adminWorkspace">
        <header className="adminTopbar">
          <div>
            <h1>{activeSectionMeta.title}</h1>
            <p>{activeSectionMeta.description}</p>
          </div>
          <div className="adminTopbarActions">
            {showsContentSave && isImageUploading ? (
              <p className="adminInfo">Görsel yükleniyor, lütfen bekleyin.</p>
            ) : null}
            {showsContentSave && !isImageUploading && hasUnsavedChanges ? (
              <p className="adminWarning">Değişikliklerin siteye geçmesi için Kaydet’e basın.</p>
            ) : null}
            {showsContentSave && state.ok && !hasUnsavedChanges && !isImageUploading ? (
              <p className="adminSuccess">Kaydedildi: {state.savedAt}</p>
            ) : null}
            {showsContentSave && state.error ? <p className="adminError">{state.error}</p> : null}
            {showsContentSave ? (
              <button className="adminPrimaryButton" disabled={isPending || isImageUploading} type="submit">
                {isImageUploading ? "Görsel yükleniyor..." : isPending ? "Kaydediliyor..." : "Kaydet"}
              </button>
            ) : null}
          </div>
        </header>

        <div className="adminEditorMain">
          {activeSection === "password" ? (
            <section
              className="adminPasswordPanel"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  void handlePasswordChange();
                }
              }}
            >
              <div className="adminPasswordLayout">
                <div className="adminPasswordFormCard">
                  <div className="adminCardTitle adminPasswordFormTitle">
                    <h2>Şifre Değiştir</h2>
                  </div>

                  <div className="adminPasswordFields">
                    <label className="adminField">
                      <span>Mevcut şifre</span>
                      <input
                        autoComplete="current-password"
                        onChange={(event) => updatePasswordForm("currentPassword", event.target.value)}
                        type="password"
                        value={passwordForm.currentPassword}
                      />
                    </label>

                    <label className="adminField">
                      <span>Yeni şifre</span>
                      <input
                        autoComplete="new-password"
                        onChange={(event) => updatePasswordForm("newPassword", event.target.value)}
                        type="password"
                        value={passwordForm.newPassword}
                      />
                    </label>

                    <label className="adminField">
                      <span>Yeni şifre tekrar</span>
                      <input
                        autoComplete="new-password"
                        onChange={(event) => updatePasswordForm("confirmPassword", event.target.value)}
                        type="password"
                        value={passwordForm.confirmPassword}
                      />
                    </label>
                  </div>

                  <p className="adminPasswordHint">Yeni şifre en az 8 karakter olmalı.</p>

                  {passwordState.error ? <p className="adminError">{passwordState.error}</p> : null}
                  {passwordState.ok ? <p className="adminSuccess">{passwordState.message}</p> : null}

                  <div className="adminPasswordActions">
                    <button
                      className="adminPrimaryButton"
                      disabled={isChangingPassword}
                      onClick={() => void handlePasswordChange()}
                      type="button"
                    >
                      {isChangingPassword ? "Güncelleniyor..." : "Şifreyi Güncelle"}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          ) : null}

          {activeSection === "home" ? (
            <section className="adminCard adminHomeEditor">
              <div className="adminCardTitle">
                <h2>Ana Sayfa</h2>
              </div>

              <nav className="adminSubNav" aria-label="Ana sayfa bölümleri">
                {homePanels.map((panel) => (
                  <button
                    className={panel.id === activeHomePanel ? "isActive" : ""}
                    key={panel.id}
                    onClick={() => setActiveHomePanel(panel.id)}
                    type="button"
                  >
                    <strong>{panel.title}</strong>
                    <small>{panel.description}</small>
                  </button>
                ))}
              </nav>

              {activeHomePanel === "hero" ? (
                <div className="adminEditorSection">
                  <div className="adminGrid two">
                    <TextField
                      hint="Ana sayfanın ilk büyük başlığı."
                      label="Ana başlık"
                      onChange={(value) => updateHero("title", value)}
                      value={content.home.hero.title}
                    />
                    <TextField
                      hint="Başlıkta renkli görünen vurgu."
                      label="Vurgulu ifade"
                      onChange={(value) => updateHero("accent", value)}
                      value={content.home.hero.accent}
                    />
                    <TextField
                      label="Buton yazısı"
                      onChange={(value) => updateHero("ctaText", value)}
                      value={content.home.hero.ctaText}
                    />
                  </div>
                  <TextAreaField
                    hint="Kısa, net ve veliyi aksiyona yaklaştıran metin iyi çalışır."
                    label="Giriş açıklaması"
                    onChange={(value) => updateHero("text", value)}
                    value={content.home.hero.text}
                  />
                </div>
              ) : null}

              {activeHomePanel === "strengths" ? (
                <div className="adminRepeatGrid four">
                  {content.home.strengths.map((item, index) => (
                    <div className="adminMiniCard" key={`${item.title}-${index}`}>
                      <h3>Öne çıkan kart {index + 1}</h3>
                      <TextField
                        label="Üst metin veya sayı"
                        onChange={(value) => updateStrength(index, "value", value)}
                        value={item.value}
                      />
                      <TextField
                        label="Kart başlığı"
                        onChange={(value) => updateStrength(index, "title", value)}
                        value={item.title}
                      />
                      <TextField
                        label="Kısa açıklama"
                        onChange={(value) => updateStrength(index, "text", value)}
                        value={item.text}
                      />
                    </div>
                  ))}
                </div>
              ) : null}

              {activeHomePanel === "about" ? (
                <div className="adminGrid two">
                  <div className="adminEditorSection">
                    <TextField
                      label="Hakkımızda başlığı"
                      onChange={(value) => updateAbout("title", value)}
                      value={content.home.about.title}
                    />
                    <TextAreaField
                      label="Hakkımızda metni"
                      onChange={(value) => updateAbout("text", value)}
                      rows={5}
                      value={content.home.about.text}
                    />
                    <TextAreaField
                      hint="Her satır sitede ayrı madde olarak görünür."
                      label="Hakkımızda maddeleri"
                      onChange={(value) => updateAbout("bullets", fromLines(value))}
                      rows={5}
                      value={toLines(content.home.about.bullets)}
                    />
                  </div>
                  <div className="adminEditorSection">
                    <ImageField
                      label="Hakkımızda görseli"
                      onChange={(value) => updateAbout("image", value)}
                      onUploadStateChange={handleImageUploadState}
                      value={content.home.about.image}
                    />
                  </div>
                </div>
              ) : null}

              {activeHomePanel === "programs" ? (
                <div className="adminEditorSection">
                  <div className="adminGrid two">
                    <TextField
                      label="Kademeler bölüm başlığı"
                      onChange={(value) => updateProgramIntro("title", value)}
                      value={content.home.programIntro.title}
                    />
                    <TextAreaField
                      label="Kademeler bölüm açıklaması"
                      onChange={(value) => updateProgramIntro("text", value)}
                      rows={3}
                      value={content.home.programIntro.text}
                    />
                  </div>
                  <div className="adminRepeatGrid four">
                    {content.home.programs.map((program, index) => (
                      <div className="adminMiniCard" key={`${program.title}-${index}`}>
                        <TextField
                          label="Kademe adı"
                          onChange={(value) => updateProgram(index, "title", value)}
                          value={program.title}
                        />
                        <TextAreaField
                          label="Kademe açıklaması"
                          onChange={(value) => updateProgram(index, "text", value)}
                          rows={3}
                          value={program.text}
                        />
                        <ImageField
                          label="Kademe görseli"
                          onChange={(value) => updateProgram(index, "image", value)}
                          onUploadStateChange={handleImageUploadState}
                          value={program.image}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeHomePanel === "success" ? (
                <div className="adminGrid two">
                  <div className="adminEditorSection">
                    <TextField
                      label="Başarı bölüm başlığı"
                      onChange={(value) => updateSuccess("title", value)}
                      value={content.home.success.title}
                    />
                    <TextAreaField
                      label="Başarı bölüm metni"
                      onChange={(value) => updateSuccess("text", value)}
                      rows={5}
                      value={content.home.success.text}
                    />
                    <StatsEditor
                      label="Başarı bölümündeki bilgi kutuları"
                      onChange={(items) => updateSuccess("stats", items)}
                      items={content.home.success.stats}
                    />
                  </div>
                  <div className="adminEditorSection">
                    <ImageField
                      label="Başarı görseli"
                      onChange={(value) => updateSuccess("image", value)}
                      onUploadStateChange={handleImageUploadState}
                      value={content.home.success.image}
                    />
                  </div>
                </div>
              ) : null}

              {activeHomePanel === "campus" ? (
                <div className="adminEditorSection">
                  <div className="adminGrid two">
                    <TextField
                      label="Kampüs bölüm başlığı"
                      onChange={(value) => updateCampus("title", value)}
                      value={content.home.campus.title}
                    />
                    <TextAreaField
                      label="Kampüs bölüm metni"
                      onChange={(value) => updateCampus("text", value)}
                      rows={4}
                      value={content.home.campus.text}
                    />
                  </div>
                  <div className="adminImageGrid">
                    {content.home.campus.images.map((image, index) => (
                      <div className="adminMiniCard" key={`${image.src}-${index}`}>
                        <ImageField
                          label={`Kampüs görseli ${index + 1}`}
                          onChange={(value) => updateCampusImage(index, "src", value)}
                          onUploadStateChange={handleImageUploadState}
                          value={image.src}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {activeHomePanel === "admission" ? (
                <div className="adminEditorSection">
                  <div className="adminGrid two">
                    <TextField
                      label="Kayıt bölüm başlığı"
                      onChange={(value) => updateAdmission("title", value)}
                      value={content.home.admission.title}
                    />
                    <TextAreaField
                      label="Kayıt bölüm metni"
                      onChange={(value) => updateAdmission("text", value)}
                      rows={4}
                      value={content.home.admission.text}
                    />
                  </div>
                  <TextAreaField
                    hint="Her satır kayıt sürecinde ayrı adım olarak görünür."
                    label="Kayıt süreci adımları"
                    onChange={(value) => updateAdmission("processItems", fromLines(value))}
                    rows={5}
                    value={toLines(content.home.admission.processItems)}
                  />
                </div>
              ) : null}
            </section>
          ) : null}

          {activeSection === "images" ? (
            <section className="adminCard">
              <div className="adminCardTitle">
                <h2>Görseller</h2>
              </div>

              <div className="adminImageGroup">
                <div className="adminImageGroupTitle">
                  <h3>Hero Görselleri</h3>
                </div>
                <div className="adminImageGrid">
                  {content.home.hero.images.map((image, index) => (
                    <div className="adminMiniCard" key={`${image.src}-${index}`}>
                      <ImageField
                        label={`Hero görseli ${index + 1}`}
                        onChange={(value) => updateHeroImage(index, "src", value)}
                        onUploadStateChange={handleImageUploadState}
                        value={image.src}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="adminImageGroup">
                <div className="adminImageGroupTitle">
                  <h3>Ana Sayfa Bölüm Görselleri</h3>
                </div>
                <div className="adminImageGrid">
                  <div className="adminMiniCard">
                    <ImageField
                      label="Hakkımızda görseli"
                      onChange={(value) => updateAbout("image", value)}
                      onUploadStateChange={handleImageUploadState}
                      value={content.home.about.image}
                    />
                  </div>
                  <div className="adminMiniCard">
                    <ImageField
                      label="Başarı görseli"
                      onChange={(value) => updateSuccess("image", value)}
                      onUploadStateChange={handleImageUploadState}
                      value={content.home.success.image}
                    />
                  </div>
                </div>
              </div>

              <div className="adminImageGroup">
                <div className="adminImageGroupTitle">
                  <h3>Akademik Program Görselleri</h3>
                </div>
                <div className="adminImageGrid">
                  {content.home.programs.map((program, index) => (
                    <div className="adminMiniCard" key={`${program.title}-${index}`}>
                      <h3>{program.title}</h3>
                      <ImageField
                        label="Program görseli"
                        onChange={(value) => updateProgram(index, "image", value)}
                        onUploadStateChange={handleImageUploadState}
                        value={program.image}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="adminImageGroup">
                <div className="adminImageGroupTitle">
                  <h3>Kampüs Görselleri</h3>
                </div>
                <div className="adminImageGrid">
                  {content.home.campus.images.map((image, index) => (
                    <div className="adminMiniCard" key={`${image.src}-${index}`}>
                      <ImageField
                        label={`Kampüs görseli ${index + 1}`}
                        onChange={(value) => updateCampusImage(index, "src", value)}
                        onUploadStateChange={handleImageUploadState}
                        value={image.src}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="adminImageGroup">
                <div className="adminImageGroupTitle">
                  <h3>Detay Sayfası Görselleri</h3>
                </div>
                <div className="adminImageGrid">
                  {content.detailPages.map((page, index) => (
                    <div className="adminMiniCard" key={page.slug}>
                      <h3>{page.navText}</h3>
                      <ImageField
                        label="Sayfa görseli"
                        onChange={(value) => updateDetailPageByIndex(index, "image", value)}
                        onUploadStateChange={handleImageUploadState}
                        value={page.image}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {activeSection === "details" && activePage ? (
            <section className="adminDetailEditor">
              <div className="adminDetailBlock">
                <div className="adminDetailBlockHeader">
                  <span>1</span>
                  <h3>Düzenlenecek sayfa</h3>
                </div>
                <div className="adminTabs adminDetailTabs">
                  {content.detailPages.map((page, index) => (
                    <button
                      className={index === activePageIndex ? "isActive" : ""}
                      key={page.slug}
                      onClick={() => setActivePageIndex(index)}
                      type="button"
                    >
                      {page.navText}
                    </button>
                  ))}
                </div>
              </div>

              <div className="adminDetailIntro">
                <div className="adminDetailBlock">
                  <div className="adminDetailBlockHeader">
                    <span>2</span>
                    <h3>Temel bilgiler</h3>
                  </div>
                  <div className="adminDetailFields">
                    <TextField
                      label="Menüde görünen isim"
                      onChange={(value) => updateDetailPage("navText", value)}
                      value={activePage.navText}
                    />
                    <TextField
                      label="Sayfa linki"
                      onChange={(value) => updateDetailPage("slug", value)}
                      value={activePage.slug}
                    />
                    <TextField
                      label="Sayfanın büyük başlığı"
                      onChange={(value) => updateDetailPage("title", value)}
                      value={activePage.title}
                    />
                  </div>
                </div>

                <div className="adminDetailBlock">
                  <div className="adminDetailBlockHeader">
                    <span>3</span>
                    <h3>Kapak görseli</h3>
                  </div>
                  <ImageField
                    label="Kapak görseli"
                    onChange={(value) => updateDetailPage("image", value)}
                    onUploadStateChange={handleImageUploadState}
                    value={activePage.image}
                  />
                </div>
              </div>

              <div className="adminDetailTextGrid">
                <div className="adminDetailBlock">
                  <div className="adminDetailBlockHeader">
                    <span>4</span>
                    <h3>Google açıklaması</h3>
                  </div>
                  <TextAreaField
                    label="Açıklama metni"
                    onChange={(value) => updateDetailPage("description", value)}
                    rows={4}
                    value={activePage.description}
                  />
                </div>
                <div className="adminDetailBlock">
                  <div className="adminDetailBlockHeader">
                    <span>5</span>
                    <h3>Sayfa giriş metni</h3>
                  </div>
                  <TextAreaField
                    label="Giriş metni"
                    onChange={(value) => updateDetailPage("summary", value)}
                    rows={4}
                    value={activePage.summary}
                  />
                </div>
              </div>

              <div className="adminDetailBlock adminDetailSectionsBlock">
                <div className="adminDetailBlockHeader">
                  <span>6</span>
                  <h3>İçerik bölümleri</h3>
                </div>
                <div className="adminSectionList">
                  {activePage.sections.map((section, index) => (
                    <div className="adminMiniCard adminDetailSectionCard" key={`${section.title}-${index}`}>
                      <div className="adminMiniCardHeader">
                        <h3>Bölüm {index + 1}</h3>
                      </div>
                      <TextField
                        label="Başlık"
                        onChange={(value) => updateDetailSection(index, "title", value)}
                        value={section.title}
                      />
                      <TextAreaField
                        label="Metin"
                        onChange={(value) => updateDetailSection(index, "text", value)}
                        rows={4}
                        value={section.text}
                      />
                      <TextAreaField
                        label="Maddeler"
                        onChange={(value) => updateDetailSection(index, "items", fromLines(value))}
                        rows={4}
                        value={toLines(section.items)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </form>
  );
}
