enum RequirementStatus {
  Verified,
  NotVerified,
  Pending,
}

enum RequirementType {
  Email = 'email',
  Phone = 'phone',
  Identity = 'identity',
}

export { RequirementStatus, RequirementType };
