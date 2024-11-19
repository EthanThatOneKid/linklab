import { BUTTON, FORM, INPUT } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import { API_PREFIX, makeProfilesURL } from "#/lib/urls.ts";

export function ClaimProfileForm() {
  return (
    <FORM
      action={API_PREFIX + makeProfilesURL()}
      style={renderStyle({
        display: "flex",
        "flex-direction": "row",
        gap: "1rem",
        "max-width": "400px",
      })}
    >
      <INPUT
        type="text"
        name="id"
        style={renderStyle({
          flex: "1",
          padding: "0.75rem",
          border: "none",
          "border-radius": "0.25rem",
          "background-color": "rgba(255, 255, 255, 0.1)",
          color: "white",
        })}
      />
      <BUTTON type="submit" class="fart-button">
        Claim profile
      </BUTTON>
    </FORM>
  );
}
