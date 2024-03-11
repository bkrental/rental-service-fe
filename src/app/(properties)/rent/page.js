import getProperties from "@/actions/getProperties";
import PropertyList from "@/components/PropertyList";

export default async function RentPage() {
  const properties = await getProperties({ transaction_type: "rent" });

  return <PropertyList properties={properties} />;
}
