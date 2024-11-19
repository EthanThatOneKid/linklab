import type { Profile } from "#/lib/profile.ts";
import { BR, BUTTON, FORM, INPUT, LABEL, TEXTAREA } from "@fartlabs/htx";
import { API_PREFIX, makeProfilesURL } from "#/lib/urls.ts";
import { CSS3CompatibilityBadge } from "#/components/css3-compatibility-badge.tsx";

export interface ProfileFormProps {
  value: Profile;
}

export function ProfileForm(props: ProfileFormProps) {
  return (
    <FORM action={API_PREFIX + makeProfilesURL()}>
      <INPUT
        type="hidden"
        id="id"
        name="id"
        value={props.value.id}
      />
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
