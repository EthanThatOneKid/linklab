import {
  BR,
  BUTTON,
  DIV,
  FORM,
  INPUT,
  LABEL,
  OPTION,
  SELECT,
  SPAN,
} from "@fartlabs/htx";
import type { Profile } from "#/lib/profile.ts";
import { API_PREFIX, makeLinkURL } from "#/lib/urls.ts";

interface LinkFormProps {
  profile: Profile;
  index: number;
}

export function LinkForm(props: LinkFormProps) {
  const link = props.profile.links[props.index];
  return (
    <DIV>
      <FORM
        method="POST"
        action={API_PREFIX +
          makeLinkURL(props.profile.id, props.index.toString())}
      >
        <LABEL for="url">
          <SPAN class="required">
            Link URL
          </SPAN>{" "}
          <INPUT
            id="url"
            name="url"
            value={link.url}
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
            value={link.title}
            placeholder="No value provided"
          />
        </LABEL>
        <BR />
        <LABEL for="iconURL">
          Link icon URL{" "}
          <INPUT
            id="iconURL"
            name="iconURL"
            value={link.iconURL}
            placeholder="No value provided"
          />
        </LABEL>
        <BUTTON type="submit" class="fart-button">Update</BUTTON>{" "}
        <BUTTON
          formmethod="POST"
          formaction={API_PREFIX +
            makeLinkURL(props.profile.id, props.index.toString()) +
            "/delete"}
          class="fart-button"
        >
          Delete
        </BUTTON>
      </FORM>

      {props.profile.links.length > 1
        ? (
          <FORM
            method="POST"
            action={API_PREFIX +
              makeLinkURL(
                props.profile.id,
                props.index.toString() + "/move",
              )}
          >
            <DIV>
              <SELECT name="newIndex">
                <OPTION value="">Select a position</OPTION>
                {props.index !== 0 ? <OPTION value="0">to top</OPTION> : ""}
                {props.profile.links
                  .map(({ title }, i) => (
                    i === props.index || i === props.index - 1
                      ? "" // Exclude the current and previous links.
                      : (
                        <OPTION value={i.toString()}>
                          after {renderLinkString(i, title)}
                        </OPTION>
                      )
                  ))
                  .join("")}
              </SELECT>
              <BR />
              <BUTTON type="submit" class="fart-button">Move</BUTTON>
            </DIV>
          </FORM>
        )
        : ""}
    </DIV>
  );
}

export function renderLinkString(index: number, title?: string): string {
  return `Link ${index + 1}${title !== undefined ? `: ${title}` : ""}`;
}
