"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { Check, X } from "lucide-react";

interface IToast {
  id: string;
  message: string;
  variant: "default" | "success" | "destructive";
}

interface IToastContext {
  showToast: (
    message: string,
    variant?: "default" | "success" | "destructive",
  ) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<IToast[]>([]);

  const showToast = useCallback(
    (
      message: string,
      variant: "default" | "success" | "destructive" = "default",
    ) => {
      const id = crypto.randomUUID();
      setToasts((current) => [...current, { id, message, variant }]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 2200);
    },
    [],
  );

  const contextValue = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div className="fixed right-4 top-4 z-50 flex w-[300px] flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-md border px-4 py-3 text-sm shadow-md animate-in fade-in slide-in-from-top-1 ${
              toast.variant === "success"
                ? "border-emerald-700 bg-emerald-600 text-white"
                : toast.variant === "destructive"
                  ? "border-red-700 bg-red-600 text-white"
                : "bg-card"
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.variant === "success" ? (
                <Check className="h-4 w-4 shrink-0" />
              ) : null}
              {toast.variant === "destructive" ? (
                <X className="h-4 w-4 shrink-0" />
              ) : null}
              <span>{toast.message}</span>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = (): IToastContext => {
  const toastContext = useContext(ToastContext);
  if (!toastContext) {
    throw new Error("useToast must be used inside ToastProvider");
  }

  return toastContext;
};
