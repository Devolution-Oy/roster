export const USER = 1;
export const ADMIN = 2;

export const roleToString = role => {
  let roleStr;
  switch (role) {
  case 1:
    roleStr = 'User';
    break;
  case 2:
    roleStr = 'Admin';
    break;
  default:
    roleStr = 'Unlogged';
  }

  return roleStr;
};