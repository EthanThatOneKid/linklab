import { BUTTON, FORM, INPUT } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import { makeProfilesURL } from "#/lib/urls.ts";

interface ProfileDangerZoneFormProps {
  value: Profile;
}

export function ProfileDangerZoneForm(props: ProfileDangerZoneFormProps) {
  return (
    <FORM
      action={makeProfilesURL()}
      method="DELETE"
    >
      <INPUT
        type="hidden"
        name="id"
        value={props.value.id}
      />

      <BUTTON type="submit" class="fart-button">
        Delete profile
      </BUTTON>
    </FORM>
  );
}
