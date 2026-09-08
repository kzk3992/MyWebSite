import { legalOperator } from "@/config/site";
import type { Locale } from "@/i18n/site";

export function OperatorInformation({ locale = "ja" }: { locale?: Locale }) {
  const isJapanese = locale === "ja";
  return (
    <>
      <p>{isJapanese ? "運営者" : "Operator"}: {legalOperator.name}</p>
      <p>{isJapanese ? "運営責任者" : "Responsible Operator"}: {legalOperator.responsiblePerson}</p>
      <p>
        {isJapanese ? "お問い合わせ" : "Contact"}: {" "}
        <a href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a>
      </p>
    </>
  );
}
