"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function VaultSecuritySettings({ vault }: { vault: any }) {
  const [isPublic, setPublic] = useState(vault.public || false);
  const [isEncrypted, setEncypted] = useState(vault.encrypted || false);
  const [allowPublicSubmissions, setAllowPublicSubmissions] = useState(
    vault.public_submissions || false
  );
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security settings</CardTitle>
        <CardDescription>
          Manage your vaults security and visability.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="necessary" className="flex flex-col space-y-1">
            <span>Public</span>
            <span className="font-normal leading-snug text-muted-foreground text-sm opacity-50">
              Allow anyone to view the contents of this vault.
            </span>
          </Label>
          <Switch
            id="public"
            disabled={isEncrypted}
            checked={isPublic}
            onCheckedChange={setPublic}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="functional" className="flex flex-col space-y-1">
            <span>Encrypted</span>
            <span className="font-normal leading-snug text-muted-foreground text-sm opacity-50">
              Encrypt the contents of this vault. This may limit the search and
              analysis features.
            </span>
          </Label>
          <Switch
            id="encrypted"
            disabled={isPublic}
            checked={isEncrypted}
            onCheckedChange={setEncypted}
          />
        </div>
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="functional" className="flex flex-col space-y-1">
            <span>Public submissions</span>
            <span className="font-normal leading-snug text-muted-foreground text-sm opacity-50">
              Allow anyone to submit content. You will be able to review beofre
              it's added.
            </span>
          </Label>
          <Switch
            id="allowPublicSubmissions"
            checked={allowPublicSubmissions}
            onCheckedChange={setAllowPublicSubmissions}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Save settings
        </Button>
      </CardFooter>
    </Card>
  );
}
