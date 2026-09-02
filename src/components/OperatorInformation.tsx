import { legalOperator } from "@/config/site";

export function OperatorInformation() {
  return (
    <>
      <p>運営者：{legalOperator.name}</p>
      <p>運営責任者：{legalOperator.responsiblePerson}</p>
      <p>
        お問い合わせ：
        <a href={`mailto:${legalOperator.email}`}>{legalOperator.email}</a>
      </p>
    </>
  );
}
