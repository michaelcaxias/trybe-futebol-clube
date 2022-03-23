enum ErrorMessage {
  NOT_EMPTY = 'All fields must be filled',
  INCORRECT_LOGIN = 'Incorrect email or password',
  INVALID_TOKEN = 'Invalid Token',
  NO_ID = 'There is no team with such id!',
  TEAMS_CONFLIT = 'It is not possible to create a match with two equal teams',
}

export default ErrorMessage;
