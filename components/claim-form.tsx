import { BUTTON, FORM, INPUT } from "@fartlabs/htx";
import { renderStyle } from "@fartlabs/htx/render";

export function ClaimForm() {
  return (
    <FORM
      class="claim-form"
      // action="/claim"
      style={renderStyle({
        display: "flex",
        "flex-direction": "row",
        gap: "1rem",
        "max-width": "400px",
      })}
    >
      <INPUT
        type="text"
        name="username"
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
        style={renderStyle({
          padding: "0.75rem",
          border: "none",
          "border-radius": "0.25rem",
          "background-color": "#c2f732",
          color: "#0f2f21",
          cursor: "pointer",
          "font-weight": "bold",
        })}
        onclick={handleEvent(
          "event.preventDefault(); alert('Feature coming soon!');",
        )}
      >
        Claim your Linklab
      </BUTTON>
    </FORM>
  );
}

/**
 * https://stackoverflow.com/a/66064971
 */
function handleEvent(js: string, id = "event") {
  return `(function(${id}){${js}})(arguments[0]);return false;`;
}
