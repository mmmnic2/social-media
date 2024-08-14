import Profile from "@/components/profile/Profile";

export default function Page({ params }: { params: { id: number | string } }) {
  return <Profile id={params.id} />;
}
