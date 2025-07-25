import { supabase } from '.';

const signIn = async ({ email, password }: SignInParams) => {
  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);
};

export { signIn };
