import { BR, BUTTON, DIV, FORM, INPUT, LABEL, SPAN } from "@fartlabs/htx";
import { API_PREFIX, makeLinksURL } from "#/lib/urls.ts";

interface LinkFormAddProps {
  /**
   * parentID is the ID of the profile that the new link will be added to.
   */
  parentID: string;
}

export function LinkFormAdd(props: LinkFormAddProps) {
  return (
    <DIV>
      <FORM
        method="POST"
        action={API_PREFIX + makeLinksURL(props.parentID)}
      >
        <LABEL for="url">
          <SPAN class="required">Link URL</SPAN>{" "}
          <INPUT
            id="url"
            name="url"
            type="url"
            placeholder="https://example.com"
            required="true"
          />
        </LABEL>
        <BR />
        <LABEL for="title">
          Link title <INPUT id="title" name="title" placeholder="Example" />
        </LABEL>
        <BR />
        <LABEL for="iconURL">
          Link icon URL{" "}
          <INPUT
            id="iconURL"
            name="iconURL"
            type="url"
            placeholder="https://example.com/icon.png"
          />
        </LABEL>
        <BR />
        <BUTTON type="submit" class="fart-button">Add</BUTTON>
      </FORM>
    </DIV>
  );
}
