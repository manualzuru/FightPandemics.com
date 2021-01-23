const SCOPES = {
  NONE: 0x00000000,
  REPORT_READ: 0x00000001,
  REPORT_WRITE: 0x00000002,
  MANAGE_USERS: 0x00000004,
  LOGS_READ: 0x00000008,
  STATS_READ: 0x00000010,
  // to add more, please use: 0x00000020, 0x00000040, 0x00000080, 0x00000100, 0x00000200, 0x00000400, etc..
};

const ROLES = {
  user: SCOPES.NONE,
  reader: SCOPES.REPORT_READ,
  "business intelligence": SCOPES.STATS_READ,
  moderator: SCOPES.REPORT_READ | SCOPES.REPORT_WRITE,
  inspector: SCOPES.REPORT_READ | SCOPES.LOGS_READ,
  administrator: SCOPES.REPORT_READ | SCOPES.REPORT_WRITE | SCOPES.MANAGE_USERS | SCOPES.LOGS_READ | SCOPES.STATS_READ,
};

module.exports = {
  ROLES,
  SCOPES,
};
