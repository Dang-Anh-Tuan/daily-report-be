export enum MessageCode {
  MSG_200_001 = 'MSG_200_001',
  MSG_400_001 = 'MSG_400_001',
  MSG_400_002 = 'MSG_400_002',
  MSG_400_003 = 'MSG_400_003',
  MSG_400_004 = 'MSG_400_004',
  MSG_401_001 = 'MSG_401_001',
  MSG_401_002 = 'MSG_401_002',
  MSG_403_001 = 'MSG_403_001',
  MSG_422_001 = 'MSG_422_001',
  MSG_422_002 = 'MSG_422_002',
  MSG_422_003 = 'MSG_422_003',
  MSG_422_004 = 'MSG_422_004',
  MSG_422_005 = 'MSG_422_005',
  MSG_422_006 = 'MSG_422_006',
  MSG_422_007 = 'MSG_422_007',
  MSG_404_001 = 'MSG_404_001',
  MSG_404_002 = 'MSG_404_002',
  MSG_500_001 = 'MSG_500_001',
  MSG_502_001 = 'MSG_502_001',
  MSG_600_001 = 'MSG_600_001',
  MSG_600_002 = 'MSG_600_002',
  MSG_600_003 = 'MSG_600_003'
}

// ========= MESSAGES =========
export const MESSAGES = {
  MSG_200: 'Success',
  MSG_401: 'Unauthorized',
  MSG_401_001: 'Token invalid',
  MSG_401_002: 'Token expired',
  MSG_200_001: '<<Action>> order successfully.',
  MSG_400_001: '<<fieldName>> does not exist. Please try again!',
  MSG_400_002: '<<actionType>> not correct',
  MSG_400_003: '<<fieldName>> exist. Please try again!',
  MSG_400_004: '<<fieldName>> expired. Please try again!',
  MSG_403_001: 'User have been inactive',
  MSG_422_001: 'Please enter <<fieldName>>.',
  MSG_422_002: '<<fieldName>> incorrect format. Please try again!',
  MSG_422_003: '<<fieldName>> must be at least <<minLength>> characters long.',
  MSG_422_004:
    '<<fieldName>> must be less than or equal to <<maxLength>> characters long.',
  MSG_422_005: '<<endTime>> cannot be smaller than <<startTime>>.',
  MSG_422_006: 'The time range cannot exceed 1 year',
  MSG_422_007: 'Cannot select time in the future',
  MSG_404_001: '404 Page Not Found.',
  MSG_404_002: '<<fieldName>> Not Found.',
  MSG_500_001: 'Internal Server Error.\nSorry, something went wrong',
  MSG_502_001:
    'Connection error!\nCheck your internet connection and try again.',
  MSG_600_001: 'please check your email',
  MSG_600_002: 'Password changed successfully',
  MSG_600_003: "'<<fieldName>> do not match"
}
