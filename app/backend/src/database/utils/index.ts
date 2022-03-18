import IResValidate from '../interfaces/IResponseValidate';

const responseValidate = (status: number, message: string, data = {}): IResValidate => ({
  status,
  message,
  data,
});

export default responseValidate;
