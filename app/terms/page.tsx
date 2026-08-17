import type { Metadata } from "next"
import Link from "next/link"

import { PageHero, PageShellWrapper, Prose } from "@/components/landing-layout/page-shell-wrapper"
import { SITE } from "@/lib/site"

export const metadata: Metadata = {
  title: "Terms",
  description: `The terms that apply when you download and use ${SITE.name}.`,
  alternates: { canonical: `${SITE.url}/terms` },
}

const updated = "May 2026"

export default function TermsPage() {
  return (
    <PageShellWrapper>
      <PageHero
        eyebrow="Terms"
        title="Terms of Use"
        lead="Plain-language terms for downloading and using cli-ck. The software itself is governed by the Apache-2.0 license; this page covers the website and the app overall."
        meta={<span>Last updated · {updated}</span>}
      />

      <Prose>
        <h2>The short version</h2>
        <ul>
          <li>cli-ck is free, open source, and provided as-is.</li>
          <li>You&apos;re responsible for what you run with it.</li>
          <li>
            API keys you configure go directly to the providers you choose.
          </li>
          <li>
            No warranty, no liability beyond what the Apache-2.0 license allows.
          </li>
        </ul>

        <h2>1. The software</h2>
        <p>
          The cli-ck application is licensed under{" "}
          <Link
            href="https://www.apache.org/licenses/LICENSE-2.0"
            target="_blank"
            rel="noreferrer"
          >
            Apache License 2.0
          </Link>
          . The license text in the{" "}
          <Link
            href={`${SITE.github}/blob/main/LICENSE`}
            target="_blank"
            rel="noreferrer"
          >
            repository
          </Link>{" "}
          governs your use of the source code and binaries. These terms apply to
          the website at <code>{SITE.domain}</code> and to anything not covered
          by the license.
        </p>

        <h2>2. Your use of cli-ck</h2>
        <p>
          cli-ck executes shell commands, reads and writes files, and forwards
          requests to AI providers you configure. You are solely responsible for
          what you run, what you send to those providers, and the consequences
          thereof.
        </p>
        <p>Don&apos;t use cli-ck to:</p>
        <ul>
          <li>
            Break the law where you live or where the affected systems live.
          </li>
          <li>Access systems you aren&apos;t authorized to access.</li>
          <li>Send content to AI providers in violation of their terms.</li>
        </ul>

        <h2>3. Third-party services</h2>
        <p>
          cli-ck can connect to third-party AI providers (OpenAI, Anthropic,
          Google, Groq, Cerebras, xAI, LM Studio, and any OpenAI-compatible
          endpoint). Those providers have their own terms and privacy policies.
          Read them. We&apos;re not a party to that relationship and can&apos;t
          make promises on their behalf.
        </p>

        <h2>4. Updates</h2>
        <p>
          cli-ck includes an auto-updater that fetches and verifies signed
          releases from GitHub. You can disable it in settings. Updates may add,
          change, or remove features.
        </p>

        <h2>5. No warranty</h2>
        <p>
          cli-ck is provided &ldquo;AS IS&rdquo;, without warranty of any kind,
          express or implied. We do not warrant that cli-ck will be error-free,
          secure, or uninterrupted, or that it will fit any particular purpose.
        </p>

        <h2>6. Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, in no event will cli-ck or its
          maintainers be liable for any indirect, incidental, special,
          consequential, or punitive damages arising out of your use of cli-ck.
          The Apache-2.0 license&apos;s limitation of liability applies in full.
        </p>

        <h2>7. Trademarks</h2>
        <p>
          &ldquo;cli-ck&rdquo; and the cli-ck logo are unregistered trademarks of
          the project maintainers. The Apache-2.0 license does not grant
          trademark rights - if you fork the project, please use a different
          name and logo.
        </p>

        <h2>8. Changes</h2>
        <p>
          We may update these terms. Material changes will be reflected in the
          &ldquo;Last updated&rdquo; date at the top of this page. Continued use
          of cli-ck after a change means you accept the new terms.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions? Email{" "}
          <Link href="mailto:info@cli-ck.app">info@cli-ck.app</Link>. Security
          issues go to{" "}
          <Link href="mailto:security@cli-ck.app">security@cli-ck.app</Link>.
        </p>
      </Prose>

      <div className="h-24 sm:h-32" />
    </PageShellWrapper>
  )
}
