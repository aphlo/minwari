import { useTranslations } from "next-intl";

export function TermsContent() {
  const t = useTranslations("marketing.terms");
  const prohibitedItems = t.raw("sections.prohibited.list") as string[];
  const suspensionItems = t.raw("sections.suspension.list") as string[];
  const restrictionItems = t.raw("sections.restriction.list") as string[];
  const disclaimerItems = t.raw("sections.disclaimer.list") as string[];

  return (
    <div className="space-y-6 sm:space-y-8 text-sm sm:text-base leading-relaxed">
      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.intro.title")}
        </h2>
        <p>{t("sections.intro.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.applicability.title")}
        </h2>
        <p>{t("sections.applicability.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.prohibited.title")}
        </h2>
        <p>{t("sections.prohibited.body")}</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          {prohibitedItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.suspension.title")}
        </h2>
        <p>{t("sections.suspension.body")}</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          {suspensionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3">{t("sections.suspension.bodyAfter")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.restriction.title")}
        </h2>
        <p>{t("sections.restriction.body")}</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          {restrictionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3">{t("sections.restriction.bodyAfter")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.change.title")}
        </h2>
        <p>{t("sections.change.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.termsChange.title")}
        </h2>
        <p>{t("sections.termsChange.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.assignment.title")}
        </h2>
        <p>{t("sections.assignment.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.disclaimer.title")}
        </h2>
        <p>{t("sections.disclaimer.body")}</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          {disclaimerItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-3">{t("sections.disclaimer.bodyAfter")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.governingLaw.title")}
        </h2>
        <p>{t("sections.governingLaw.body")}</p>
      </section>
    </div>
  );
}
