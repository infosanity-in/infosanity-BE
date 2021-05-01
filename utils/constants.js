const constants = {
  STATUS_CODES: {
    INVALID_PROMPT: 113,
    SUCCESS: 200,
    NO_CONTENT: 204,
    INVALID_FORMAT: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    DATA_NOT_FOUND: 404,
    NOT_ACCEPTABLE: 406,
    VALIDATION_FAILED: 422,
    FAILURE: 500,
  },
  EMAIL_VALIDATE_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  ROLE_ACCESS_TYPES: {
    VIEW: 'view',
    EDIT: 'edit',
  },
  CONTENT: {
    TYPES: {
      POLITICS: 'politics',
      HEALTH: 'health',
      CURRENT_AFFAIRS: 'currentAffairs',
      SPORTS: 'sports',
      ECONOMICS: 'economics',
      FINANCE: 'finance',
      STUDENT: 'student',
      TECHNOLOGY: 'technology'
    },
    FLAGS: {
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
    FILTER_TYPES: {
      TYPE: 'type',
      TAGS: 'tags',
      CREATED_BY: 'createdBy',
    },
    SORT_TYPES: {
      // TAGS: 'tags', TODO
      CREATED_AT: 'createdAt',
      UPDATED_AT: 'updatedAt'
    },
    SORT_DIRECTION: {
      ASC: 'asc',
      DESC: 'desc'
    }
  }
};

module.exports = constants;