import { HelpFaqSection } from "@/components/sections/help/help-faq-section";
import { catalogService } from "@/lib/services/catalog.service";

export default async function BantuanPage() {
  const faqs = await catalogService.getFaqs();

  return (
    <div className="page-rise">
      <HelpFaqSection faqs={faqs} />
    </div>
  );
}
