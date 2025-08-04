import supabaseClient from './client';
import { convertToDbKeys, convertToProfileKeys } from './mapUtils';

const createProfile = async (profile: Profile) => {
  const dbProfile = convertToDbKeys(profile);
  const { data, error } = await supabaseClient.from('profiles').insert([dbProfile]).single();

  if (error) throw new Error(error.message);
  return data;
};

const getProfile = async (userId: string): Promise<Profile> => {
  const { data, error } = await supabaseClient.from('profiles').select('*').eq('id', userId).single();

  if (error) throw new Error(error.message);
  const profile = convertToProfileKeys(data);
  return profile;
};

const updateProfile = async (userId: string, updates: Partial<Profile>) => {
  const dbUpdates = convertToDbKeys(updates);
  const { data, error } = await supabaseClient.from('profiles').update(dbUpdates).eq('id', userId).single();

  if (error) throw new Error(error.message);
  return data;
};

export { createProfile, getProfile, updateProfile };
