import { AppHeader } from "@/components/layout/app-header";
import {
  ContactContentSection,
  ContactHeroSection,
} from "@/components/sections/contact/contact-sections";

export default function ContactPage() {
  return (
    <div className="page-rise pb-8">
      <AppHeader
        variant="back"
        backHref="/"
        title="Contact Support"
        showAccount={false}
      />
      <main className="mx-auto max-w-7xl">
        <ContactHeroSection />
        <ContactContentSection />
      </main>
    </div>
  );
}
