import { BR, BUTTON, DIV, FORM, H4, INPUT, P } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import { makeProfilesURL, makeProfileTransferURL } from "#/lib/urls.ts";

interface ProfileDangerZoneFormProps {
  value: Profile;
}

export function ProfileFormDangerZoneForm(props: ProfileDangerZoneFormProps) {
  return (
    <DIV>
      <H4>Delete profile</H4>
      <P>
        This form contains the delete button for the profile in question. Click
        the delete button to confirm deletion. Proceed with caution.
      </P>
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

      <H4>Transfer profile</H4>
      <FORM action={makeProfileTransferURL(props.value.id)}>
        <INPUT
          type="hidden"
          name="id"
          value={props.value.id}
        />
        <INPUT
          type="text"
          name="newOwnerGitHubLogin"
          placeholder="New owner"
          required="true"
        />
        <BR />
        <BR />

        <BUTTON type="submit" class="fart-button">
          Transfer profile
        </BUTTON>
      </FORM>
    </DIV>
  );
}
