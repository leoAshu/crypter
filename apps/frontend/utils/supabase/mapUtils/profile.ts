const profileToDbMap: Record<keyof Profile, string> = {
  id: 'id',
  name: 'full_name',
  avatarUrl: 'avatar_url',
  verified: 'verified',
  createdAt: 'created_at',
};

const dbToProfileMap: Record<string, keyof Profile> = Object.entries(profileToDbMap).reduce(
  (acc, [camelKey, snakeKey]) => {
    acc[snakeKey] = camelKey as keyof Profile;
    return acc;
  },
  {} as Record<string, keyof Profile>,
);

// camelCase → snake_case
const convertToDbKeys = (obj: Partial<Profile>): Record<string, any> => {
  return Object.entries(obj).reduce(
    (acc, [camelKey, value]) => {
      const snakeKey = profileToDbMap[camelKey as keyof Profile];
      if (!snakeKey) return acc;
      acc[snakeKey] = value;
      return acc;
    },
    {} as Record<string, any>,
  );
};

// snake_case → camelCase
const convertToProfileKeys = (obj: Record<string, any>): Profile => {
  return Object.entries(obj).reduce((acc, [snakeKey, value]) => {
    const camelKey = dbToProfileMap[snakeKey];
    if (camelKey) acc[camelKey] = value;
    return acc;
  }, {} as Partial<Profile>) as Profile;
};

export { convertToDbKeys, convertToProfileKeys };
