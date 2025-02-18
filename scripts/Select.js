import ProxyComponent from "./ProxyComponent.js";

const rootSelector = "[data-js-select]";

class Select extends ProxyComponent {
   selectors = {
      root: rootSelector,
      originalControl: "[data-js-select-original-control]",
      button: "[data-js-select-button]",
      dropdown: "[data-js-select-dropdown]",
      option: "[data-js-select-option]",
   };

   stateClasses = {
      isExpanded: "is-expanded",
      isSelected: "is-selected",
      isCurrent: "is-current",
      isOnTheLeftSide: "is-on-the-left-size",
      isOnTheRightSide: "is-on-the-right-size",
   };

   stateAttributes = {
      ariaExpanded: "aria-expanded",
      ariaSelected: "aria-selected",
      ariaActiveDescendant: "aria-activedescendant",
   };

   initialState = {
      isExpanded: false,
      currentOptionIndex: null,
      selectedOptionElement: null,
   };

   constructor(rootElement) {
      super();
      this.rootElement = rootElement;
      this.originalControlElement = this.rootElement.querySelector(
         this.selectors.originalControl
      );
      this.buttonElement = this.rootElement.querySelector(
         this.selectors.button
      );
      this.dropdownElement = this.rootElement.querySelector(
         this.selectors.dropdown
      );
      this.optionElements = this.dropdownElement.querySelectorAll(
         this.selectors.option
      );
      this.state = this.getProxyState({
         ...this.initialState,
         currentOptionIndex: this.originalControlElement.selectedIndex,
         selectedOptionElement:
            this.optionElements[this.originalControlElement.selectedIndex],
      });
      this.fixDropDownPosition();
   }

   updateUI() {}

   fixDropDownPosition() {
      const viewportWidth = document.documentElement.clientWidth;
      const halfViewPortX = viewportWidth / 2;

      const { width, x } = this.buttonElement.getBoundingClientRect();

      const buttonCenterX = x + width / 2;
      const isButtonOnTheLeftViewPortSide = buttonCenterX < halfViewPortX;

      this.dropdownElement.classList.toggle(
         this.stateClasses.isOnTheLeftSide,
         isButtonOnTheLeftViewPortSide
      );

      this.dropdownElement.classList.toggle(
         this.stateClasses.isOnTheRightSide,
         !isButtonOnTheLeftViewPortSide
      );
   }
}

class SelectCollection {
   constructor() {
      this.init();
   }

   init() {
      document.querySelectorAll(rootSelector).forEach((element) => {
         new Select(element);
      });
   }
}

export default SelectCollection;
