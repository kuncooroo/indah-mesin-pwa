import { AppHeader } from "@/components/layout/app-header";
import { SavedItemsSection } from "@/components/sections/saved/saved-items-section";

export default function SavedPage() {
  return (
    <div className="page-rise">
      <AppHeader variant="back" backHref="/" title="IndustrialX" />
      <SavedItemsSection />
    </div>
  );
}
