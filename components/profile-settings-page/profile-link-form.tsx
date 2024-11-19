import { BR, BUTTON, FORM, INPUT, LABEL } from "@fartlabs/htx";
import type { ProfileLink } from "#/lib/profile.ts";
import { makeProfileLinkURL } from "#/lib/urls.ts";

interface ProfileLinkFormProps {
  parentID: string;
  index: number;
  value: ProfileLink;
}

export function ProfileLinkForm(props: ProfileLinkFormProps) {
  return (
    <FORM action={makeProfileLinkURL(props.parentID, props.index.toString())}>
      <LABEL for={`link-${props.index}-url`}>
        Link URL{" "}
        <INPUT
          id={`link-${props.index}-url`}
          name={`link-${props.index}-url`}
          value={props.value.url}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <LABEL for={`link-${props.index}-title`}>
        Link Title{" "}
        <INPUT
          id={`link-${props.index}-title`}
          name={`link-${props.index}-title`}
          value={props.value.title}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <LABEL for={`link-${props.index}-iconURL`}>
        Link Icon URL{" "}
        <INPUT
          id={`link-${props.index}-iconURL`}
          name={`link-${props.index}-iconURL`}
          value={props.value.iconURL}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <BUTTON type="submit" class="fart-button">Update</BUTTON>
      <BUTTON formmethod="DELETE" type="submit" class="fart-button">
        Delete
      </BUTTON>
    </FORM>
  );
}
