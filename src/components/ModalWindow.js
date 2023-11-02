class ModalWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    var root = this.shadowRoot;
    root.innerHTML = `
        <style>
          dialog {
            background-color: var(--clr-bg);
            padding: 0;
            border: none;
          }
          ::backdrop {
            background-color: var(--clr-bg);
            opacity: var(--backdrop-opacity, 0.8);
          }
        </style>

        <slot name="dialog-open">Open dialog</slot>
        <dialog>
            <slot name='dialog-content'></slot>
        </dialog>
      `;
    var dialog = root.querySelector("dialog");
    var dialogContent = root
      .querySelector("slot[name=dialog-content]")
      .assignedElements()[0];
    var buttonOpen = root
      .querySelector("slot[name=dialog-open]")
      .assignedElements()[0];
    var buttonsClose = dialogContent.querySelectorAll(".dialog-close");
    if (!dialog || !dialogContent || !buttonOpen) {
      throw Error("One of components is missing");
    }
    var openDialog = () => {
      dialog.showModal();
    };
    var closeDialog = () => {
      dialog.close();
    };
    buttonOpen.addEventListener("click", openDialog, false);
    buttonsClose.forEach((button) => {
      button.addEventListener("click", closeDialog, false);
    });
    dialog.addEventListener(
      "click",
      (e) => {
        if (!dialogContent.contains(e.target)) {
          closeDialog();
        }
      },
      false
    );
  }
}

customElements.define("modal-window", ModalWindow);
