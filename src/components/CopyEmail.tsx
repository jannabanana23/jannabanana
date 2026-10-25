"use client";

import { useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="copy-email">
      <a href={`mailto:${email}`} className="copy-email__address">
        {email}
      </a>
      <button type="button" className="copy-email__btn" onClick={copy} aria-live="polite">
        {copied ? "Copied" : "Copy email"}
      </button>
    </div>
  );
}
