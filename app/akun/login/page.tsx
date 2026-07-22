import { Suspense } from "react";

import { CustomerAuthForm } from "@/components/auth/customer-auth-form";
import { BackLink } from "@/components/shared/back-link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CustomerLoginPage() {
  return (
    <div className="page-rise min-h-screen bg-muted/20 px-4 py-8">
      <div className="mx-auto mb-4 max-w-md">
        <BackLink href="/akun" />
      </div>
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-primary">Masuk</CardTitle>
          <CardDescription>
            Masuk ke akun IndustrialX untuk RFQ, favorit, dan notifikasi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<p className="text-sm text-muted-foreground">Memuat...</p>}>
            <CustomerAuthForm mode="login" />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
