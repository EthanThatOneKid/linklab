import { DIV, INPUT, LABEL, LI, STYLE, UL } from "@fartlabs/htx";

// https://codepen.io/MPDoctor/pen/mpJdYe

export interface TabsProps {
  tabs: Array<{
    id: string;
    title: string;
    content: string;
  }>;
}

export function Tabs(props: TabsProps) {
  return (
    <DIV>
      <DIV class="tabbed">
        {props.tabs
          .map((_tab, index) => (
            <INPUT
              type="radio"
              id={`tab${index + 1}`}
              name="css-tabs"
              checked={index === 0 ? "true" : undefined}
            />
          ))
          .join("")}

        <UL class="tabs">
          {props.tabs
            .map((tab, index) => (
              <LI class="tab">
                <LABEL for={`tab${index + 1}`}>{tab.title}</LABEL>
              </LI>
            ))
            .join("")}
        </UL>

        {props.tabs
          .map((tab, _index) => <DIV class="tab-content">{tab.content}</DIV>)
          .join("")}
      </DIV>
      <STYLE>
        {`@scope {
      .tabbed [type="radio"] {
          display: none;
      }

      .tabs {
          list-style: none;
          padding: 0;
          margin: 0 0 3em 0;
      }

      .tab > label {
          transition: all 0.3s;    
          margin-bottom: -1px;
          padding: 12px 15px;
          margin: 5px 0 5px 0;
          cursor: pointer;
          border-radius: 2em;
      }

      .tab > label:hover {
          background-color: var(--fart-darker-dark-green);
          color: var(--fart-green);
      }

      .tab-content {
          display: none;
      }

      ${
          props.tabs
            .map((_, index) => `
      .tabbed [type="radio"]:nth-of-type(${
              index + 1
            }):checked ~ .tabs .tab:nth-of-type(${index + 1}) label,
      .tabbed [type="radio"]:nth-of-type(${
              index + 1
            }):checked ~ .tab-content:nth-of-type(${index + 1}) {
          display: block;
      }

      .tabbed [type="radio"]:nth-of-type(${
              index + 1
            }):checked ~ .tabs .tab:nth-of-type(${index + 1}) label {
          background-color: var(--fart-darker-dark-green);
          font-weight: bold;
      }`)
            .join("")
        }
      }`}
      </STYLE>
    </DIV>
  );
}
