import { Strings } from '@/constants';
import { RequirementStatus, RequirementType } from '@/models';
import { useMemo, useState } from 'react';

const useRequirements = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: RequirementType.Email,
      label: Strings.requirements.VERIFY_EMAIL_LABEL,
      status: RequirementStatus.NotVerified,
    },
    {
      id: RequirementType.Phone,
      label: Strings.requirements.VERIFY_PHONE_LABEL,
      status: RequirementStatus.NotVerified,
    },
    {
      id: RequirementType.Identity,
      label: Strings.requirements.VERIFY_IDENTITY_LABEL,
      status: RequirementStatus.NotVerified,
    },
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
