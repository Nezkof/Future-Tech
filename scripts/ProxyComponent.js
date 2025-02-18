class ProxyComponent {
   constructor() {
      if (this.constructor === ProxyComponent) {
         throw new Error("Abstract class object creation error");
      }
   }

   getProxyState(initialState) {
      return new Proxy(initialState, {
         get: (target, prop) => {
            return target[prop];
         },
         set: (target, prop, newValue) => {
            const oldValue = target[prop];

            target[prop] = newValue;

            if (newValue !== oldValue) {
               this.updateUI();
            }

            return true;
         },
      });
   }

   updateUI() {
      throw new Error("No updateUI method");
   }
}

export default ProxyComponent;
