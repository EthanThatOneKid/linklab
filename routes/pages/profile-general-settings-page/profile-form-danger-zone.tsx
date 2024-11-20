import { BR, BUTTON, DIV, FORM, H4, INPUT, P } from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import { API_PREFIX, makeProfileURL } from "#/lib/urls.ts";

interface ProfileDangerZoneFormProps {
  value: Profile;
}

export function ProfileFormDangerZoneForm(props: ProfileDangerZoneFormProps) {
  return (
    <DIV>
      {/* TODO: Add form for changing profile ID. */}

      <H4>Transfer profile</H4>
      <P>
        Transfer the profile to another user. Enter the new owner's login.
      </P>

      <FORM
        action={API_PREFIX + makeProfileURL(props.value.id) + "/transfer"}
        method="POST"
      >
        <INPUT
          type="hidden"
          name="id"
          value={props.value.id}
        />
        <INPUT
          type="text"
          name="newOwnerGitHubLogin"
          placeholder="New owner's login"
          required="true"
        />
        <BR />
        <BR />

        <BUTTON type="submit" class="fart-button">
          Transfer profile
        </BUTTON>
      </FORM>

      <H4>Delete profile</H4>
      <P>
        This form contains the delete button for the profile in question. Click
        the delete button to confirm deletion. Proceed with caution.
      </P>

      <FORM
        action={API_PREFIX + makeProfileURL(props.value.id) + "/delete"}
        method="POST"
      >
        <BUTTON type="submit" class="fart-button">
          Delete profile
        </BUTTON>
      </FORM>
    </DIV>
  );
}
