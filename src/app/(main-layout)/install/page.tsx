"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/useTranslations";
import { LocalizedString, messages } from "@/i18n/messages";
import { Download } from "lucide-react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
};

export default function InstallPage() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);
  const [error, setError] = useState<LocalizedString | null>(null);

  const t = useTranslations();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError(messages.install.noPrompt);
    }, 3500);

    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    const handler = (e: Event) => {
      clearTimeout(timeoutId);
      const event = e as BeforeInstallPromptEvent;

      event.preventDefault();
      setDeferredPrompt(event);
      setShowInstallButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt && "prompt" in deferredPrompt) {
      deferredPrompt.prompt();

      await deferredPrompt.userChoice;

      setDeferredPrompt(null);
      setShowInstallButton(false);
    }
  };

  if (isStandalone)
    return (
      <div>
        <h1>You have already installed the application.</h1>
      </div>
    );

  return (
    <div className="flex grow items-center justify-center flex-col">
      <h1 className="text-center mb-4">{t(messages.install.heading)}</h1>
      {showInstallButton && (
        <button
          onClick={handleInstallClick}
          className="bg-red max-w-[350px] active:scale-[98%] transition-transform text-white rounded-full w-fit flex justify-center p-4 items-center gap-2 not-italic font-normal"
        >
          <Download width={20} height={20} />
          {t(messages.install.homescreen)}
        </button>
      )}
      {isIOS && <p>{t(messages.install.iosPrompt)}</p>}
      {error && <p className="text-red-500">{t(error)}</p>}
    </div>
  );
}
