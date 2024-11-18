import type { Profile, ProfileLink } from "#/lib/profile.ts";
import {
  A,
  BR,
  BUTTON,
  DIV,
  FORM,
  INPUT,
  LABEL,
  LI,
  P,
  TEXTAREA,
  UL,
} from "@fartlabs/htx";
import {
  makeProfileLinksURL,
  makeProfileLinkURL,
  makeProfilesURL,
} from "#/lib/urls.ts";

export interface ProfileEditorProps {
  value: Profile;
}

export function ProfileEditor(props: ProfileEditorProps) {
  return (
    <DIV>
      <FORM action={makeProfilesURL()}>
        <LABEL for="id">
          ID <INPUT id="id" name="id" value={props.value.id} />
        </LABEL>
        <BR />
        <LABEL for="title">
          Title <INPUT id="title" name="title" value={props.value.title} />
        </LABEL>
        <BR />
        <LABEL for="description">
          Description
          <INPUT
            id="description"
            name="description"
            value={props.value.description}
          />
        </LABEL>
        <BR />
        <LABEL for="iconURL">
          Icon URL{" "}
          <INPUT
            id="iconURL"
            name="iconURL"
            value={props.value.iconURL}
          />
        </LABEL>
        <BR />
        <LABEL for="colorStyle">
          Color style<CSS3CompatibilityBadge />{" "}
          <TEXTAREA
            id="colorStyle"
            name="colorStyle"
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
          >
            {props.value.backgroundStyle}
          </TEXTAREA>
        </LABEL>
        <BR />
        <BUTTON type="submit" class="fart-button">Update</BUTTON>
      </FORM>

      <BR />

      {props.value.links === undefined || props.value.links.length === 0
        ? <P>No links yet.</P>
        : (
          <UL>
            {props.value?.links?.map((link, index) => (
              <LI>
                <LinkEditor
                  value={link}
                  index={index}
                  parentID={props.value.id}
                />
              </LI>
            ))}
          </UL>
        )}

      <BR />

      <AddLinkForm parentID={props.value.id} />
    </DIV>
  );
}

interface LinkEditorProps {
  parentID: string;
  index: number;
  value: ProfileLink;
}

function LinkEditor(props: LinkEditorProps) {
  return (
    <FORM action={makeProfileLinkURL(props.parentID, props.index.toString())}>
      <LABEL for={`link-${props.index}-url`}>
        Link URL{" "}
        <INPUT
          id={`link-${props.index}-url`}
          name={`link-${props.index}-url`}
          value={props.value.url}
        />
      </LABEL>
      <BR />
      <LABEL for={`link-${props.index}-title`}>
        Link Title{" "}
        <INPUT
          id={`link-${props.index}-title`}
          name={`link-${props.index}-title`}
          value={props.value.title}
        />
      </LABEL>
      <BR />
      <LABEL for={`link-${props.index}-iconURL`}>
        Link Icon URL{" "}
        <INPUT
          id={`link-${props.index}-iconURL`}
          name={`link-${props.index}-iconURL`}
          value={props.value.iconURL}
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

interface AddLinkFormProps {
  /**
   * parentID is the ID of the profile that the new link will be added to.
   */
  parentID: string;
}

function AddLinkForm(props: AddLinkFormProps) {
  return (
    <DIV>
      <FORM action={makeProfileLinksURL(props.parentID)}>
        <LABEL for="url">
          Link URL <INPUT id="url" name="url" />
        </LABEL>
        <BR />
        <LABEL for="title">
          Link title <INPUT id="title" name="title" />
        </LABEL>
        <BR />
        <LABEL for="iconURL">
          Link icon URL <INPUT id="iconURL" name="iconURL" />
        </LABEL>
        <BR />
        <BUTTON type="submit" class="fart-button">Add</BUTTON>
      </FORM>
    </DIV>
  );
}

/**
 * https://simpleicons.org/?q=css
 */
function CSS3CompatibilityBadge() {
  return (
    <A href="https://developer.mozilla.org/en-US/docs/Web/CSS">
      {`<SVG role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#1572B6" width="16" height="16">
  <title>Compatible with CSS3</title>
  <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
</SVG>`}
    </A>
  );
}
