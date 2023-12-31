import "./ModalWindow.js";
import { getUserIdAsync } from "./AuthState.js";
import { db } from "../firebase/client.js";
import { doc, updateDoc, deleteField } from "firebase/firestore";

customElements.define(
  "event-details-info",
  class extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.attachShadow({ mode: "open" });
      this.shadowRoot.innerHTML = `
        <style>
          .wrapper {
            display: flex;
            flex-direction: column;
          }
          .label {
            font-weight: 500;
          }
          </style>
<div class='wrapper'>
  <span class="label">
    <slot name='label'></slot>:
  </span>
  <span>
    <slot></slot>
  </span>
</div>
        `;
    }
  }
);
customElements.define(
  "event-details",
  class extends HTMLElement {
    constructor() {
      super();
    }
    event = null;
    eventId = "";
    connectedCallback() {
      var { label, inputs } = this.event;
      this.innerHTML = `
        <style>
          event-details > details {
            border-block-end: var(--event-details-border-size, 0.125em) solid var(--event-details-border-clr, currentColor);
          }
          event-details > details > *:last-child {
            padding-block-end: var(--event-details-p-block, var(--space-s, 1rem));
          }
          </style>
    <details class="stack">
      <summary class="text-l">
      </summary>
      <div class="stack">
      <div id='content' class="stack">
            </div>
      <modal-window> 
        <button slot='dialog-open' class="text-s">
          Видалити
          </button>
          <div slot='dialog-content' class="grid grid-cols-equal gap box">
            <span class="span-multiple-cols">Ви дійсно хочете видалити цю подію?</span>
            <button id='delete-event-button' class='dialog-close'>Так, до смітнику</button>
            <button class='dialog-close'>Охрана, отмєна!</button>
            </modal-window>
            </div>
          </details>
        `;
      this.querySelector("summary").innerText = label;
      var contentWrapper = this.querySelector("#content");
      inputs.forEach((input) => {
        var eventDetails = document.createElement("event-details-info");
        var inpLabel = document.createElement("span");
        inpLabel.slot = "label";
        inpLabel.innerText = input.label;
        var inpValue = document.createElement("span");
        inpValue.innerText = input.value || "---";
        eventDetails.append(inpLabel, inpValue);
        contentWrapper.appendChild(eventDetails);
      });
      var deleteBtn = this.querySelector("#delete-event-button");
      deleteBtn.addEventListener(
        "click",
        (_) => {
          getUserIdAsync()
            .then((userId) => {
              if (userId) {
                updateDoc(doc(db, "events", userId), {
                  [`events.${this.eventId}`]: deleteField(),
                });
              }
            })
            .then(() => {})
            .catch((err) => {
              alert(`Error: ${err.message || "unknown error"}`);
            });
        },
        false
      );
    }
  }
);
