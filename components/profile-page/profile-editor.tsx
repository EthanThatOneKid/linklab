import type { Profile, ProfileLink } from "#/lib/profile.ts";
import { BR, BUTTON, DIV, FORM, INPUT, LABEL, LI, P, UL } from "@fartlabs/htx";
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
          Description{" "}
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
          Color Style{" "}
          <INPUT
            id="colorStyle"
            name="colorStyle"
            value={props.value.colorStyle}
          />
        </LABEL>
        <BR />
        <LABEL for="backgroundStyle">
          Background Style{" "}
          <INPUT
            id="backgroundStyle"
            name="backgroundStyle"
            value={props.value.backgroundStyle}
          />
        </LABEL>
        <BR />
        <BUTTON type="submit">Update</BUTTON>
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
      <BUTTON type="submit">Update</BUTTON>
      <BUTTON formmethod="DELETE" type="submit">
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
          Link Title <INPUT id="title" name="title" />
        </LABEL>
        <BR />
        <LABEL for="iconURL">
          Link Icon URL <INPUT id="iconURL" name="iconURL" />
        </LABEL>
        <BR />
        <BUTTON type="submit">Add</BUTTON>
      </FORM>
    </DIV>
  );
}
