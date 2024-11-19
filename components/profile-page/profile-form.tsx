import type { Profile } from "#/lib/profile.ts";
import { A, BR, BUTTON, FORM, INPUT, LABEL, TEXTAREA } from "@fartlabs/htx";
import { makeProfilesURL } from "#/lib/urls.ts";

export interface ProfileFormProps {
  value: Profile;
}

export function ProfileForm(props: ProfileFormProps) {
  return (
    <FORM action={makeProfilesURL()}>
      <LABEL for="id">
        ID{" "}
        <INPUT
          id="id"
          name="id"
          value={props.value.id}
          placeholder="No value provided"
          required="true"
        />
      </LABEL>
      <BR />
      <LABEL for="title">
        Title{" "}
        <INPUT
          id="title"
          name="title"
          value={props.value.title}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <LABEL for="description">
        Description
        <INPUT
          id="description"
          name="description"
          value={props.value.description}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <LABEL for="iconURL">
        Icon URL{" "}
        <INPUT
          id="iconURL"
          name="iconURL"
          value={props.value.iconURL}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <LABEL for="colorStyle">
        Color style<CSS3CompatibilityBadge />{" "}
        <TEXTAREA
          id="colorStyle"
          name="colorStyle"
          placeholder="No value provided"
        >
          {props.value.colorStyle}
        </TEXTAREA>
      </LABEL>
      <BR />
      <LABEL for="backgroundStyle">
        Background style<CSS3CompatibilityBadge />{" "}
        <TEXTAREA
          id="backgroundStyle"
          name="backgroundStyle"
          placeholder="No value provided"
        >
          {props.value.backgroundStyle}
        </TEXTAREA>
      </LABEL>
      <BR />
      <BUTTON type="submit" class="fart-button">Update</BUTTON>
    </FORM>
  );
}

/**
 * https://simpleicons.org/?q=css
 */
function CSS3CompatibilityBadge() {
  return (
    <A href="https://developer.mozilla.org/en-US/docs/Web/CSS">
      {`<SVG role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1572B6" width="16" height="16">
  <title>Compatible with CSS3</title>
  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
</SVG>`}
    </A>
  );
}
