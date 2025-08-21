import { Strings } from '@/constants';
import { RequirementStatus } from '@/models';
import { useMemo, useState } from 'react';

const useRequirements = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([
    { id: 'email', label: Strings.requirements.VERIFY_EMAIL_LABEL, status: RequirementStatus.NotVerified },
    { id: 'identity', label: Strings.requirements.VERIFY_IDENTITY_LABEL, status: RequirementStatus.NotVerified },
  ]);

  const requirementsMet = useMemo(
    () => requirements.every((r) => r.status !== RequirementStatus.NotVerified),
    [requirements],
  );

  return {
    requirements,
    requirementsMet,
    setRequirements,
  };
};

export default useRequirements;
