import Button from "@/components/Button";
import { signinWithGithub } from "@/lib/actions";

export default function GithubSigninButton() {
  return (
    <form action={signinWithGithub}>
      <Button
        type="submit"
        className="bg-gray-500 hover:bg-gray-700 disabled:hover:bg-gray-500 w-full"
      >
        Sign In With Github
      </Button>
    </form>
  );
}
