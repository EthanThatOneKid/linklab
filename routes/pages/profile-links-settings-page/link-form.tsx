import { BR, BUTTON, FORM, INPUT, LABEL } from "@fartlabs/htx";
import type { ProfileLink } from "#/lib/profile.ts";
import { API_PREFIX, makeProfileLinkURL } from "#/lib/urls.ts";

interface LinkFormProps {
  parentID: string;
  index: number;
  value: ProfileLink;
}

export function LinkForm(props: LinkFormProps) {
  return (
    <FORM
      action={API_PREFIX +
        makeProfileLinkURL(props.parentID, props.index.toString())}
    >
      <LABEL for="url">
        Link URL{" "}
        <INPUT
          id="url"
          name="url"
          value={props.value.url}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <LABEL for="title">
        Link Title{" "}
        <INPUT
          id="title"
          name="title"
          value={props.value.title}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <LABEL for="iconURL">
        Link Icon URL{" "}
        <INPUT
          id="iconURL"
          name="iconURL"
          value={props.value.iconURL}
          placeholder="No value provided"
        />
      </LABEL>
      <BR />
      <BUTTON type="submit" class="fart-button">Update</BUTTON>
      <BUTTON formmethod="DELETE" class="fart-button">
        Delete
      </BUTTON>
    </FORM>
  );
}
