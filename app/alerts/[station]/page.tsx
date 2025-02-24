export default async function StationAlertsPage(props: { params: Promise<{ station: string }> }) {
  const params = await props.params;
  const parsedStation = decodeURIComponent(params.station).replaceAll('+', ' ').toLowerCase();

  return <main>{parsedStation}</main>;
}
