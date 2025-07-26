const getInitialsFromName = (name: string) => {
  if (!name) return '';

  const parts = name.trim().split(' ');
  const initials = parts.map((p) => p[0]?.toUpperCase()).join('');

  return initials.slice(0, 2);
};

export * from './supabase';
export * from './validations';
export { getInitialsFromName };
