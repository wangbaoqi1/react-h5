import React, { useEffect } from 'react';
import ReactDom from 'react-dom';

import './index.less';

const Version = () => {
  return (
    <div className="version">
      <div className='div'>
      <div className='title' ></div>
      <div  className='title0'>
      <p className='title1' >Email Verification Code</p>
     <p  className='title2' >Please return to the Esay Truck and enter this code in the email verification interface</p>
     <p className='title3' >1306</p>
     <p  className='title4' >This code will expire soon (10 minutes). If you cannot find the mailbox verification screen, try modifying the mailbox again</p>
     <p className='title5'>If you have not tried to change the email address of your Easy Truck account, we recommend that you reset your password immediately</p>
      </div>

      </div>

    </div>
  );
};

export default Version;
ReactDom.render(<Version />, document.querySelector('#J_Container'));
