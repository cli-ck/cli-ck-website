import type { Metadata } from "next"
import Link from "next/link"

import { PageHero, PageShellWrapper, Prose } from "@/components/landing-layout/page-shell-wrapper"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Privacy",
  description: `What ${SITE.name} collects (almost nothing) and what it sends, where, and when.`,
  alternates: { canonical: `${SITE.url}/privacy` },
}

const updated = "May 2026"

export default function PrivacyPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="Privacy"
        title="Privacy"
        lead="cli-ck has no accounts, no analytics, and no backend. Here's exactly what data leaves your machine, and when."
        meta={<span>Last updated · {updated}</span>}
      />

      <Prose>
        <h2>The short version</h2>
        <ul>
          <li>No accounts, no sign-up, no telemetry.</li>
          <li>
            API keys are stored in the OS keychain, never on disk in plaintext.
          </li>
          <li>
            Network requests only happen when you ask: AI calls, update checks,
            web preview.
          </li>
          <li>
            Whatever you send to an AI provider, that provider sees. Read their
            policies.
          </li>
        </ul>

        <h2>What cli-ck stores locally</h2>
        <ul>
          <li>
            <strong>Settings and preferences</strong> in the standard app data
            directory for your OS.
          </li>
          <li>
            <strong>Session state</strong> (open tabs, working directories,
            scrollback) so the app can resume.
          </li>
          <li>
            <strong>API keys</strong> in the OS keychain via{" "}
            <code>keyring</code>.
          </li>
          <li>
            <strong>Logs</strong> on disk for debugging. Logs are local-only and
            never uploaded.
          </li>
        </ul>

        <h2>What cli-ck sends over the network</h2>
        <p>
          cli-ck only makes network requests for things you explicitly enabled or
          triggered:
        </p>
        <ul>
          <li>
            <strong>AI requests</strong> go directly to the provider you
            configured (OpenAI, Anthropic, Google, Groq, Cerebras, xAI, or any
            OpenAI-compatible endpoint, including local servers like LM Studio).
            We do not proxy these requests.
          </li>
          <li>
            <strong>Update checks</strong> hit GitHub Releases to see if a newer
            signed build exists. You can disable the auto-updater in settings.
          </li>
          <li>
            <strong>Web preview</strong> loads URLs you point it at - usually a
            local dev server.
          </li>
        </ul>

        <h2>What we (the project) collect</h2>
        <p>
          Nothing. There is no cli-ck server. The only places where data about
          you might live are:
        </p>
        <ul>
          <li>
            <strong>GitHub</strong>, if you file an issue, open a PR, or
            download a release.
          </li>
          <li>
            <strong>This website&apos;s host</strong>, which receives standard
            HTTP request logs (IP, user agent, path) for the duration needed to
            serve and protect the site.
          </li>
          <li>
            <strong>Email</strong>, if you write to{" "}
            <Link href="mailto:info@cli-ck.app">info@cli-ck.app</Link> or{" "}
            <Link href="mailto:security@cli-ck.app">security@cli-ck.app</Link>.
          </li>
        </ul>
        <p>
          We don&apos;t run analytics on this site, don&apos;t set tracking
          cookies, and don&apos;t embed third-party trackers.
        </p>

        <h2>Third-party AI providers</h2>
        <p>
          When you send a prompt, the provider you chose receives it, processes
          it, and may retain it according to their policy. We have no visibility
          into or control over that. If retention matters, use a local model via
          LM Studio - nothing leaves your machine.
        </p>

        <h2>Changes</h2>
        <p>
          If this policy changes, the &ldquo;Last updated&rdquo; date at the top
          of the page changes with it. Material changes will also be mentioned
          in the changelog.
        </p>

        <h2>Contact</h2>
        <p>
          Privacy questions:{" "}
          <Link href="mailto:info@cli-ck.app">info@cli-ck.app</Link>. Security:{" "}
          <Link href="mailto:security@cli-ck.app">security@cli-ck.app</Link>.
          Source:{" "}
          <Link href={SITE.github} target="_blank" rel="noreferrer">
            {SITE.github.replace("https://", "")}
          </Link>
          .
        </p>
      </Prose>

      <div className="h-24 sm:h-32" />
    </PageShellWrapper>
  )
}
