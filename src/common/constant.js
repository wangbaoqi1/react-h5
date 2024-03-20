export const CHECK_STATUS = ((ENUM) => {
  ENUM[(ENUM.WAIT_CHECK = 1)] = '等待审核';
  ENUM[(ENUM.IN_CHECK = 2)] = '审核中';
  ENUM[(ENUM.SUCCEED = 3)] = '审核通过';
  ENUM[(ENUM.REFUSED = 4)] = '审核拒绝';
  return ENUM;
})({});
