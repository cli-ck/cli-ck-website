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

type Status = "requested" | "upcoming" | "in-progress" | "delayed"

type FeatureRequest = {
  id: string
  title: string
  description: string
  name: string
  email: string
  status: Status
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

export function UpdatesBoard() {
  const [requests, setRequests] = React.useState<FeatureRequest[]>(() => {
    if (typeof window === "undefined") return []
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return []
    try {
      return JSON.parse(saved) as FeatureRequest[]
    } catch {
      return []
    }
  })
  const [ownerToken] = React.useState<string | null>(() =>
    typeof window === "undefined" ? null : getOwnerToken()
  )
  const [dialogOpen, setDialogOpen] = React.useState(false)
  const [editing, setEditing] = React.useState<FeatureRequest | null>(null)
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")

  function openNewRequest() {
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
    setName(request.name)
    setEmail(request.email)
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
          <p className="max-w-sm text-xs leading-relaxed text-muted-foreground/80 sm:text-right">
            Editing and deletion are limited to the browser that created a
            request in this static preview. Email ownership links need a
            connected backend before launch.
          </p>
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
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {request.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 border-t border-border/50 pt-3">
                          <span className="flex size-6 items-center justify-center rounded-full bg-foreground text-[11px] font-semibold text-background">
                            {avatarLetter(request.name)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {request.name}
                          </span>
                        </div>
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
        className="fixed right-5 bottom-5 z-40 rounded-full shadow-lg sm:right-8 sm:bottom-8"
        aria-label="Add a feature request"
        onClick={openNewRequest}
      >
        <HugeiconsIcon icon={PlusSignIcon} strokeWidth={2.2} />
      </Button>

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
