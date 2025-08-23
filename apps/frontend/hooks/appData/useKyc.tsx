import { Strings } from '@/constants';
import { RequirementStatus, RequirementType } from '@/models';
import { KycStatus } from '@/models/kyc';
import { useMemo, useState } from 'react';
import useAuth from './useAuth';
import useProfile from './useProfile';

const useKyc = () => {
  const { profile } = useProfile();
  const { user } = useAuth();

  const [kyc, setKyc] = useState<Kyc>({
    id: 'kyc-1',
    userId: profile?.id ?? '',
    name: profile?.name ?? '',
    email: user?.email,
    phone: user?.user_metadata?.phone,
    address: '',
    countryId: '',
    emailStatus: RequirementStatus.NotVerified,
    phoneStatus: RequirementStatus.NotVerified,
    identityStatus: RequirementStatus.NotVerified,
    idProof: '',
    addressProof: '',
    kycStatus: KycStatus.Incomplete,
  });

  const requirements: Requirement[] = useMemo(
    () => [
      {
        id: RequirementType.Email,
        label: Strings.requirements.VERIFY_EMAIL_LABEL,
        status: kyc.emailStatus,
      },
      {
        id: RequirementType.Phone,
        label: Strings.requirements.VERIFY_PHONE_LABEL,
        status: kyc.phoneStatus,
      },
      {
        id: RequirementType.Identity,
        label: Strings.requirements.VERIFY_IDENTITY_LABEL,
        status: kyc.identityStatus,
      },
    ],
    [kyc],
  );

  const requirementsMet = useMemo(
    () => requirements.every((r) => r.status !== RequirementStatus.NotVerified),
    [requirements],
  );

  const updateKyc = (key: string, value: any) => {
    setKyc((prev) => ({ ...prev, [key]: value }));
  };

  return {
    kyc,
    requirements,
    requirementsMet,
    updateKyc,
  };
};

export default useKyc;
