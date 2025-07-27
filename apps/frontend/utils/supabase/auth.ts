import supabaseClient from './client';

const signIn = async ({ email, password }: SignInParams) => {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) throw new Error(error.message);
};

const signUp = async ({ name, phone, email, password }: SignUpParams) => {
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        phone: phone,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
};

const getUser = async () => {
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  if (error) throw new Error(error.message);

  return user;
};

const updateUser = async ({ email, name, phone }: UpdateUserParams) => {
  const { data, error } = await supabaseClient.auth.updateUser({
    data: { name: name, phone: phone },
    email: email,
  });

  if (error) throw new Error(error.message);

  return data;
};

const signOut = async () => {
  const { error } = await supabaseClient.auth.signOut();
  if (error) throw new Error(error.message);
};

export { getUser, signIn, signOut, signUp, updateUser };
