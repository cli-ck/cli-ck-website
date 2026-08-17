import { Mail01Icon, ShieldUserIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import type { Metadata } from "next"
import Link from "next/link"

import { PageHero, PageShellWrapper, Prose } from "@/components/landing-layout/page-shell-wrapper"
import { Button } from "@/components/ui/button"
import { SITE, VERSION } from "@/lib/site"

export const metadata: Metadata = {
  title: "Security",
  description: `How to report security issues in ${SITE.name}, what's in scope, and what we do to keep things safe.`,
  alternates: { canonical: `${SITE.url}/security` },
}

export default function SecurityPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="Security"
        title="Security"
        lead="cli-ck runs shells, reads and writes files, and talks to AI providers. If you find a security issue, please tell us before posting it publicly."
        meta={
          <>
            <span>Latest · v{VERSION}</span>
            <span className="size-1 rounded-full bg-muted-foreground/40" />
            <span>Supported · 0.6.x</span>
          </>
        }
      />

      <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center px-4 sm:px-6">
        <Button asChild size="sm" className="rounded-full">
          <Link href="mailto:security@cli-ck.app">
            <HugeiconsIcon icon={Mail01Icon} strokeWidth={2} />
            security@cli-ck.app
          </Link>
        </Button>
      </div>

      <Prose>
        <h2>Reporting</h2>
        <p>
          Email <Link href="mailto:security@cli-ck.app">security@cli-ck.app</Link>
          . Include:
        </p>
        <ul>
          <li>What the issue is and what an attacker can do with it.</li>
          <li>Steps to reproduce - a small PoC is great.</li>
          <li>Version, OS, architecture.</li>
        </ul>
        <p>
          You&apos;ll get a reply within a few days. Once it&apos;s fixed,
          we&apos;ll credit you in the release notes - unless you&apos;d rather
          stay anonymous.
        </p>
        <p>
          Please <strong>don&apos;t</strong> open a public GitHub issue for
          security reports.
        </p>

        <h2>Supported versions</h2>
        <p>
          Until <code>1.0.0</code>, only the latest minor receives security
          fixes. Right now that&apos;s <code>0.6.x</code>.
        </p>

        <h2>Past advisories</h2>
        <ul>
          <li>
            <strong>OSC 8888 path traversal</strong> (fixed in{" "}
            <code>0.6.4</code>) - a remote SSH host or any process writing to
            the PTY could silently open arbitrary local files in the editor.
            Affected <code>&gt;= 0.6.0</code>, <code>&lt; 0.6.4</code>.
            Reported by <em>@eulex</em>. CWE-22, CWE-269. Update immediately if
            you&apos;re on an affected version.
          </li>
        </ul>

        <h2>What&apos;s in scope</h2>
        <ul>
          <li>
            The Rust backend in <code>src-tauri/</code> - PTY, FS, IPC, plugins.
          </li>
          <li>
            The frontend in <code>src/</code>, anywhere untrusted input lands -
            terminal output, file content, AI tool results, credentials.
          </li>
          <li>
            Release artifacts on GitHub and <code>cli-ck.app</code>.
          </li>
          <li>The auto-updater.</li>
        </ul>

        <h2>What&apos;s not</h2>
        <ul>
          <li>
            Bugs in upstream dependencies (Tauri, xterm.js, CodeMirror, AI
            SDKs). Report those upstream - we&apos;ll ship the fix once
            it&apos;s released.
          </li>
          <li>
            Anything that needs an already-compromised machine or a local
            attacker with shell access.
          </li>
          <li>
            Older versions (<code>&lt; 0.6</code>).
          </li>
        </ul>

        <h2>What we do to keep things safe</h2>
        <ul>
          <li>
            <strong>API keys</strong> live in the OS keychain via{" "}
            <code>keyring</code> - not on disk, not in <code>localStorage</code>
            , not in logs.
          </li>
          <li>
            <strong>No telemetry.</strong> cli-ck only talks to the network when
            you ask it to (AI requests, update checks, web preview).
          </li>
          <li>
            <strong>AI tool approval.</strong> File writes and shell commands
            from the agent need your OK before they run.
          </li>
          <li>
            <strong>No Node in the renderer.</strong> The frontend reaches the
            host only through allow-listed Tauri commands.
          </li>
          <li>
            <strong>Signed releases.</strong> Updates are verified before
            they&apos;re applied.
          </li>
        </ul>

        <h2>What we can&apos;t promise</h2>
        <ul>
          <li>
            cli-ck runs whatever you (or the agent) tell it to run, with your
            permissions. That&apos;s the point of a terminal.
          </li>
          <li>
            AI providers see whatever you send them. Read their retention
            policies.
          </li>
          <li>
            Local LLM endpoints (LM Studio, OpenAI-compatible) are trusted at
            the network level - only point cli-ck at servers you control.
          </li>
        </ul>
      </Prose>

      <section className="relative mt-16 mb-24 px-4 sm:mt-20 sm:mb-32 sm:px-6">
        <div className="mx-auto flex max-w-3xl items-center justify-center gap-3 text-sm text-muted-foreground">
          <HugeiconsIcon
            icon={ShieldUserIcon}
            className="size-4"
            strokeWidth={1.8}
          />
          <span>
            PGP key on request. Email{" "}
            <Link
              href="mailto:security@cli-ck.app"
              className="text-foreground underline decoration-muted-foreground/40 underline-offset-4 hover:decoration-foreground"
            >
              security@cli-ck.app
            </Link>
            .
          </span>
        </div>
      </section>
    </PageShellWrapper>
  )
}
