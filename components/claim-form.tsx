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
      <BUTTON
        type="submit"
        // onclick={handleEvent(
        //   "event.preventDefault(); alert('Feature coming soon!');",
        // )}
        style={ctaStyle}
      >
        Claim your profile
      </BUTTON>
    </FORM>
  );
}

// /**
//  * https://stackoverflow.com/a/66064971
//  */
// function handleEvent(js: string, id = "event") {
//   return `(function(${id}){${js}})(arguments[0]);return false;`;
// }
