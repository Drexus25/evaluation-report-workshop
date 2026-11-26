import RaportContainer from "@/components/feature/raport/container/RaportContainer";
import AuthOnlyGuard from "@/components/auth/AuthOnlyGuard";

export const metadata = {
  title: "Raport Pribadi Fungsionaris | EvalOrg",
  description: "Transkrip evaluasi kinerja fungsionaris organisasi",
};

export default function RaportPage() {
  return (
    <AuthOnlyGuard>
      <RaportContainer />
    </AuthOnlyGuard>
  );
}
