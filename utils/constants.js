const constants = {
  PERMISSION_MODULES: {
    POLITICS: 'politics',
    HEALTH: 'health',
    CURRENT_AFFAIRS: 'currentAffairs',
    SPORTS: 'sports',
    ECONOMICS: 'economics',
    FINANCE: 'finance',
    STUDENT: 'student',
    TECHNOLOGY: 'technology,'
  },
  ACCESS_TYPES: {
    VIEW: 'view',
    EDIT: 'edit',
  },
  CONTENT_FLAGS: {
    PENDING: 'pending',
    VALID: 'valid',
    FAKE: 'fake',
    UNCONFIRMED: 'unconfirmed',
  },
  SPAM_TYPES: {
    STRONG_LANGUAGE: 'strongLanguage',
    VIOLENCE: 'referenceToViolence',
    PHYSICAL_ABUSE: 'physicalAbuse',
    MENTAL_ABUSE: 'mentalAbuse',
    SEXUAL: 'sexual',
    DISCRIMINATORY: 'discriminatory'
  },
};

module.exports = constants;