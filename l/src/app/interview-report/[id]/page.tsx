import Report from "~/components/interivew-report/report";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div>
      <Report id={id} />
    </div>
  );
}
