import { ref } from "vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";

const user = ref(null);
const loading = ref(false);
const error = ref(null);

export function useAuth() {
  const router = useRouter();

  const initAuth = async () => {
    // get session on start
    const { data: { session } = {} } = await supabase.auth.getSession();
    user.value = session?.user ?? null;

    // listen for changes (login/logout)
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null;
    });
  };

  const signup = async (email, password) => {
    loading.value = true;
    error.value = null;

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
    });

    if (err) {
      error.value = err.message || "Signup failed";
    } else {
      await router.push("/home");
    }

    loading.value = false;
    return { data, error: err };
  };

  const login = async (email, password) => {
    loading.value = true;
    error.value = null;

    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (err) {
      error.value = err.message || "Login failed";
    } else {
      await router.push("/home");
    }

    loading.value = false;
    return { data, error: err };
  };

  const logout = async () => {
    loading.value = true;
    error.value = null;

    const { error: err } = await supabase.auth.signOut();

    if (err) {
      error.value = err.message || "Logout failed";
    } else {
      user.value = null;
      await router.push("/login");
    }

    loading.value = false;
    return { error: err };
  };

  return { user, loading, error, signup, login, logout, initAuth };
}
