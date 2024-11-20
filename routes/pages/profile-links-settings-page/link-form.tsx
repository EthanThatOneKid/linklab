import { BR, BUTTON, DIV, FORM, INPUT, LABEL } from "@fartlabs/htx";
import type { ProfileLink } from "#/lib/profile.ts";
import { API_PREFIX, makeProfileLinkURL } from "#/lib/urls.ts";

interface LinkFormProps {
  parentID: string;
  index: number;
  value: ProfileLink;
}

export function LinkForm(props: LinkFormProps) {
  return (
    <DIV>
      <FORM
        method="POST"
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
            required="true"
          />
        </LABEL>
        <BR />
        <LABEL for="title">
          Link title{" "}
          <INPUT
            id="title"
            name="title"
            value={props.value.title}
            placeholder="No value provided"
          />
        </LABEL>
        <BR />
        <LABEL for="iconURL">
          Link icon URL{" "}
          <INPUT
            id="iconURL"
            name="iconURL"
            value={props.value.iconURL}
            placeholder="No value provided"
          />
        </LABEL>
        <BR />
        <BUTTON type="submit" class="fart-button">Update</BUTTON>{" "}
        <BUTTON
          formmethod="POST"
          formaction={API_PREFIX +
            makeProfileLinkURL(props.parentID, props.index.toString()) +
            "/delete"}
          class="fart-button"
        >
          Delete
        </BUTTON>
      </FORM>
    </DIV>
  );
}
