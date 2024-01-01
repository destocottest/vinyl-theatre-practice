import Button from "@/components/Button";
import { signoutAction } from "@/lib/actions";
import { auth } from "@/lib/auth";
import { getProfileFromSessionId } from "@/lib/utils";

export default async function SecretPage() {
  const session = await auth();
  const profile = session && (await getProfileFromSessionId(session.user.id));

  console.log(profile);

  return (
    <div className="grid place-items-center min-h-screen">
      <div>
        <h1>welcome to the secret page</h1>
        <form action={signoutAction}>
          <Button className="bg-red-500 hover:bg-red-700" type="submit">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
