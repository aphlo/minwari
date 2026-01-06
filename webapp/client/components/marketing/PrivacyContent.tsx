import { useTranslations } from "next-intl";

export function PrivacyContent() {
  const t = useTranslations("marketing.privacy");
  const purposeItems = t.raw("sections.purpose.list") as string[];

  return (
    <div className="space-y-6 sm:space-y-8 text-sm sm:text-base leading-relaxed">
      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.compliance.title")}
        </h2>
        <p>{t("sections.compliance.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.safety.title")}
        </h2>
        <p>{t("sections.safety.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.acquisitionCompliance.title")}
        </h2>
        <p>{t("sections.acquisitionCompliance.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.acquisition.title")}
        </h2>
        <p>{t("sections.acquisition.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.purpose.title")}
        </h2>
        <p>{t("sections.purpose.body")}</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          {purposeItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.provision.title")}
        </h2>
        <p>{t("sections.provision.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.purposeChange.title")}
        </h2>
        <p>{t("sections.purposeChange.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.thirdParty.title")}
        </h2>
        <p>{t("sections.thirdParty.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.review.title")}
        </h2>
        <p>{t("sections.review.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.disposal.title")}
        </h2>
        <p>{t("sections.disposal.body")}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">
          {t("sections.contact.title")}
        </h2>
        <p>{t("sections.contact.body")}</p>
      </section>
    </div>
  );
}
