import { getAuth } from "firebase/auth";
import { app } from "../firebase/client";

export var getUserIdAsync = () => {
  var auth = getAuth(app);
  return auth.authStateReady().then(() => {
    var uid = auth.currentUser?.uid;
    if (!uid) {
      throw new Error("Ви не авторизовані");
    }
    return uid;
  });
};
/* 
<!-- <script>
  import { getAuth, onAuthStateChanged } from "firebase/auth";
  import { app } from "../firebase/client";

  class AuthState extends HTMLElement {
    constructor() {
      super();
      // TODO: use sessionStorage ??
      localStorage.setItem("userId", "");
      var auth = getAuth(app);
      onAuthStateChanged(auth, (user) => {
        if (user) {
          localStorage.setItem("userId", user.uid);
        } else {
          localStorage.setItem("userId", "");
        }
      });
    }
  }
  customElements.define("auth-state", AuthState);
</script>
<auth-state></auth-state> -->
 */
