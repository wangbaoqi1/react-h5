
import ImageOss from '@/components/image-oss'
import './index.less';

const Avatar = ({ avatar='', name, size = 64 }) => {
  return (
    <div>
      {avatar ? (
        <img className='avatar' style={{ width: size, height: size }} src={ImageOss(avatar)} mode='aspectFill' />
      ) :  (
        <div className='greenBg' style={{ width: size, height: size }}>
          <div className='avatarName' style={{ fontSize: size / 2, color: '#fff' }}>
            {name?.split('')?.[0]}
          </div>
        </div>
      )
      }
    </div>
  );
};
export default Avatar;