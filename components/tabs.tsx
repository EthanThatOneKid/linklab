import { DIV, H4, INPUT, LABEL, LI, P, STYLE, UL } from "@fartlabs/htx";

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
        {props.tabs.map((_tab, index) => (
          <INPUT
            type="radio"
            id={`tab${index + 1}`}
            name="css-tabs"
            checked={String(index === 0)}
          />
        )).join("")}

        <UL class="tabs">
          {props.tabs.map((tab, index) => (
            <LI class="tab">
              <LABEL for={`tab${index + 1}`}>{tab.title}</LABEL>
            </LI>
          )).join("")}
        </UL>

        {props.tabs.map((tab, _index) => (
          <DIV class="tab-content">
            <H4>{tab.title}</H4>
            <P>{tab.content}</P>
          </DIV>
        )).join("")}
      </DIV>
      <STYLE>
        {`@scope {
.tabbed [type="radio"] {
    display: none;
}

.tabs {
    list-style: none;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid var(--fart-green);
}

.tab > label {
    margin-bottom: -1px;
    padding: 12px 15px;
    cursor: pointer;	
    transition: all 0.3s;
}

.tab-content {
    display: none;
}

/* As we cannot replace the numbers with variables or calls to element properties, the number of this selector parts is our tab count limit */
${
          props.tabs.map((_, index) => `
.tabbed [type="radio"]:nth-of-type(${
            index + 1
          }):checked ~ .tabs .tab:nth-of-type(${index + 1}) label,
.tabbed [type="radio"]:nth-of-type(${
            index + 1
          }):checked ~ .tab-content:nth-of-type(${index + 1}) {
    display: block;
    border-bottom-color: #fff;
    border-top-color: #B721FF;
    background: #fff;
    color: #222;
}`).join("")
        }
}`}
      </STYLE>
    </DIV>
  );
}
