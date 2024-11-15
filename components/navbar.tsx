import { A, DIV, H1, NAV } from "@fartlabs/htx";
import type { User } from "#/lib/user.ts";
import { SignInForm } from "#/components/signin-form.tsx";
import { SignOutForm } from "#/components/signout-form.tsx";

export interface NavbarProps {
  user?: User;
}

export function Navbar(props: NavbarProps) {
  return (
    <NAV>
      <H1 id="top" class="fart-header">Linklab</H1>

      {props.user === undefined ? <SignInForm /> : (
        <DIV>
          <UserPageLink user={props.user} /> <SignOutForm />
        </DIV>
      )}
    </NAV>
  );
}

function UserPageLink(props: { user: User }) {
  return <A href={makeUserPageURL(props.user)}>{props.user.githubLogin}</A>;
}

function makeUserPageURL(user: User) {
  return `/users/${user.githubLogin}`;
}
