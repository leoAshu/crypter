import { Strings } from '@/constants';
import { RequirementStatus, RequirementType } from '@/models';
import { useKycStore } from '@/store';
import { useMemo } from 'react';

const useKyc = () => {
  const { kyc, isLoading, fetchKyc, updateKyc: update, verifyOtp } = useKycStore();

  const requirements: Requirement[] = useMemo(
    () => [
      {
        id: RequirementType.Email,
        label: Strings.requirements.VERIFY_EMAIL_LABEL,
        status: kyc?.emailStatus,
      },
      {
        id: RequirementType.Phone,
        label: Strings.requirements.VERIFY_PHONE_LABEL,
        status: kyc?.phoneStatus,
      },
      {
        id: RequirementType.Identity,
        label: Strings.requirements.VERIFY_IDENTITY_LABEL,
        status: kyc?.identityStatus,
      },
    ],
    [kyc],
  );

  const requirementsMet = useMemo(
    () => requirements.every((r) => r.status !== RequirementStatus.NotVerified),
    [requirements],
  );

  const updateKyc = async (key: string, value: any) => {
    await update({ [key]: value });
  };

  return {
    kyc,
    isLoading,
    requirements,
    requirementsMet,
    fetchKyc,
    updateKyc,
    verifyOtp,
  };
};

export default useKyc;
