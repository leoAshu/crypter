enum KycStatus {
  Incomplete,
  Pending,
  Approved,
  Rejected,
}

enum RequirementStatus {
  NotVerified,
  Pending,
  Verified,
}

enum RequirementType {
  Email = 'email',
  Phone = 'phone',
  Identity = 'identity',
}

export { KycStatus, RequirementStatus, RequirementType };
