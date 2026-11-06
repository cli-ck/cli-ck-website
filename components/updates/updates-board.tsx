"use client"

import {
  Delete02Icon,
  Edit02Icon,
  PlusSignIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Dialog } from "radix-ui"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AuthGateDialog } from "@/components/auth/auth-gate-dialog"

type Status = "requested" | "upcoming" | "in-progress" | "delayed"

type FeatureRequest = {
  id: string
  title: string
  description: string
  name?: string
  email?: string
  status: Status
  track?: string
  createdAt: string
  ownerToken: string
}

const STORAGE_KEY = "cli-ck-feature-requests"
const OWNER_KEY = "cli-ck-feature-request-owner"

const columns: { status: Status; label: string; description: string }[] = [
  {
    status: "in-progress",
    label: "In Progress",
    description: "Actively being built by Click.",
  },
  {
    status: "upcoming",
    label: "Upcoming Features",
    description: "Accepted and planned for a future release.",
  },
  {
    status: "requested",
    label: "Requested Features",
    description: "New ideas start here.",
  },
  {
    status: "delayed",
    label: "Delayed Features",
    description: "Paused while we solve a dependency or constraint.",
  },
]

const INTERNAL_DATE = "2026-11-02T00:00:00.000Z"

function internalRequest(
  request: Pick<FeatureRequest, "id" | "title" | "description" | "status"> & {
    track: string
  }
): FeatureRequest {
  return {
    ...request,
    createdAt: INTERNAL_DATE,
    ownerToken: "click-internal",
  }
}

const INTERNAL_REQUESTS: FeatureRequest[] = [
  internalRequest({
    id: "release-code-intel-sidebar",
    title: "Workspace-scoped Code Intel sidebar",
    description:
      "Ask who calls a symbol, find exact code, and inspect change impact without leaving the Click workspace.",
    status: "in-progress",
    track: "v0.3.0",
  }),
  internalRequest({
    id: "release-subscription-login",
    title: "Subscription login for supported providers",
    description:
      "Use an existing supported subscription during setup instead of requiring a separate provider API key.",
    status: "in-progress",
    track: "v0.3.0",
  }),
  internalRequest({
    id: "release-approval-recovery",
    title: "Approval-flow recovery",
    description:
      "Keep a conversation recoverable when a message arrives while an approve or deny action is waiting.",
    status: "in-progress",
    track: "v0.3.0",
  }),
  internalRequest({
    id: "release-guarded-auto-routing",
    title: "Guarded Auto model routing",
    description:
      "Choose only from locally configured model tiers and fall back safely without approving tools or changing files automatically.",
    status: "in-progress",
    track: "v0.3.0",
  }),
  internalRequest({
    id: "beta-pty-workspace",
    title: "Native PTY terminal with tabs and splits",
    description:
      "Work in a terminal with tabs, splits, WebGL rendering, persisted layout, scrollback, resize, and shell behavior.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "beta-editor-intelligence",
    title: "Code editor with LSP and AI assistance",
    description:
      "Edit with CodeMirror, language-server support, AI completion, and AI-assisted diff review.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "beta-git-workflow",
    title: "Git staging, history, and graph views",
    description:
      "Stage changes, create commits, work with branches, inspect history, and understand repository relationships.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "beta-spaces",
    title: "Spaces and workspace management",
    description:
      "Organize projects and restore the working context needed to continue across sessions.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "beta-model-options",
    title: "BYOK, subscription, and local model support",
    description:
      "Choose between provider keys, supported subscriptions, and local models while keeping control of model access.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "beta-supervised-agents",
    title: "Agents, subagents, and supervised tools",
    description:
      "Run supervised agent workflows with plan mode, approvals, cancellation, browser automation, and worktrees.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "beta-project-previews",
    title: "Markdown, web, media, and project previews",
    description:
      "Preview common project content and media without leaving the Click workspace.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "beta-ssh-cross-platform",
    title: "SSH sessions and cross-platform desktop support",
    description:
      "Connect to SSH terminals and use the same workspace model across supported desktop platforms.",
    status: "in-progress",
    track: "v0.3.0-beta.1",
  }),
  internalRequest({
    id: "p0-provider-neutral-sessions",
    title: "Provider-neutral agent sessions",
    description:
      "Give every supported agent one structured lifecycle for prompts, tools, images, cancellation, compaction, authentication failures, and history.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-durable-runtime",
    title: "Durable background runtime",
    description:
      "Keep long-running terminal and agent work independent from renderer reloads, app updates, and ordinary restarts where possible.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-session-recovery",
    title: "Session adoption and recovery",
    description:
      "Reconnect to owned running sessions with explicit identity, adoption, restart-generation, and recovery states.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-agent-state-machine",
    title: "Explicit agent state machine",
    description:
      "Represent working, waiting, blocked, cancelling, failed, and completed states as durable structured state.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-tool-call-events",
    title: "Structured tool-call events",
    description:
      "Expose typed tool requests, approvals, results, errors, and progress while retaining Click’s approval policy.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-cancellation-compaction",
    title: "Agent cancellation and compaction",
    description:
      "Stop, compact, retry, and resume long turns while settling pending work into a recoverable session state.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-multi-agent-orchestration",
    title: "Multi-agent orchestration",
    description:
      "Coordinate controlled parallel sessions with explicit task, workspace, status, dependency, and ownership information.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-worktree-control-center",
    title: "Multi-agent worktree control center",
    description:
      "See active agents, worktrees, branches, changed files, test results, and lifecycle actions in one place.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-agent-dependency-graph",
    title: "Agent dependency graph",
    description:
      "Make implementation, test, review, documentation, and merge dependencies visible before work can progress unsafely.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p0-competing-implementations",
    title: "Competing implementation mode",
    description:
      "Compare isolated implementations by diff, tests, cost, and review findings without merging anything automatically.",
    status: "in-progress",
    track: "P0",
  }),
  internalRequest({
    id: "p1-github-issues",
    title: "Native GitHub issue workflow",
    description:
      "Open an issue into a Click workspace and carry its context into an agent session.",
    status: "upcoming",
    track: "Next",
  }),
  internalRequest({
    id: "p1-github-pull-requests",
    title: "Native pull-request workflow",
    description:
      "Inspect, create, update, review, and prepare pull requests from the same work context.",
    status: "upcoming",
    track: "Next",
  }),
  internalRequest({
    id: "p1-mcp-management",
    title: "Managed MCP servers in Settings",
    description:
      "Connect trusted external tools through a policy-aware settings flow with clear permissions and support boundaries.",
    status: "upcoming",
    track: "Next",
  }),
  internalRequest({
    id: "p1-remote-environments",
    title: "Remote runtime environments",
    description:
      "Work across local, SSH, WSL, VM, and future cloud hosts with session identity and capability discovery.",
    status: "upcoming",
    track: "Next",
  }),
  internalRequest({
    id: "p1-mobile-companion",
    title: "Mobile companion and push notifications",
    description:
      "Supervise sessions and receive completion, failure, blocking, and approval updates away from the desktop.",
    status: "requested",
    track: "Later",
  }),
  internalRequest({
    id: "p2-artifact-sharing",
    title: "Shared agent artifacts",
    description:
      "Attach logs, screenshots, diffs, recordings, builds, and reports to engineering work.",
    status: "requested",
    track: "Later",
  }),
  internalRequest({
    id: "p2-capability-plugins",
    title: "Capability-based plugins",
    description:
      "Let extensions declare permissions and run in isolated workers with reviewable lifecycle access.",
    status: "requested",
    track: "Later",
  }),
  internalRequest({
    id: "delayed-renderer-experiment",
    title: "Optional Ghostty/WebGPU renderer",
    description:
      "Evaluate a modern renderer behind the current fallback only after compatibility, accessibility, and performance gates pass.",
    status: "delayed",
    track: "Delayed",
  }),
  internalRequest({
    id: "delayed-billing-boundary",
    title: "Billing and entitlement boundary",
    description:
      "Define what stays free, what becomes paid, and how limits degrade safely after reliability gates are complete.",
    status: "delayed",
    track: "Delayed",
  }),
]

function getOwnerToken() {
  const stored = window.localStorage.getItem(OWNER_KEY)
  if (stored) return stored
  const token = crypto.randomUUID()
  window.localStorage.setItem(OWNER_KEY, token)
  return token
}

function avatarLetter(name: string) {
  return name.trim().charAt(0).toUpperCase() || "?"
}

function loadRequests() {
  if (typeof window === "undefined") return INTERNAL_REQUESTS
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) return INTERNAL_REQUESTS

  try {
    const stored = JSON.parse(saved) as FeatureRequest[]
    const requests = new Map(
      INTERNAL_REQUESTS.map((request) => [request.id, request])
    )
    stored
      .filter((request) => request.ownerToken !== "click-internal")
      .forEach((request) => requests.set(request.id, request))
    return Array.from(requests.values())
  } catch {
    return INTERNAL_REQUESTS
  }
}

export function UpdatesBoard({ requireAuth = true }: { requireAuth?: boolean }) {
  const [requests, setRequests] =
    React.useState<FeatureRequest[]>(INTERNAL_REQUESTS)
  const [ownerToken] = React.useState<string | null>(() =>
    typeof window === "undefined" ? null : getOwnerToken()
  )
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [authDialogOpen, setAuthDialogOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<FeatureRequest | null>(null)
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  React.useEffect(() => {
    const timeoutId = window.setTimeout(() => setRequests(loadRequests()), 0)
    return () => window.clearTimeout(timeoutId)
  }, [])

  function openNewRequest() {
    if (requireAuth) {
      setAuthDialogOpen(true)
      return
    }
    setEditing(null)
    setTitle("")
    setDescription("")
    setName("")
    setEmail("")
    setDialogOpen(true)
  }

  function openEditRequest(request: FeatureRequest) {
    setEditing(request)
    setTitle(request.title)
    setDescription(request.description)
    setName(request.name ?? "")
    setEmail(request.email ?? "")
    setDialogOpen(true)
  }

  function saveRequest(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!ownerToken) return

    const nextRequest: FeatureRequest = {
      id: editing?.id ?? crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      name: name.trim(),
      email: email.trim(),
      status: editing?.status ?? "requested",
      createdAt: editing?.createdAt ?? new Date().toISOString(),
      ownerToken,
    }
    const next = editing
      ? requests.map((request) =>
          request.id === editing.id ? nextRequest : request
        )
      : [nextRequest, ...requests]
    setRequests(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setDialogOpen(false)
  }

  function deleteRequest(request: FeatureRequest) {
    if (request.ownerToken !== ownerToken) return
    if (!window.confirm("Delete your feature request?")) return
    const next = requests.filter((item) => item.id !== request.id)
    setRequests(next)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Public roadmap
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Submit an idea and follow what Click is building in public. New
              requests begin in Requested Features; Click controls roadmap
              moves.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <Button type="button" onClick={openNewRequest}>
              <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2.2} />
              New feature request
            </Button>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground/80 sm:text-right">
              Sign in will be required to create, edit, or delete requests.
              Roadmap status moves remain controlled by Click.
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => {
            const columnRequests = requests.filter(
              (request) => request.status === column.status
            )
            return (
              <section
                key={column.status}
                aria-labelledby={`${column.status}-heading`}
                className="min-h-72 rounded-3xl border border-border/60 bg-background/55 p-3"
              >
                <div className="mb-3 flex items-start justify-between gap-3 px-2 pt-1">
                  <div>
                    <h2
                      id={`${column.status}-heading`}
                      className="text-sm font-semibold tracking-tight"
                    >
                      {column.label}
                    </h2>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {column.description}
                    </p>
                  </div>
                  <span className="rounded-full border border-border/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
                    {columnRequests.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {columnRequests.map((request) => {
                    const isOwner = request.ownerToken === ownerToken
                    return (
                      <article
                        key={request.id}
                        className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-sm leading-snug font-medium">
                            {request.title}
                          </h3>
                          {isOwner ? (
                            <div className="flex shrink-0 gap-1">
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                aria-label={`Edit ${request.title}`}
                                onClick={() => openEditRequest(request)}
                              >
                                <HugeiconsIcon
                                  icon={Edit02Icon}
                                  strokeWidth={2}
                                />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon-xs"
                                aria-label={`Delete ${request.title}`}
                                onClick={() => deleteRequest(request)}
                              >
                                <HugeiconsIcon
                                  icon={Delete02Icon}
                                  strokeWidth={2}
                                />
                              </Button>
                            </div>
                          ) : null}
                        </div>
                        {request.track ? (
                          <span className="mt-2 inline-flex rounded-full border border-border/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                            {request.track}
                          </span>
                        ) : null}
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {request.description}
                        </p>
                        {request.name ? (
                          <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-3">
                            <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                              {avatarLetter(request.name)}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {request.name}
                            </span>
                          </div>
                        ) : null}
                      </article>
                    )
                  })}
                  {columnRequests.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border/70 px-4 py-8 text-center text-xs text-muted-foreground">
                      No requests here yet.
                    </div>
                  ) : null}
                </div>
              </section>
            )
          })}
        </div>
      </section>

      <Button
        type="button"
        size="icon-lg"
        className="fixed right-5 bottom-5 z-40 size-12 rounded-full shadow-lg sm:right-8 sm:bottom-8"
        aria-label="Add a feature request"
        onClick={openNewRequest}
      >
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2.2} />
      </Button>

      <AuthGateDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />

      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-border/60 bg-background p-6 shadow-2xl outline-none sm:p-8">
            <Dialog.Title className="text-xl font-semibold tracking-tight">
              {editing ? "Edit feature request" : "Request a feature"}
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {editing
                ? "Update the request you submitted. Its roadmap status stays under Click’s control."
                : "Share a feature idea with the Click team and community."}
            </Dialog.Description>
            <form className="mt-6 space-y-4" onSubmit={saveRequest}>
              <label
                className="block space-y-2 text-sm font-medium"
                htmlFor="feature-title"
              >
                Feature name
                <Input
                  id="feature-title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="e.g. Workspace-level agent memory"
                  required
                  maxLength={120}
                />
              </label>
              <label
                className="block space-y-2 text-sm font-medium"
                htmlFor="feature-description"
              >
                Description
                <textarea
                  id="feature-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="What problem would this solve?"
                  required
                  maxLength={600}
                  rows={4}
                  className="w-full resize-y rounded-3xl border border-transparent bg-input/50 px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
                />
              </label>
              <label
                className="block space-y-2 text-sm font-medium"
                htmlFor="requester-name"
              >
                Your name
                <Input
                  id="requester-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Jane Doe"
                  required
                  maxLength={80}
                />
              </label>
              <label
                className="block space-y-2 text-sm font-medium"
                htmlFor="requester-email"
              >
                Your email
                <Input
                  id="requester-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="jane@example.com"
                  required
                />
              </label>
              <div className="flex justify-end gap-2 pt-2">
                <Dialog.Close asChild>
                  <Button type="button" variant="ghost">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Button type="submit">
                  {editing ? "Save changes" : "Submit request"}
                </Button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}
