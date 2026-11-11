'use client';

import { useState } from 'react';
import { CheckIcon, CopyIcon } from 'lucide-react';
import Button from './Button';

function copyWithLegacyApi() {
  const input = document.createElement('textarea');
  input.value = window.location.href;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  input.setSelectionRange(0, input.value.length);

  let success = false;
  try {
    success = document.execCommand('copy');
  } finally {
    document.body.removeChild(input);
  }
  return success;
}

async function copyLink(
  setCopied: (copied: boolean) => void,
  setCopyFailed: (failed: boolean) => void,
) {
  setCopyFailed(false);

  try {
    // Copy link using modern clipboard API
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(window.location.href);
    } else if (!copyWithLegacyApi()) {
      throw new Error('Clipboard access is unavailable');
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  } catch {
    // fallback to legacy copy API if clipboard not available
    if (copyWithLegacyApi()) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } else {
      setCopyFailed(true);
    }
  }
}

export default function ShareServiceButton() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  return (
    <Button onClick={() => copyLink(setCopied, setCopyFailed)} className="w-full md:w-56">
      {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
      {copied ? 'Link Copied' : copyFailed ? 'Copy failed' : 'Share Service'}
    </Button>
  );
}
