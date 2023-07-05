import { MESSAGES, MessageCode } from '../constants/common.constants';
import { formatStringObj } from './share-function';

export interface IResponse<T> {
  message: string;
  data?: T;
}

/**
 * handle a response of error message
 * @param code Enum message code
 * @param data
 * @returns
 */
export function responseError(code: MessageCode, data?: object) {
  return formatStringObj(MESSAGES[code], data);
}
