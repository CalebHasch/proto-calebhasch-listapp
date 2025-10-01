import { ref } from "vue";
import { supabase } from "../supabase";

export const user = ref(null);

export async function initAuth() {
  // get session on start
  const { data: { session } = {} } = await supabase.auth.getSession();
  user.value = session?.user ?? null;

  // listen for changes (login/logout)
  supabase.auth.onAuthStateChange((_event, session) => {
    user.value = session?.user ?? null;
  });
}

export async function signUp(email, password) {
  return await supabase.auth.signUp({ email, password });
}

export async function signIn(email, password) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  return await supabase.auth.signOut();
}
