import { BR, BUTTON, DIV, FORM, INPUT, LABEL } from "@fartlabs/htx";
import { API_PREFIX, makeProfileLinksURL } from "#/lib/urls.ts";

interface LinkFormAddProps {
  /**
   * parentID is the ID of the profile that the new link will be added to.
   */
  parentID: string;
}

export function LinkFormAdd(props: LinkFormAddProps) {
  return (
    <DIV>
      <FORM action={API_PREFIX + makeProfileLinksURL(props.parentID)}>
        <LABEL for="url">
          Link URL{" "}
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
