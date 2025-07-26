import supabaseClient from './client';

const signIn = async ({ email, password }: SignInParams) => {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);
};

export { signIn };
