"use client"

import { GithubIcon, GoogleIcon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { Dialog } from "radix-ui"

import { Button } from "@/components/ui/button"

export function AuthGateDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-border/60 bg-background p-6 shadow-2xl outline-none sm:p-8">
          <Dialog.Title className="text-xl font-semibold tracking-tight">
            Sign in to manage requests
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Sign in before creating, editing, or deleting your feature requests.
            Google and GitHub login will be connected through Clerk.
          </Dialog.Description>
          <div className="mt-6 grid gap-3">
            <Button type="button" className="h-11 justify-start gap-3" disabled>
              <HugeiconsIcon icon={GoogleIcon} strokeWidth={2} />
              Continue with Google
              <span className="ml-auto text-[10px] font-normal text-muted-foreground">
                Preview
              </span>
            </Button>
            <Button type="button" variant="outline" className="h-11 justify-start gap-3" disabled>
              <HugeiconsIcon icon={GithubIcon} strokeWidth={2} />
              Continue with GitHub
              <span className="ml-auto text-[10px] font-normal text-muted-foreground">
                Preview
              </span>
            </Button>
          </div>
          <p className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
            Clerk is not connected in this local preview. No credentials are
            required yet.
          </p>
          <Dialog.Close asChild>
            <Button type="button" variant="ghost" className="mt-2 w-full">
              Cancel
            </Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
