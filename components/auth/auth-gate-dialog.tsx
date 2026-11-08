"use client"

import { Dialog } from "radix-ui"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

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
            Use your Click account to manage feature requests and dashboard data.
          </Dialog.Description>
          <div className="mt-6 grid gap-3">
            <SignInButton mode="modal">Sign in to Click</SignInButton>
            <SignUpButton mode="modal">Create a Click account</SignUpButton>
          </div>
          <p className="mt-5 border-t border-border/60 pt-4 text-xs leading-relaxed text-muted-foreground">
            Authentication is connected. Usage storage and protected dashboard
            data will follow in the server-backed slice.
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
