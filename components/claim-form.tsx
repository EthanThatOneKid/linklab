import { BUTTON, FORM, INPUT } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";
import { ctaStyle } from "#/lib/css/cta.ts";

export function ClaimForm() {
  return (
    <FORM
      action="/claim"
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
      <BUTTON type="submit" style={ctaStyle}>
        Claim profile
      </BUTTON>
    </FORM>
  );
}
